#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
reddit_json_to_csv.py

Extrai dados relevantes de arquivos JSON de threads do Reddit e gera 1 CSV por JSON.

Foco:
- comentários/replies aninhados
- metadados do post e dos comentários
- texto limpo para análise por IA
- preservação de contexto do thread e do comentário pai
- anonimização de autores por hash
- sinais simples de relevância, dores e funcionalidades mencionadas

Uso básico:
    python reddit_json_to_csv.py --input-dir ./json --output-dir ./csv

Exemplo mantendo o post principal como linha no CSV:
    python reddit_json_to_csv.py -i ./json -o ./csv --include-post-row

Exemplo incluindo bots/AutoModerator:
    python reddit_json_to_csv.py -i ./json -o ./csv --include-bots

Exemplo preservando nome público do autor:
    python reddit_json_to_csv.py -i ./json -o ./csv --keep-author

Observação:
- O script usa somente biblioteca padrão do Python.
- Funciona com o formato JSON típico de URL Reddit `.json`:
  [ Listing do post, Listing dos comentários ]
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import html
import json
import os
import re
import sys
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple


REDDIT_BASE_URL = "https://www.reddit.com"

DEFAULT_AUTHOR_SALT = "planner-tdah-reddit-research"

BOT_AUTHORS = {
    "automoderator",
    "autowikibot",
    "remindmebot",
    "bot",
}

PLANNER_TERMS = [
    "planner", "planners", "plan", "planning", "calendar", "calendars",
    "agenda", "bullet journal", "bujo", "journal", "notion", "template",
    "templates", "printable", "binder", "filofax", "app", "to do",
    "to-do", "todo", "checklist", "habit tracker", "tracker", "weekly",
    "monthly", "daily", "schedule", "routine", "organize", "organization",
    "organizing", "decluttering"
]

PAIN_TERMS = [
    "adhd", "executive function", "executive functioning", "overwhelm",
    "overwhelmed", "anxiety", "anxious", "guilt", "guilty", "shame",
    "lazy", "frustrating", "frustrated", "forget", "forgot", "forgotten",
    "lost", "time", "capacity", "too much", "complex", "complicated",
    "rigid", "abandon", "abandoned", "don't help", "doesn't help",
    "not working", "can't maintain", "can't stick", "consistency",
    "inconsistent", "novelty", "no time", "pile of shame", "blank pages",
    "tasks", "procrastination", "procrastinate"
]

FEATURE_TERMS = [
    "simple", "minimal", "minimalist", "flexible", "visual", "visible",
    "reminder", "reminders", "color", "colour", "color code",
    "print", "printable", "one page", "all in one", "layout", "layouts",
    "categories", "columns", "notes", "appointments", "expenses",
    "weekly", "monthly", "daily", "quarterly", "change", "custom",
    "customize", "adjustment", "binder", "folder", "reset", "checklist",
    "review", "overview", "less overwhelming"
]

RECOMMENDATION_TERMS = [
    "worked for me", "works for me", "working ok", "recommend",
    "highly recommend", "love", "loved", "helped", "helps", "great",
    "does the trick", "promising", "useful"
]

QUESTION_RE = re.compile(r"\?")
URL_RE = re.compile(r"https?://[^\s)\]>\"']+", re.IGNORECASE)
MARKDOWN_LINK_RE = re.compile(r"\[([^\]]+)\]\((https?://[^)]+)\)")
WHITESPACE_RE = re.compile(r"\s+")


OUTPUT_COLUMNS = [
    # Origem do arquivo/processamento
    "source_file",
    "source_file_stem",

    # Metadados do thread/post
    "thread_id",
    "thread_fullname",
    "thread_url",
    "subreddit",
    "subreddit_prefixed",
    "thread_title",
    "thread_selftext_clean",
    "thread_flair",
    "thread_created_utc",
    "thread_created_iso",
    "thread_score",
    "thread_ups",
    "thread_upvote_ratio",
    "thread_num_comments",
    "thread_author_hash",
    "thread_author_public",

    # Registro extraído
    "record_id",
    "record_type",
    "comment_id",
    "comment_fullname",
    "comment_url",
    "comment_permalink",
    "parent_id_raw",
    "parent_type",
    "parent_comment_id",
    "root_comment_id",
    "depth",
    "is_top_level",
    "path_ids",

    # Autor e flags
    "author_hash",
    "author_public",
    "author_flair_text",
    "is_submitter",
    "stickied",
    "distinguished",
    "score",
    "ups",
    "downs",
    "controversiality",
    "reply_count_direct",

    # Datas/estado
    "created_utc",
    "created_iso",
    "edited",
    "edited_utc",
    "edited_iso",
    "collapsed",
    "locked",
    "archived",
    "score_hidden",

    # Texto limpo e campos para IA
    "body_clean",
    "body_excerpt_280",
    "body_length_chars",
    "body_word_count",
    "parent_body_excerpt",
    "root_body_excerpt",
    "text_urls",
    "contains_question",
    "contains_recommendation_language",
    "planner_terms_found",
    "pain_terms_found",
    "feature_terms_found",
    "signal_tags",
    "relevance_score_0_100",
    "text_for_ai",
]


def utc_to_iso(value: Any) -> str:
    """Converte timestamp UTC numérico para ISO-8601. Retorna string vazia se inválido."""
    if value is None or value is False or value == "":
        return ""
    try:
        timestamp = float(value)
        return dt.datetime.fromtimestamp(timestamp, tz=dt.timezone.utc).isoformat()
    except (TypeError, ValueError, OSError):
        return ""


def clean_text(value: Any) -> str:
    """Limpa texto bruto do Reddit mantendo conteúdo sem HTML/Markdown excessivo."""
    if value is None:
        return ""

    text = str(value)
    text = html.unescape(text)

    # Markdown links: [texto](url) -> texto (url)
    text = MARKDOWN_LINK_RE.sub(r"\1 (\2)", text)

    # Remove alguns marcadores markdown comuns, preservando legibilidade.
    text = text.replace("\r", "\n")
    text = re.sub(r"(^|\n)\s{0,3}#{1,6}\s*", r"\1", text)
    text = re.sub(r"(^|\n)\s{0,3}[-*+]\s+", r"\1- ", text)
    text = re.sub(r"[*_`~]{1,3}", "", text)

    # Normaliza espaços.
    text = WHITESPACE_RE.sub(" ", text).strip()
    return text


def truncate(value: str, max_chars: int) -> str:
    if not value:
        return ""
    if len(value) <= max_chars:
        return value
    return value[: max_chars - 1].rstrip() + "…"


def extract_urls(text: str) -> str:
    urls = URL_RE.findall(text or "")
    # Dedup preservando ordem
    seen = set()
    unique = []
    for url in urls:
        if url not in seen:
            seen.add(url)
            unique.append(url)
    return " | ".join(unique)


def find_terms(text: str, terms: List[str]) -> List[str]:
    haystack = (text or "").lower()
    found = []
    for term in terms:
        pattern = r"\b" + re.escape(term.lower()) + r"\b"
        # Termos com hífen/espaço podem falhar no \b final; fallback simples.
        if re.search(pattern, haystack) or term.lower() in haystack:
            found.append(term)
    return found


def bool_to_str(value: Any) -> str:
    if value is True:
        return "true"
    if value is False:
        return "false"
    if value is None:
        return ""
    return str(value)


def hash_author(author: Any, salt: str) -> str:
    author_str = str(author or "").strip()
    if not author_str or author_str in {"[deleted]", "[removed]"}:
        return ""
    digest = hashlib.sha256((salt + "::" + author_str.lower()).encode("utf-8")).hexdigest()
    return digest[:16]


def normalize_author_public(author: Any, keep_author: bool) -> str:
    if not keep_author:
        return ""
    author_str = str(author or "").strip()
    if author_str in {"[deleted]", "[removed]"}:
        return author_str
    return author_str


def safe_filename_stem(path: Path) -> str:
    stem = path.stem
    stem = re.sub(r"[^\w\-\.]+", "_", stem, flags=re.UNICODE)
    stem = re.sub(r"_+", "_", stem).strip("._-")
    return stem or "reddit_export"


def get_listing_children(listing: Any) -> List[Dict[str, Any]]:
    if isinstance(listing, dict):
        data = listing.get("data", {})
        children = data.get("children", [])
        if isinstance(children, list):
            return children
    return []


def extract_post_and_comments(doc: Any) -> Tuple[Optional[Dict[str, Any]], List[Dict[str, Any]]]:
    """
    Tenta extrair:
    - post_data: dict do post principal
    - comment_children: lista de nós de comentários

    Suporta formato típico:
    [
      {"kind":"Listing","data":{"children":[{"kind":"t3","data":{...}}]}},
      {"kind":"Listing","data":{"children":[{"kind":"t1","data":{...}}, ...]}}
    ]
    """
    post_data = None
    comment_children: List[Dict[str, Any]] = []

    if isinstance(doc, list) and len(doc) >= 2:
        post_children = get_listing_children(doc[0])
        if post_children:
            first = post_children[0]
            if first.get("kind") == "t3":
                post_data = first.get("data", {})

        comment_children = get_listing_children(doc[1])
        return post_data, comment_children

    # Fallback: objeto único com children.
    if isinstance(doc, dict):
        children = get_listing_children(doc)
        for child in children:
            if child.get("kind") == "t3" and post_data is None:
                post_data = child.get("data", {})
            elif child.get("kind") == "t1":
                comment_children.append(child)

    return post_data, comment_children


def make_thread_url(post_data: Dict[str, Any]) -> str:
    url = post_data.get("url") or ""
    permalink = post_data.get("permalink") or ""
    if url:
        return str(url)
    if permalink:
        return REDDIT_BASE_URL + str(permalink)
    return ""


def make_comment_url(comment_data: Dict[str, Any]) -> str:
    permalink = comment_data.get("permalink") or ""
    if permalink:
        return REDDIT_BASE_URL + str(permalink)
    return ""


def strip_reddit_prefix(thing_id: Any) -> str:
    if thing_id is None:
        return ""
    text = str(thing_id)
    if "_" in text:
        return text.split("_", 1)[1]
    return text


def parent_type(parent_id_raw: str) -> str:
    if parent_id_raw.startswith("t3_"):
        return "post"
    if parent_id_raw.startswith("t1_"):
        return "comment"
    return ""


def direct_reply_count(comment_data: Dict[str, Any]) -> int:
    replies = comment_data.get("replies")
    if isinstance(replies, dict):
        return len(get_listing_children(replies))
    return 0


def comment_is_bot(comment_data: Dict[str, Any]) -> bool:
    author = str(comment_data.get("author") or "").strip().lower()
    if author in BOT_AUTHORS:
        return True
    if author.endswith("bot") and author != "":
        return True
    if comment_data.get("distinguished") == "moderator" and author == "automoderator":
        return True
    return False


def is_deleted_or_removed(text: str) -> bool:
    return text.strip().lower() in {"[deleted]", "[removed]"}


def compute_signal_tags(
    body_clean: str,
    planner_found: List[str],
    pain_found: List[str],
    feature_found: List[str],
    recommendation_found: List[str],
) -> List[str]:
    tags: List[str] = []

    if planner_found:
        tags.append("mentions_planner_or_system")
    if pain_found:
        tags.append("mentions_pain_or_friction")
    if feature_found:
        tags.append("mentions_feature_or_solution")
    if recommendation_found:
        tags.append("mentions_working_solution_or_recommendation")
    if QUESTION_RE.search(body_clean):
        tags.append("contains_question")
    if len(body_clean) >= 500:
        tags.append("long_form_comment")
    if re.search(r"\b(blank pages|pile of shame|guilty|guilt|lazy|shame)\b", body_clean, re.I):
        tags.append("guilt_or_shame_signal")
    if re.search(r"\b(overwhelm|overwhelmed|too much|complex|complicated|many steps|time consuming)\b", body_clean, re.I):
        tags.append("overwhelm_or_complexity_signal")
    if re.search(r"\b(forget|forgot|lost|out of sight|noção do tempo|time)\b", body_clean, re.I):
        tags.append("forgetfulness_or_time_signal")
    if re.search(r"\b(novelty|new one|change|quarterly|different styles|format changes)\b", body_clean, re.I):
        tags.append("novelty_or_format_change_signal")
    if re.search(r"\b(printable|binder|folder|template|templates)\b", body_clean, re.I):
        tags.append("printable_modular_system_signal")

    return sorted(set(tags))


def relevance_score(
    body_clean: str,
    score: Any,
    reply_count: int,
    planner_found: List[str],
    pain_found: List[str],
    feature_found: List[str],
    signal_tags: List[str],
    is_stickied: bool,
    is_bot: bool,
) -> int:
    if is_bot:
        return 0

    result = 0

    # Conteúdo textual
    word_count = len(body_clean.split())
    if word_count >= 20:
        result += 10
    if word_count >= 80:
        result += 10
    if word_count >= 180:
        result += 10

    # Termos relevantes
    result += min(len(planner_found) * 4, 20)
    result += min(len(pain_found) * 5, 25)
    result += min(len(feature_found) * 4, 20)

    # Sinais
    if "mentions_working_solution_or_recommendation" in signal_tags:
        result += 8
    if "guilt_or_shame_signal" in signal_tags:
        result += 8
    if "overwhelm_or_complexity_signal" in signal_tags:
        result += 8
    if "forgetfulness_or_time_signal" in signal_tags:
        result += 8
    if "printable_modular_system_signal" in signal_tags:
        result += 6

    # Engajamento
    try:
        numeric_score = int(score or 0)
        if numeric_score >= 5:
            result += 5
        if numeric_score >= 20:
            result += 5
        if numeric_score >= 50:
            result += 5
    except (TypeError, ValueError):
        pass

    if reply_count >= 1:
        result += 3
    if reply_count >= 5:
        result += 4

    # Reduz ruído
    if is_stickied:
        result -= 15

    return max(0, min(100, result))


def build_text_for_ai(
    thread_title: str,
    thread_selftext: str,
    body_clean: str,
    parent_excerpt: str,
    root_excerpt: str,
    max_chars: int,
) -> str:
    parts = []
    if thread_title:
        parts.append(f"[THREAD_TITLE]\n{thread_title}")
    if thread_selftext:
        parts.append(f"[THREAD_BODY]\n{thread_selftext}")
    if root_excerpt and root_excerpt != parent_excerpt:
        parts.append(f"[ROOT_COMMENT_CONTEXT]\n{root_excerpt}")
    if parent_excerpt:
        parts.append(f"[PARENT_COMMENT_CONTEXT]\n{parent_excerpt}")
    if body_clean:
        parts.append(f"[CURRENT_RECORD]\n{body_clean}")
    return truncate("\n\n".join(parts), max_chars)


def base_thread_metadata(
    source_file: Path,
    post_data: Dict[str, Any],
    keep_author: bool,
    author_salt: str,
) -> Dict[str, Any]:
    thread_selftext = clean_text(post_data.get("selftext"))
    thread_author = post_data.get("author")

    return {
        "source_file": str(source_file),
        "source_file_stem": source_file.stem,
        "thread_id": post_data.get("id", ""),
        "thread_fullname": post_data.get("name", ""),
        "thread_url": make_thread_url(post_data),
        "subreddit": post_data.get("subreddit", ""),
        "subreddit_prefixed": post_data.get("subreddit_name_prefixed", ""),
        "thread_title": clean_text(post_data.get("title", "")),
        "thread_selftext_clean": thread_selftext,
        "thread_flair": post_data.get("link_flair_text", ""),
        "thread_created_utc": post_data.get("created_utc", ""),
        "thread_created_iso": utc_to_iso(post_data.get("created_utc")),
        "thread_score": post_data.get("score", ""),
        "thread_ups": post_data.get("ups", ""),
        "thread_upvote_ratio": post_data.get("upvote_ratio", ""),
        "thread_num_comments": post_data.get("num_comments", ""),
        "thread_author_hash": hash_author(thread_author, author_salt),
        "thread_author_public": normalize_author_public(thread_author, keep_author),
    }


def make_post_row(
    source_file: Path,
    post_data: Dict[str, Any],
    keep_author: bool,
    author_salt: str,
    max_text_for_ai_chars: int,
) -> Dict[str, Any]:
    thread_meta = base_thread_metadata(source_file, post_data, keep_author, author_salt)
    body_clean = " ".join(
        part for part in [thread_meta["thread_title"], thread_meta["thread_selftext_clean"]] if part
    ).strip()

    planner_found = find_terms(body_clean, PLANNER_TERMS)
    pain_found = find_terms(body_clean, PAIN_TERMS)
    feature_found = find_terms(body_clean, FEATURE_TERMS)
    recommendation_found = find_terms(body_clean, RECOMMENDATION_TERMS)
    signal_tags = compute_signal_tags(body_clean, planner_found, pain_found, feature_found, recommendation_found)

    row = {col: "" for col in OUTPUT_COLUMNS}
    row.update(thread_meta)
    row.update({
        "record_id": f"{source_file.stem}:post:{post_data.get('id', '')}",
        "record_type": "thread_post",
        "comment_id": "",
        "comment_fullname": "",
        "comment_url": thread_meta["thread_url"],
        "comment_permalink": post_data.get("permalink", ""),
        "parent_id_raw": "",
        "parent_type": "",
        "parent_comment_id": "",
        "root_comment_id": "",
        "depth": "",
        "is_top_level": "",
        "path_ids": "",
        "author_hash": thread_meta["thread_author_hash"],
        "author_public": thread_meta["thread_author_public"],
        "author_flair_text": post_data.get("author_flair_text", ""),
        "is_submitter": "true",
        "stickied": bool_to_str(post_data.get("stickied")),
        "distinguished": post_data.get("distinguished", ""),
        "score": post_data.get("score", ""),
        "ups": post_data.get("ups", ""),
        "downs": post_data.get("downs", ""),
        "controversiality": "",
        "reply_count_direct": "",
        "created_utc": post_data.get("created_utc", ""),
        "created_iso": utc_to_iso(post_data.get("created_utc")),
        "edited": bool_to_str(post_data.get("edited")),
        "edited_utc": post_data.get("edited") if isinstance(post_data.get("edited"), (int, float)) else "",
        "edited_iso": utc_to_iso(post_data.get("edited")) if isinstance(post_data.get("edited"), (int, float)) else "",
        "collapsed": "",
        "locked": bool_to_str(post_data.get("locked")),
        "archived": bool_to_str(post_data.get("archived")),
        "score_hidden": bool_to_str(post_data.get("hide_score")),
        "body_clean": body_clean,
        "body_excerpt_280": truncate(body_clean, 280),
        "body_length_chars": len(body_clean),
        "body_word_count": len(body_clean.split()),
        "parent_body_excerpt": "",
        "root_body_excerpt": "",
        "text_urls": extract_urls(body_clean),
        "contains_question": bool_to_str(bool(QUESTION_RE.search(body_clean))),
        "contains_recommendation_language": bool_to_str(bool(recommendation_found)),
        "planner_terms_found": " | ".join(planner_found),
        "pain_terms_found": " | ".join(pain_found),
        "feature_terms_found": " | ".join(feature_found),
        "signal_tags": " | ".join(signal_tags),
        "relevance_score_0_100": relevance_score(
            body_clean=body_clean,
            score=post_data.get("score", 0),
            reply_count=0,
            planner_found=planner_found,
            pain_found=pain_found,
            feature_found=feature_found,
            signal_tags=signal_tags,
            is_stickied=False,
            is_bot=False,
        ),
        "text_for_ai": build_text_for_ai(
            thread_title=thread_meta["thread_title"],
            thread_selftext=thread_meta["thread_selftext_clean"],
            body_clean="",
            parent_excerpt="",
            root_excerpt="",
            max_chars=max_text_for_ai_chars,
        ),
    })
    return row


def iter_comments_recursive(
    children: List[Dict[str, Any]],
    parent_chain: Optional[List[Dict[str, Any]]] = None,
) -> Iterable[Tuple[Dict[str, Any], List[Dict[str, Any]]]]:
    """
    Percorre comentários t1 recursivamente.

    Retorna tuplas:
      (comment_data, parent_chain)

    parent_chain contém os comentários ancestrais do mais antigo ao pai direto.
    """
    parent_chain = parent_chain or []

    for child in children:
        kind = child.get("kind")
        if kind != "t1":
            # Ignora nós "more" ou estruturas desconhecidas.
            continue

        comment_data = child.get("data", {})
        yield comment_data, parent_chain

        replies = comment_data.get("replies")
        if isinstance(replies, dict):
            reply_children = get_listing_children(replies)
            yield from iter_comments_recursive(reply_children, parent_chain + [comment_data])


def make_comment_row(
    source_file: Path,
    post_data: Dict[str, Any],
    comment_data: Dict[str, Any],
    parent_chain: List[Dict[str, Any]],
    keep_author: bool,
    author_salt: str,
    max_context_chars: int,
    max_text_for_ai_chars: int,
) -> Dict[str, Any]:
    thread_meta = base_thread_metadata(source_file, post_data, keep_author, author_salt)

    body_clean = clean_text(comment_data.get("body", ""))
    parent_id_raw = str(comment_data.get("parent_id", "") or "")
    parent_type_value = parent_type(parent_id_raw)
    parent_comment_id = strip_reddit_prefix(parent_id_raw) if parent_type_value == "comment" else ""

    root_comment_id = ""
    if parent_chain:
        root_comment_id = str(parent_chain[0].get("id", "") or "")
    elif parent_type_value == "post":
        root_comment_id = str(comment_data.get("id", "") or "")

    parent_body = ""
    root_body = ""
    if parent_chain:
        parent_body = clean_text(parent_chain[-1].get("body", ""))
        root_body = clean_text(parent_chain[0].get("body", ""))

    parent_excerpt = truncate(parent_body, max_context_chars)
    root_excerpt = truncate(root_body, max_context_chars)

    author = comment_data.get("author")
    planner_found = find_terms(body_clean, PLANNER_TERMS)
    pain_found = find_terms(body_clean, PAIN_TERMS)
    feature_found = find_terms(body_clean, FEATURE_TERMS)
    recommendation_found = find_terms(body_clean, RECOMMENDATION_TERMS)
    signal_tags = compute_signal_tags(body_clean, planner_found, pain_found, feature_found, recommendation_found)

    reply_count = direct_reply_count(comment_data)
    is_bot = comment_is_bot(comment_data)

    row = {col: "" for col in OUTPUT_COLUMNS}
    row.update(thread_meta)

    edited_value = comment_data.get("edited")
    edited_utc = edited_value if isinstance(edited_value, (int, float)) else ""

    row.update({
        "record_id": f"{source_file.stem}:comment:{comment_data.get('id', '')}",
        "record_type": "comment",
        "comment_id": comment_data.get("id", ""),
        "comment_fullname": comment_data.get("name", ""),
        "comment_url": make_comment_url(comment_data),
        "comment_permalink": comment_data.get("permalink", ""),
        "parent_id_raw": parent_id_raw,
        "parent_type": parent_type_value,
        "parent_comment_id": parent_comment_id,
        "root_comment_id": root_comment_id,
        "depth": comment_data.get("depth", ""),
        "is_top_level": bool_to_str(parent_type_value == "post"),
        "path_ids": " > ".join([str(c.get("id", "")) for c in parent_chain] + [str(comment_data.get("id", ""))]),
        "author_hash": hash_author(author, author_salt),
        "author_public": normalize_author_public(author, keep_author),
        "author_flair_text": comment_data.get("author_flair_text", ""),
        "is_submitter": bool_to_str(comment_data.get("is_submitter")),
        "stickied": bool_to_str(comment_data.get("stickied")),
        "distinguished": comment_data.get("distinguished", ""),
        "score": comment_data.get("score", ""),
        "ups": comment_data.get("ups", ""),
        "downs": comment_data.get("downs", ""),
        "controversiality": comment_data.get("controversiality", ""),
        "reply_count_direct": reply_count,
        "created_utc": comment_data.get("created_utc", ""),
        "created_iso": utc_to_iso(comment_data.get("created_utc")),
        "edited": bool_to_str(edited_value),
        "edited_utc": edited_utc,
        "edited_iso": utc_to_iso(edited_utc) if edited_utc else "",
        "collapsed": bool_to_str(comment_data.get("collapsed")),
        "locked": bool_to_str(comment_data.get("locked")),
        "archived": bool_to_str(comment_data.get("archived")),
        "score_hidden": bool_to_str(comment_data.get("score_hidden")),
        "body_clean": body_clean,
        "body_excerpt_280": truncate(body_clean, 280),
        "body_length_chars": len(body_clean),
        "body_word_count": len(body_clean.split()),
        "parent_body_excerpt": parent_excerpt,
        "root_body_excerpt": root_excerpt,
        "text_urls": extract_urls(body_clean),
        "contains_question": bool_to_str(bool(QUESTION_RE.search(body_clean))),
        "contains_recommendation_language": bool_to_str(bool(recommendation_found)),
        "planner_terms_found": " | ".join(planner_found),
        "pain_terms_found": " | ".join(pain_found),
        "feature_terms_found": " | ".join(feature_found),
        "signal_tags": " | ".join(signal_tags),
        "relevance_score_0_100": relevance_score(
            body_clean=body_clean,
            score=comment_data.get("score", 0),
            reply_count=reply_count,
            planner_found=planner_found,
            pain_found=pain_found,
            feature_found=feature_found,
            signal_tags=signal_tags,
            is_stickied=bool(comment_data.get("stickied")),
            is_bot=is_bot,
        ),
        "text_for_ai": build_text_for_ai(
            thread_title=thread_meta["thread_title"],
            thread_selftext=thread_meta["thread_selftext_clean"],
            body_clean=body_clean,
            parent_excerpt=parent_excerpt,
            root_excerpt=root_excerpt,
            max_chars=max_text_for_ai_chars,
        ),
    })
    return row


def process_json_file(
    json_path: Path,
    output_dir: Path,
    include_post_row: bool,
    include_bots: bool,
    keep_deleted: bool,
    keep_author: bool,
    author_salt: str,
    max_context_chars: int,
    max_text_for_ai_chars: int,
) -> Tuple[Path, int]:
    with json_path.open("r", encoding="utf-8") as f:
        doc = json.load(f)

    post_data, comment_children = extract_post_and_comments(doc)

    if not post_data:
        raise ValueError(f"Não foi possível encontrar o post principal em: {json_path}")

    rows: List[Dict[str, Any]] = []

    if include_post_row:
        rows.append(
            make_post_row(
                source_file=json_path,
                post_data=post_data,
                keep_author=keep_author,
                author_salt=author_salt,
                max_text_for_ai_chars=max_text_for_ai_chars,
            )
        )

    for comment_data, parent_chain in iter_comments_recursive(comment_children):
        body_clean = clean_text(comment_data.get("body", ""))

        if not keep_deleted and is_deleted_or_removed(body_clean):
            continue

        if not include_bots and comment_is_bot(comment_data):
            continue

        row = make_comment_row(
            source_file=json_path,
            post_data=post_data,
            comment_data=comment_data,
            parent_chain=parent_chain,
            keep_author=keep_author,
            author_salt=author_salt,
            max_context_chars=max_context_chars,
            max_text_for_ai_chars=max_text_for_ai_chars,
        )
        rows.append(row)

    output_dir.mkdir(parents=True, exist_ok=True)
    out_name = safe_filename_stem(json_path) + ".csv"
    out_path = output_dir / out_name

    with out_path.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=OUTPUT_COLUMNS,
            extrasaction="ignore",
            quoting=csv.QUOTE_ALL,
        )
        writer.writeheader()
        writer.writerows(rows)

    return out_path, len(rows)


def list_json_files(input_dir: Path, recursive: bool) -> List[Path]:
    pattern = "**/*.json" if recursive else "*.json"
    return sorted(p for p in input_dir.glob(pattern) if p.is_file())


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extrai dados relevantes de JSONs de threads do Reddit e gera um CSV por arquivo."
    )

    parser.add_argument(
        "-i", "--input-dir",
        required=True,
        help="Diretório contendo os arquivos .json do Reddit."
    )
    parser.add_argument(
        "-o", "--output-dir",
        required=True,
        help="Diretório onde os arquivos CSV serão gerados."
    )
    parser.add_argument(
        "--recursive",
        action="store_true",
        help="Procura arquivos .json também em subdiretórios."
    )
    parser.add_argument(
        "--include-post-row",
        action="store_true",
        default=True,
        help="Inclui o post principal como primeira linha do CSV. Padrão: ativado."
    )
    parser.add_argument(
        "--no-post-row",
        dest="include_post_row",
        action="store_false",
        help="Não inclui o post principal como linha do CSV."
    )
    parser.add_argument(
        "--include-bots",
        action="store_true",
        help="Inclui comentários de bots/AutoModerator. Padrão: desativado."
    )
    parser.add_argument(
        "--keep-deleted",
        action="store_true",
        help="Mantém comentários [deleted]/[removed]. Padrão: desativado."
    )
    parser.add_argument(
        "--keep-author",
        action="store_true",
        help="Preserva o nome público do autor no CSV. Por padrão, apenas hash anonimizado."
    )
    parser.add_argument(
        "--author-salt",
        default=DEFAULT_AUTHOR_SALT,
        help="Salt usado para anonimizar autores por hash."
    )
    parser.add_argument(
        "--max-context-chars",
        type=int,
        default=700,
        help="Máximo de caracteres para contexto do comentário pai/root."
    )
    parser.add_argument(
        "--max-text-for-ai-chars",
        type=int,
        default=6000,
        help="Máximo de caracteres no campo text_for_ai."
    )

    return parser.parse_args(argv)


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(argv)

    input_dir = Path(args.input_dir).expanduser().resolve()
    output_dir = Path(args.output_dir).expanduser().resolve()

    if not input_dir.exists() or not input_dir.is_dir():
        print(f"ERRO: input-dir não existe ou não é diretório: {input_dir}", file=sys.stderr)
        return 2

    json_files = list_json_files(input_dir, args.recursive)
    if not json_files:
        print(f"Nenhum arquivo .json encontrado em: {input_dir}", file=sys.stderr)
        return 1

    print(f"Arquivos JSON encontrados: {len(json_files)}")
    print(f"Saída: {output_dir}")

    total_rows = 0
    successes = 0
    failures = 0

    for json_path in json_files:
        try:
            out_path, row_count = process_json_file(
                json_path=json_path,
                output_dir=output_dir,
                include_post_row=args.include_post_row,
                include_bots=args.include_bots,
                keep_deleted=args.keep_deleted,
                keep_author=args.keep_author,
                author_salt=args.author_salt,
                max_context_chars=args.max_context_chars,
                max_text_for_ai_chars=args.max_text_for_ai_chars,
            )
            successes += 1
            total_rows += row_count
            print(f"OK: {json_path.name} -> {out_path.name} ({row_count} linhas)")
        except Exception as exc:
            failures += 1
            print(f"FALHA: {json_path} :: {exc}", file=sys.stderr)

    print("-" * 60)
    print(f"Processados com sucesso: {successes}")
    print(f"Falhas: {failures}")
    print(f"Total de linhas extraídas: {total_rows}")

    return 0 if failures == 0 else 3


if __name__ == "__main__":
    raise SystemExit(main())
