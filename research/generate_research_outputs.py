from __future__ import annotations

import csv
import hashlib
import json
import re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / "research"
CSV_DIR = RESEARCH / "reddit_data" / "csvs"
OUT = RESEARCH / "outputs"
OUT.mkdir(parents=True, exist_ok=True)
GENERATED_AT = datetime.now().date().isoformat()


ARCHETYPE_NAMES = {
    "nomade": "O Nômade Quântico",
    "reator": "O Reator em Cadeia",
    "vulcao": "O Vulcão Silencioso",
    "arquiteto": "O Arquiteto do Caos",
    "furacao": "O Furacão",
    "camaleao": "O Camaleão Exausto",
    "manutencao": "Perfil de Manutenção",
    "indeterminado": "Indeterminado",
}

PAIN_RULES = [
    ("abandono_do_planner", "Abandono ou queda de uso do planner", ["abandon", "stopped using", "stop using", "fall off", "fell off", "gave up", "give up", "planner graveyard", "never use", "dont use", "don't use", "doesnt work", "doesn't work", "can't stick", "cannot stick", "lose interest"]),
    ("sobrecarga_cognitiva", "Sobrecarga cognitiva e excesso de etapas", ["overwhelm", "overwhelmed", "too much", "too many", "complicated", "complex", "busy", "chaos", "mental load", "cognitive", "exhausting", "hard to keep", "too detailed"]),
    ("esquecimento_memoria", "Esquecimento, memória de trabalho e fora do campo visual", ["forget", "forgot", "forgotten", "remember", "memory", "working memory", "out of sight", "object permanence", "visible", "visibility", "reminder", "reminders", "alarm", "alarms"]),
    ("cegueira_temporal", "Cegueira temporal, atrasos e prazos", ["time blindness", "late", "deadline", "deadlines", "calendar", "timer", "schedule", "scheduling", "appointment", "appointments", "minutes", "hours", "how long", "lost track of time"]),
    ("iniciacao_tarefas", "Iniciação de tarefas e procrastinação", ["procrastinat", "can't start", "cannot start", "hard to start", "task initiation", "stuck", "begin", "getting started", "start the task", "avoidance", "avoid"]),
    ("priorizacao_decisao", "Priorização e decisão do que fazer primeiro", ["priorit", "priority", "priorities", "important", "decide", "decision", "what to do first", "choose", "triage", "urgent", "impact"]),
    ("culpa_vergonha", "Culpa, vergonha e autocrítica", ["guilt", "guilty", "shame", "ashamed", "failure", "failed", "lazy", "bad person", "beat myself", "self blame", "hate myself", "feel bad"]),
    ("rigidez_rotina", "Rotinas rígidas que quebram quando um dia falha", ["routine", "habit", "daily", "every day", "strict", "rigid", "flexible", "consistency", "consistent", "streak", "miss a day", "missed a day"]),
    ("bagunca_visual", "Bagunça visual, estética e legibilidade", ["clutter", "cluttered", "visual", "pretty", "aesthetic", "minimal", "minimalist", "clean", "color", "colour", "too many boxes", "layout", "spread", "page"]),
    ("funcao_executiva", "Função executiva e organização externa", ["executive", "executive function", "organization", "organize", "planning", "planner", "system", "structure", "external", "brain", "management"]),
    ("manutencao_constancia", "Manutenção do sistema e constância", ["maintenance", "maintain", "consistent", "consistency", "keep up", "stick with", "follow through", "sustain", "sustainable", "long term", "long-term"]),
    ("retomada_reset", "Retomada depois de falhas e reset sem punição", ["restart", "reset", "start over", "get back", "back on track", "fall behind", "catch up", "missed", "recover", "forgive", "no guilt"]),
    ("regulacao_emocional", "Regulação emocional, ansiedade e estresse", ["emotional", "emotion", "anxiety", "anxious", "stress", "stressed", "overstimulated", "overstimulation", "burnout", "rejection", "rsd", "panic", "depressed"]),
    ("hiperfoco", "Hiperfoco e túneis de atenção", ["hyperfocus", "hyper focused", "rabbit hole", "obsess", "obsessed", "all in", "deep dive", "hours on", "fixate"]),
    ("impulsividade", "Impulsividade e decisões rápidas", ["impulsive", "impulse", "buy", "bought", "spend", "spending", "new planner", "shiny", "jump into", "without thinking", "split second"]),
    ("perfeccionismo", "Perfeccionismo e tudo-ou-nada", ["perfect", "perfection", "perfectionism", "all or nothing", "all-or-nothing", "ruined", "mess up", "not good enough", "blank page"]),
    ("fadiga_decisao", "Fadiga de decisão", ["decision fatigue", "too many choices", "choice", "choices", "choose", "decide", "options", "which one"]),
    ("motivacao_dopamina", "Motivação, novidade e dopamina", ["dopamine", "novelty", "new system", "boring", "bored", "motivat", "reward", "interesting", "fun", "excitement", "excited"]),
    ("mascara_burnout", "Compensação, máscara e burnout", ["mask", "masking", "burnout", "exhausted", "tired", "late diagnosis", "diagnosed late", "compensat", "high functioning", "keep it together", "looks like"]),
    ("excesso_ideias", "Excesso de ideias e projetos pela metade", ["ideas", "idea", "brain dump", "capture", "thoughts", "notebook", "projects", "project", "half finished", "unfinished", "too many projects", "side quest"]),
    ("baixa_intensidade_manutencao", "Uso leve, simples e de manutenção", ["works for me", "simple", "easy", "low effort", "minimal", "minimalist", "light", "maintenance", "not severe", "manageable", "routine works"]),
]
PAIN_LABEL = {pid: label for pid, label, _ in PAIN_RULES}

FEATURE_RULES = [
    ("captura_rapida", "Captura rápida / inbox de ideias", ["brain dump", "capture", "inbox", "quick note", "notes", "notebook", "dump", "write it down", "parking lot", "thoughts"]),
    ("reset_sem_culpa", "Reset sem culpa e retomada curta", ["reset", "restart", "start over", "get back", "back on track", "missed a day", "no guilt", "forgive", "catch up"]),
    ("ancoras_visuais", "Âncoras visuais e lembretes contextuais", ["visible", "visual", "wall", "desk", "sticky", "post it", "reminder", "alarm", "calendar", "timer", "out of sight"]),
    ("micro_acoes", "Micro-ações e próximo passo físico", ["tiny", "small", "micro", "next step", "break down", "chunk", "one thing", "2 minute", "five minute", "5 minute"]),
    ("prioridades_1_3", "Limite de 1 a 3 prioridades", ["top 3", "three priorities", "3 priorities", "one priority", "most important", "essential", "must do", "MIT"]),
    ("ritual_semanal", "Revisão semanal e planejamento leve", ["weekly review", "review", "sunday", "week", "weekly", "plan my week", "reset day"]),
    ("checkin_humor_energia", "Check-in de humor/energia", ["mood", "energy", "spoons", "spoon", "feeling", "emotion", "stress", "capacity", "low energy"]),
    ("speed_bumps", "Speed bumps para impulso e decisões", ["pause", "wait", "24 hours", "impulse", "spending", "before buying", "cool down", "decision", "slow down"]),
    ("templates_baixo_atrito", "Templates simples de baixo atrito", ["simple", "minimal", "low effort", "easy", "blank", "printable", "paper", "template", "layout", "not too much"]),
    ("flexibilidade_modular", "Estrutura flexível e modular", ["flexible", "customize", "customise", "modular", "adapt", "change it", "different days", "different needs"]),
    ("tracking_gentil", "Tracking gentil sem streak punitivo", ["tracker", "habit tracker", "streak", "track", "tracking", "checklist", "checkbox", "not punitive"]),
]
FEATURE_LABEL = {fid: label for fid, label, _ in FEATURE_RULES}

EMOTION_RULES = [
    ("frustracao", ["frustrat", "annoy", "hate", "angry", "irritat", "struggle", "impossible"]),
    ("culpa_vergonha", ["guilt", "shame", "ashamed", "lazy", "failure", "failed", "feel bad"]),
    ("ansiedade_estresse", ["anxiety", "anxious", "stress", "stressed", "panic", "overwhelm"]),
    ("exaustao", ["exhausted", "tired", "burnout", "drained", "fatigue"]),
    ("esperanca_alivio", ["hope", "relief", "helpful", "works", "love", "finally", "better"]),
    ("curiosidade_busca", ["recommend", "advice", "what works", "looking for", "question", "suggest"]),
]
NEGATIVE_TERMS = ["frustrat", "hate", "struggle", "failed", "failure", "impossible", "exhaust", "overwhelm", "anxiety", "guilt", "shame", "bad", "hard", "can't", "cannot", "doesn't work", "doesnt work"]
POSITIVE_TERMS = ["love", "works", "worked", "helpful", "recommend", "great", "good", "simple", "easy", "success", "finally", "better", "useful"]

SOLUTION_RULES = [
    ("planner_papel", ["paper planner", "physical planner", "printable", "printed", "paper", "notebook"]),
    ("bullet_journal", ["bullet journal", "bujo", "bullet journaling"]),
    ("app_digital", ["app", "apps", "digital", "todoist", "notion", "google calendar", "calendar", "phone", "reminder", "reminders"]),
    ("lista_tarefas", ["to do list", "todo list", "task list", "checklist", "checkbox"]),
    ("habit_tracker", ["habit tracker", "tracker", "streak"]),
    ("alarme_timer", ["timer", "alarm", "pomodoro", "time timer"]),
    ("post_its_ancoras", ["sticky", "post it", "wall", "whiteboard", "visible"]),
]
FAILURE_RULES = [
    ("manutencao_alta", ["too much", "too many", "maintenance", "keep up", "hard to keep", "time consuming"]),
    ("fora_do_campo_visual", ["out of sight", "forget", "forgot", "dont look", "don't look", "remember to check", "invisible"]),
    ("rigido_demais", ["strict", "rigid", "daily", "every day", "missed a day", "fall behind"]),
    ("branco_demais", ["blank", "empty", "no structure", "too open", "don't know what to write"]),
    ("complexo_demais", ["complicated", "complex", "too detailed", "too many boxes", "cluttered", "overwhelming"]),
    ("novidade_acaba", ["novelty", "boring", "bored", "lose interest", "lost interest", "new system"]),
    ("culpa_apos_falha", ["guilt", "shame", "failure", "ruined", "start over", "missed"]),
    ("setup_vira_procrastinacao", ["setup", "setting up", "decorate", "pretty", "aesthetic", "hours", "hyperfocus"]),
]
BEHAVIOR_RULES = [
    ("pede_recomendacao", ["recommend", "advice", "what works", "looking for", "suggest", "help me"]),
    ("troca_ou_compra_sistemas", ["new planner", "buy", "bought", "try another", "different planner", "switch"]),
    ("abandona_apos_gap", ["missed a day", "fall behind", "start over", "reset", "back on track"]),
    ("hiperfoca_configuracao", ["setup", "decorate", "aesthetic", "hyperfocus", "rabbit hole", "hours"]),
    ("usa_papel_visivel", ["paper", "notebook", "visible", "wall", "whiteboard", "sticky"]),
    ("usa_app_lembrete", ["app", "calendar", "reminder", "alarm", "phone", "todoist", "notion"]),
    ("evita_por_sobrecarga", ["avoid", "overwhelm", "too much", "complicated", "exhausting"]),
    ("rotina_funcionando", ["works for me", "worked for me", "i use", "i do", "helpful", "love"]),
]

COPY_ANGLES = {
    "nomade": "trazer o plano de volta para o campo de visão sem depender só da memória",
    "reator": "transformar energia inicial em continuidade com pausas e checkpoints simples",
    "vulcao": "planejar respeitando estado emocional e retomada após dias difíceis",
    "arquiteto": "dar andaime para ideias virarem próximo passo concreto",
    "furacao": "reduzir o dia ao essencial e oferecer reset simples quando tudo sair do eixo",
    "camaleao": "fazer menos de forma sustentável sem transformar compensação em cobrança",
    "manutencao": "manter uma estrutura leve, suficiente e fácil de repetir",
    "indeterminado": "não usar como ângulo de copy sem revisão humana",
}
FEATURE_BY_ARCH = {
    "nomade": "ancoras_visuais",
    "reator": "speed_bumps",
    "vulcao": "checkin_humor_energia",
    "arquiteto": "micro_acoes",
    "furacao": "prioridades_1_3",
    "camaleao": "reset_sem_culpa",
    "manutencao": "templates_baixo_atrito",
    "indeterminado": "indeterminado",
}


def clean_space(value: str | None) -> str:
    return re.sub(r"\s+", " ", (value or "").strip())


def excerpt(value: str | None, limit: int = 280) -> str:
    text = clean_space(value)
    if len(text) <= limit:
        return text
    return text[: max(0, limit - 3)].rstrip() + "..."


def simple_text(value: str | None) -> str:
    return re.sub(r"[^a-z0-9à-ÿ]+", " ", (value or "").lower()).strip()


def find_terms(text: str, terms: list[str]) -> list[str]:
    hay = simple_text(text)
    found = []
    for term in terms:
        needle = simple_text(term)
        if needle and needle in hay:
            found.append(term)
    return sorted(set(found))


def as_int(value: str | None, default: int = 0) -> int:
    try:
        if value is None or value == "":
            return default
        return int(float(value))
    except ValueError:
        return default


def avg(values: list[int]) -> float:
    return round(sum(values) / len(values), 2) if values else 0


def pct(values: list[int], q: float) -> int:
    if not values:
        return 0
    data = sorted(values)
    idx = int(round((len(data) - 1) * q))
    return data[idx]


def md_escape(value) -> str:
    return clean_space(str(value if value is not None else "")).replace("|", "/")


def md_table(headers: list[str], rows: list[list[object]]) -> str:
    lines = ["| " + " | ".join(md_escape(h) for h in headers) + " |"]
    lines.append("| " + " | ".join("---" for _ in headers) + " |")
    for row in rows:
        lines.append("| " + " | ".join(md_escape(cell) for cell in row) + " |")
    return "\n".join(lines)


def build_analysis_text(row: dict) -> str:
    title = clean_space(row.get("thread_title"))
    body = clean_space(row.get("body_clean"))
    selftext = clean_space(row.get("thread_selftext_clean"))
    parent = clean_space(row.get("parent_body_excerpt"))
    root = clean_space(row.get("root_body_excerpt"))
    parts = []
    if title:
        parts.append(f"Título da thread: {title}")
    if body:
        parts.append(f"Registro analisado: {body}")
    elif selftext:
        parts.append(f"Texto do post: {selftext}")
    if parent and parent not in body:
        parts.append(f"Contexto do pai: {parent}")
    if root and root not in body and root != parent:
        parts.append(f"Contexto da raiz: {root}")
    return "\n".join(parts)[:4000]


def first_matching_rule(text: str, rules: list[tuple[str, list[str]]]) -> str:
    scored = []
    for rid, terms in rules:
        matches = find_terms(text, terms)
        if matches:
            scored.append((len(matches), rid))
    return sorted(scored, reverse=True)[0][1] if scored else "indeterminado"


def sentiment(text: str) -> tuple[str, int]:
    neg = len(find_terms(text, NEGATIVE_TERMS))
    pos = len(find_terms(text, POSITIVE_TERMS))
    score = pos - neg
    if pos and neg:
        return "misto", score
    if score > 0:
        return "positivo", score
    if score < 0:
        return "negativo", score
    return "neutro", 0


def classify_qual(row: dict, analysis_text: str) -> dict:
    pain_scores = []
    pain_match_terms = defaultdict(list)
    for pid, _label, terms in PAIN_RULES:
        matches = find_terms(analysis_text, terms)
        if matches:
            pain_scores.append((len(matches), pid))
            pain_match_terms[pid] = matches
    pain_scores.sort(reverse=True)
    pain_ids = [pid for _score, pid in pain_scores]
    main_pain = pain_ids[0] if pain_ids else "indeterminado"
    secondary = [pid for pid in pain_ids[1:5]]

    feature_scores = []
    feature_matches = {}
    for fid, _label, terms in FEATURE_RULES:
        matches = find_terms(analysis_text, terms)
        if matches:
            feature_scores.append((len(matches), fid))
            feature_matches[fid] = matches
    feature_scores.sort(reverse=True)
    desired_feature = feature_scores[0][1] if feature_scores else "indeterminado"

    sent_label, sent_score = sentiment(analysis_text)
    emotions = [eid for eid, terms in EMOTION_RULES if find_terms(analysis_text, terms)]
    behavior = first_matching_rule(analysis_text, BEHAVIOR_RULES)
    solution = first_matching_rule(analysis_text, SOLUTION_RULES)
    failure = first_matching_rule(analysis_text, FAILURE_RULES)
    relevance = as_int(row.get("relevance_score_0_100"))

    if main_pain != "indeterminado" and relevance >= 35:
        evidence_type = "evidencia_direta"
    elif main_pain != "indeterminado" or desired_feature != "indeterminado":
        evidence_type = "inferencia_textual"
    else:
        evidence_type = "baixo_sinal_para_discovery"

    if relevance >= 65 and main_pain != "indeterminado" and (desired_feature != "indeterminado" or len(pain_ids) >= 2):
        confidence = "alta"
    elif relevance >= 35 and main_pain != "indeterminado":
        confidence = "média"
    elif main_pain != "indeterminado" or desired_feature != "indeterminado":
        confidence = "baixa"
    else:
        confidence = "baixa"

    matched_signal_terms = []
    if main_pain in pain_match_terms:
        matched_signal_terms.extend(pain_match_terms[main_pain][:5])
    if desired_feature in feature_matches:
        matched_signal_terms.extend(feature_matches[desired_feature][:5])
    matched_signal_terms = sorted(set(matched_signal_terms))[:8]
    inference = "Sem sinal textual suficiente para conclusão qualitativa."
    if main_pain != "indeterminado":
        inference = f"Dor inferida por sinais textuais ligados a {PAIN_LABEL[main_pain]}."
    if desired_feature != "indeterminado":
        inference += f" Oportunidade associada: {FEATURE_LABEL[desired_feature]}."

    return {
        "record_id": row.get("record_id", ""),
        "source_file_stem": row.get("source_file_stem", ""),
        "thread_url": row.get("thread_url", ""),
        "comment_url": row.get("comment_url", ""),
        "subreddit": row.get("subreddit", ""),
        "record_type": row.get("record_type", ""),
        "relevance_score_0_100": str(relevance),
        "main_pain": main_pain,
        "main_pain_label": PAIN_LABEL.get(main_pain, "Indeterminado"),
        "secondary_pains": "; ".join(secondary),
        "sentiment": sent_label,
        "sentiment_score": str(sent_score),
        "emotions": "; ".join(emotions) if emotions else "indeterminado",
        "behavior_pattern": behavior,
        "solution_tried": solution,
        "failure_reason": failure,
        "desired_feature": desired_feature,
        "desired_feature_label": FEATURE_LABEL.get(desired_feature, "Indeterminado"),
        "complaint": PAIN_LABEL.get(main_pain, "Indeterminado") if sent_label in {"negativo", "misto"} and main_pain != "indeterminado" else "",
        "praise": FEATURE_LABEL.get(desired_feature, "") if sent_label in {"positivo", "misto"} and desired_feature != "indeterminado" else "",
        "evidence_type": evidence_type,
        "evidence_short": excerpt(row.get("body_clean") or analysis_text, 220),
        "inference": inference,
        "signal_terms": "; ".join(matched_signal_terms),
        "confidence_level": confidence,
    }


def classify_arch(row: dict, q: dict) -> dict:
    pains = {q["main_pain"]} | {p for p in q["secondary_pains"].split("; ") if p}
    feature = q["desired_feature"]
    relevance = as_int(q["relevance_score_0_100"])
    scores = Counter()
    signals = defaultdict(list)

    def add(arch: str, points: int, signal: str) -> None:
        scores[arch] += points
        signals[arch].append(signal)

    if "esquecimento_memoria" in pains:
        add("nomade", 3, "esquecimento/memória de trabalho")
    if "cegueira_temporal" in pains:
        add("nomade", 3, "tempo/prazos")
    if "bagunca_visual" in pains or feature == "ancoras_visuais":
        add("nomade", 2, "âncora visual")
    if "impulsividade" in pains:
        add("reator", 3, "impulso")
    if "motivacao_dopamina" in pains:
        add("reator", 2, "novidade/dopamina")
    if "hiperfoco" in pains:
        add("reator", 2, "hiperfoco")
    if feature == "speed_bumps":
        add("reator", 2, "speed bump")
    if "culpa_vergonha" in pains:
        add("vulcao", 3, "culpa/vergonha")
    if "regulacao_emocional" in pains:
        add("vulcao", 3, "regulação emocional")
    if "perfeccionismo" in pains:
        add("vulcao", 2, "perfeccionismo")
    if feature == "checkin_humor_energia":
        add("vulcao", 2, "check-in de energia")
    if "excesso_ideias" in pains:
        add("arquiteto", 3, "excesso de ideias")
    if "iniciacao_tarefas" in pains:
        add("arquiteto", 2, "iniciação")
    if "priorizacao_decisao" in pains or "fadiga_decisao" in pains:
        add("arquiteto", 2, "priorização/decisão")
    if "funcao_executiva" in pains:
        add("arquiteto", 1, "função executiva")
    if feature in {"captura_rapida", "micro_acoes"}:
        add("arquiteto", 2, "captura/micro-ação")
    if "sobrecarga_cognitiva" in pains:
        add("furacao", 3, "sobrecarga")
    if len([p for p in pains if p != "indeterminado"]) >= 4:
        add("furacao", 3, "muitos sinais simultâneos")
    if feature == "prioridades_1_3":
        add("furacao", 2, "redução ao essencial")
    if "mascara_burnout" in pains:
        add("camaleao", 3, "máscara/burnout")
    if "manutencao_constancia" in pains:
        add("camaleao", 2, "custo de manutenção")
    if "retomada_reset" in pains or feature == "reset_sem_culpa":
        add("camaleao", 2, "retomada sem punição")
    if "baixa_intensidade_manutencao" in pains:
        add("manutencao", 3, "uso simples/de manutenção")
    if q["sentiment"] in {"positivo", "misto"} and feature == "templates_baixo_atrito":
        add("manutencao", 2, "baixo atrito funciona")
    if q["main_pain"] == "abandono_do_planner":
        add("reator", 1, "queda de novidade")
        add("camaleao", 1, "retomada")
        add("furacao", 1, "rotina falha em dias intensos")

    if not scores or relevance < 15:
        primary, secondary, confidence = "indeterminado", [], "baixa"
    else:
        ordered = scores.most_common()
        primary, top_score = ordered[0]
        if top_score < 2:
            primary, secondary, confidence = "indeterminado", [], "baixa"
        else:
            secondary = [a for a, s in ordered[1:] if s >= 2 and s >= top_score - 2][:2]
            gap = top_score - (ordered[1][1] if len(ordered) > 1 else 0)
            if top_score >= 6 and gap >= 2 and relevance >= 50:
                confidence = "alta"
            elif top_score >= 3 and relevance >= 30:
                confidence = "média"
            else:
                confidence = "baixa"

    central = q["main_pain_label"] if q["main_pain"] != "indeterminado" else "Indeterminada"
    feature_id = feature if feature != "indeterminado" else FEATURE_BY_ARCH.get(primary, "indeterminado")
    feature_label = FEATURE_LABEL.get(feature_id, "Indeterminado")
    signal_text = "; ".join(signals.get(primary, [])) if primary != "indeterminado" else q.get("signal_terms", "")
    risk = "baixo"
    if primary == "indeterminado" or confidence == "baixa":
        risk = "alto: revisar manualmente antes de usar em decisão de produto"
    elif secondary:
        risk = "médio: há sinais de arquétipo secundário"

    return {
        "record_id": row.get("record_id", ""),
        "source_file_stem": row.get("source_file_stem", ""),
        "thread_url": row.get("thread_url", ""),
        "comment_url": row.get("comment_url", ""),
        "subreddit": row.get("subreddit", ""),
        "body_excerpt_280": excerpt(row.get("body_clean"), 280),
        "arquetipo_principal": primary,
        "arquetipo_principal_nome": ARCHETYPE_NAMES.get(primary, "Indeterminado"),
        "arquetipos_secundarios": "; ".join(secondary),
        "nivel_confianca": confidence,
        "dor_central": central,
        "sinais_textuais": signal_text,
        "motivo_classificacao": f"Classificação heurística baseada em {central}; não é inferência clínica.",
        "feature_sugerida": feature_label,
        "feature_sugerida_id": feature_id,
        "copy_angle": COPY_ANGLES.get(primary, COPY_ANGLES["indeterminado"]),
        "risk_ambiguity": risk,
    }


def write_csv(path: Path, records: list[dict], fieldnames: list[str] | None = None) -> None:
    if fieldnames is None:
        fieldnames = list(records[0].keys()) if records else []
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore", lineterminator="\n")
        writer.writeheader()
        writer.writerows(records)


def header_block(title: str, summary: str, deps: list[str]) -> str:
    deps_md = "; ".join(deps)
    return f"""# {title}

> **Ticket:** Pesquisa interna / sem ticket Jira atribuído  
> **Status:** Gerado em {GENERATED_AT}  
> **Dependências:** {deps_md}  
> **Sumário:** {summary}

---
"""


def load_corpus() -> tuple[list[Path], list[dict], Counter]:
    csv_files = sorted(CSV_DIR.glob("*.csv"))
    rows: list[dict] = []
    header_counter: Counter = Counter()
    for path in csv_files:
        with path.open("r", encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle)
            header_counter[tuple(reader.fieldnames or [])] += 1
            for row in reader:
                clean_row = {k: (v or "") for k, v in row.items() if k is not None}
                clean_row["source_file"] = clean_row.get("source_file") or str(path)
                clean_row["source_file_stem"] = clean_row.get("source_file_stem") or path.stem
                rows.append(clean_row)
    return csv_files, rows, header_counter


def supplemental_inventory() -> list[dict]:
    supplemental = []
    for path in sorted(RESEARCH.glob("*.csv")):
        try:
            with path.open("r", encoding="utf-8-sig", newline="") as handle:
                reader = csv.DictReader(handle)
                fields = reader.fieldnames or []
                row_count = sum(1 for _ in reader)
            header_status = "ok" if fields and all(f for f in fields[:3]) else "sem cabeçalho detectável"
            if len(fields) <= 1:
                header_status = "schema inconsistente ou sem cabeçalho detectável"
            supplemental.append({"file": path.name, "rows": row_count, "columns": len(fields), "status": header_status})
        except Exception as exc:  # pragma: no cover - operational inventory.
            supplemental.append({"file": path.name, "rows": "", "columns": "", "status": f"erro ao ler: {exc}"})
    return supplemental


def main() -> None:
    csv_files, rows, header_counter = load_corpus()
    body_hash_counts: Counter = Counter()
    row_hash = {}
    for row in rows:
        norm = simple_text(row.get("body_clean"))
        if len(norm.split()) >= 8:
            digest = hashlib.sha1(norm.encode("utf-8")).hexdigest()[:16]
            row_hash[row.get("record_id", "")] = digest
            body_hash_counts[digest] += 1

    cluster_id = {}
    cluster_seq = 1
    for digest, count in body_hash_counts.items():
        if count > 1:
            cluster_id[digest] = f"DUP{cluster_seq:04d}"
            cluster_seq += 1

    consolidated_rows = []
    qual_rows = []
    arch_rows = []
    for row in rows:
        analysis_text = build_analysis_text(row)
        tfa = row.get("text_for_ai", "")
        digest = row_hash.get(row.get("record_id", ""), "")
        consolidated = {
            "source_file_stem": row.get("source_file_stem", ""),
            "source_file": row.get("source_file", ""),
            "thread_id": row.get("thread_id", ""),
            "thread_url": row.get("thread_url", ""),
            "subreddit": row.get("subreddit", ""),
            "thread_title": row.get("thread_title", ""),
            "record_id": row.get("record_id", ""),
            "record_type": row.get("record_type", ""),
            "comment_id": row.get("comment_id", ""),
            "comment_url": row.get("comment_url", ""),
            "parent_type": row.get("parent_type", ""),
            "parent_comment_id": row.get("parent_comment_id", ""),
            "root_comment_id": row.get("root_comment_id", ""),
            "depth": row.get("depth", ""),
            "is_top_level": row.get("is_top_level", ""),
            "score": row.get("score", ""),
            "created_iso": row.get("created_iso", ""),
            "body_clean": row.get("body_clean", ""),
            "body_excerpt_280": row.get("body_excerpt_280") or excerpt(row.get("body_clean"), 280),
            "body_length_chars": row.get("body_length_chars", ""),
            "body_word_count": row.get("body_word_count", ""),
            "parent_body_excerpt": row.get("parent_body_excerpt", ""),
            "root_body_excerpt": row.get("root_body_excerpt", ""),
            "contains_question": row.get("contains_question", ""),
            "contains_recommendation_language": row.get("contains_recommendation_language", ""),
            "planner_terms_found": row.get("planner_terms_found", ""),
            "pain_terms_found": row.get("pain_terms_found", ""),
            "feature_terms_found": row.get("feature_terms_found", ""),
            "signal_tags": row.get("signal_tags", ""),
            "relevance_score_0_100": row.get("relevance_score_0_100", ""),
            "text_for_ai": tfa,
            "analysis_text": analysis_text,
            "text_for_ai_truncated": "true" if len(tfa) >= 5900 else "false",
            "duplicate_text_cluster": cluster_id.get(digest, ""),
        }
        consolidated_rows.append(consolidated)
        q = classify_qual(row, analysis_text)
        qual_rows.append(q)
        arch_rows.append(classify_arch(row, q))

    write_csv(OUT / "reddit_evidence_consolidated.csv", consolidated_rows)
    write_csv(OUT / "reddit_qualitative_findings.csv", qual_rows)
    write_csv(OUT / "reddit_archetype_classification.csv", arch_rows)
    write_markdown_outputs(csv_files, rows, header_counter, consolidated_rows, qual_rows, arch_rows)

    summary = {
        "csv_files": len(csv_files),
        "records": len(rows),
        "thread_posts": Counter(row.get("record_type", "") for row in rows).get("thread_post", 0),
        "comments": Counter(row.get("record_type", "") for row in rows).get("comment", 0),
        "subreddits": len(Counter(row.get("subreddit", "") for row in rows)),
        "record_id_duplicates": len([r.get("record_id", "") for r in rows]) - len({r.get("record_id", "") for r in rows}),
        "text_for_ai_truncated_records": sum(1 for row in consolidated_rows if row["text_for_ai_truncated"] == "true"),
        "duplicate_text_clusters": len({row["duplicate_text_cluster"] for row in consolidated_rows if row["duplicate_text_cluster"]}),
        "generated_files": sorted(p.name for p in OUT.glob("*")),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


def write_markdown_outputs(csv_files: list[Path], rows: list[dict], header_counter: Counter, consolidated_rows: list[dict], qual_rows: list[dict], arch_rows: list[dict]) -> None:
    record_count = len(rows)
    record_type_counts = Counter(row.get("record_type", "") for row in rows)
    subreddit_counts = Counter(row.get("subreddit", "") for row in rows)
    record_ids = [row.get("record_id", "") for row in rows]
    record_id_dupes = len(record_ids) - len(set(record_ids))
    truncated_count = sum(1 for row in consolidated_rows if row["text_for_ai_truncated"] == "true")
    duplicate_cluster_count = len({row["duplicate_text_cluster"] for row in consolidated_rows if row["duplicate_text_cluster"]})
    duplicate_record_count = sum(1 for row in consolidated_rows if row["duplicate_text_cluster"])
    body_lengths = [as_int(row.get("body_length_chars")) for row in rows]
    tfa_lengths = [len(row.get("text_for_ai", "")) for row in rows]

    pain_counts = Counter(q["main_pain"] for q in qual_rows)
    feature_counts = Counter(q["desired_feature"] for q in qual_rows)
    emotion_counts: Counter = Counter()
    for q in qual_rows:
        for emotion in q["emotions"].split("; "):
            if emotion and emotion != "indeterminado":
                emotion_counts[emotion] += 1
    behavior_counts = Counter(q["behavior_pattern"] for q in qual_rows)
    solution_counts = Counter(q["solution_tried"] for q in qual_rows)
    failure_counts = Counter(q["failure_reason"] for q in qual_rows)
    sentiment_counts = Counter(q["sentiment"] for q in qual_rows)
    arch_counts = Counter(a["arquetipo_principal"] for a in arch_rows)
    conf_counts = Counter(a["nivel_confianca"] for a in arch_rows)
    arch_feature_counts = Counter((a["arquetipo_principal"], a["feature_sugerida_id"]) for a in arch_rows if a["arquetipo_principal"] != "indeterminado")
    pain_arch_counts = Counter((q["main_pain"], a["arquetipo_principal"]) for q, a in zip(qual_rows, arch_rows) if q["main_pain"] != "indeterminado" and a["arquetipo_principal"] != "indeterminado")
    pain_feature_counts = Counter((q["main_pain"], q["desired_feature"]) for q in qual_rows if q["main_pain"] != "indeterminado" and q["desired_feature"] != "indeterminado")
    solution_failure_counts = Counter((q["solution_tried"], q["failure_reason"]) for q in qual_rows if q["solution_tried"] != "indeterminado" and q["failure_reason"] != "indeterminado")
    row_by_id = {row.get("record_id", ""): row for row in rows}

    def examples_for_pain(pid: str, limit: int = 3) -> list[list[str]]:
        candidates = [q for q in qual_rows if q["main_pain"] == pid]
        candidates.sort(key=lambda q: as_int(q["relevance_score_0_100"]), reverse=True)
        return [[q["record_id"], q["source_file_stem"], q["evidence_type"], q["evidence_short"]] for q in candidates[:limit]]

    def examples_for_arch(arch: str, limit: int = 3) -> list[list[str]]:
        candidates = [a for a in arch_rows if a["arquetipo_principal"] == arch]
        order = {"alta": 3, "média": 2, "baixa": 1}
        candidates.sort(key=lambda a: (order.get(a["nivel_confianca"], 0), as_int(row_by_id.get(a["record_id"], {}).get("relevance_score_0_100"))), reverse=True)
        return [[a["record_id"], a["nivel_confianca"], a["dor_central"], a["feature_sugerida"], excerpt(a["body_excerpt_280"], 160)] for a in candidates[:limit]]

    pain_rows = []
    for pid, count in pain_counts.most_common():
        rels = [as_int(q["relevance_score_0_100"]) for q in qual_rows if q["main_pain"] == pid]
        pain_rows.append([pid, PAIN_LABEL.get(pid, "Indeterminado"), count, avg(rels), round(count / record_count * 100, 1) if record_count else 0])

    write_plan(csv_files, record_count, record_type_counts, truncated_count)
    write_manifest(csv_files, record_count, record_type_counts, subreddit_counts, header_counter, record_id_dupes, truncated_count, duplicate_cluster_count, duplicate_record_count, body_lengths, tfa_lengths)
    write_qualitative_map(pain_counts, pain_rows, sentiment_counts, emotion_counts, behavior_counts, solution_counts, failure_counts, feature_counts, examples_for_pain)
    write_archetype_matrix(record_count, arch_counts, conf_counts, pain_arch_counts, arch_feature_counts, examples_for_arch)
    write_strategic_matrices(pain_rows, pain_counts, pain_arch_counts, pain_feature_counts, solution_failure_counts, failure_counts, arch_counts)
    write_quiz_validation(arch_counts, arch_rows)
    write_final_report(csv_files, record_count, pain_counts, pain_feature_counts, arch_counts)


def write_plan(csv_files, record_count, record_type_counts, truncated_count) -> None:
    plan_md = header_block(
        "Plano de Ação - Fechamento da Fase de Pesquisa Planner TDAH",
        "Define a execução rastreável para transformar o corpus Reddit congelado em inteligência de produto sem alterar quiz, copy de produção ou planner.",
        ["escopo_handoff_pesquisa_analise_dados_planner_tdah.md", "research/reddit_data/csvs/", "foundation/posicionamento-etico.md"],
    )
    plan_md += f"""
## 1. Resumo executivo

A próxima entrega desta fase é este plano formal, seguido por manifesto de corpus, base consolidada, classificação qualitativa, classificação por arquétipos, matrizes estratégicas, validação contra quiz/produto e relatório final de discovery.

A coleta permanece congelada: não houve scraping novo, não houve leitura ampla de JSONs brutos e não houve alteração de quiz, copy de produção ou produto. A evidência primária vem dos CSVs locais em `research/reddit_data/csvs/`.

## 2. Estado confirmado

{md_table(["Área", "Estado confirmado", "Observação"], [
    ["Corpus Reddit local", f"{len(csv_files)} CSVs / {record_count} registros", f"{record_type_counts.get('thread_post', 0)} posts/thread rows e {record_type_counts.get('comment', 0)} comentários."],
    ["research/outputs/", "Criado nesta execução", "Antes da execução não havia artefatos finais."],
    ["text_for_ai", "Disponível, mas não canônico para registros longos", f"{truncated_count} registros chegaram a >= 5.900 caracteres; `analysis_text` usa `body_clean` com contexto curto."],
    ["NotebookLM", "Contexto complementar", "Não é dependência desta rodada; outputs são reproduzíveis localmente."],
    ["Quiz/produto", "Somente leitura", "Comparação documental contra `quiz/data/archetypes.js` e estrutura do planner."],
])}

## 3. Artefatos entregáveis

{md_table(["Ordem", "Artefato", "Função"], [
    [1, "research/outputs/00_plano_acao_fechamento_pesquisa.md", "Plano formal da fase."],
    [2, "research/outputs/00_corpus_manifest.md", "Congela corpus e limitações."],
    [3, "research/outputs/reddit_evidence_consolidated.csv", "Base única rastreável."],
    [4, "research/outputs/01_mapa_qualitativo_dores_reddit.md", "Mapa de dores e oportunidades."],
    [5, "research/outputs/reddit_qualitative_findings.csv", "Classificação qualitativa linha a linha."],
    [6, "research/outputs/02_matriz_arquetipos_dores_features.md", "Matriz arquétipo x dor x feature."],
    [7, "research/outputs/reddit_archetype_classification.csv", "Classificação heurística por arquétipo."],
    [8, "research/outputs/03_matrizes_estrategicas_planner_tdah.md", "Matrizes de decisão de produto/copy."],
    [9, "research/outputs/04_validacao_quiz_vs_pesquisa.md", "Validação documental contra quiz."],
    [10, "research/outputs/05_relatorio_final_product_discovery_planner_tdah.md", "Recomendações decisórias."],
])}

## 4. Método de execução

1. Congelar e documentar inventário de CSVs.
2. Consolidar os registros preservando `source_file_stem`, `record_id`, `thread_url` e `comment_url`.
3. Criar `analysis_text` priorizando `body_clean` e contexto curto de thread/pai/raiz.
4. Marcar truncamento provável de `text_for_ai` e duplicação textual por conteúdo limpo.
5. Classificar dores, emoções, soluções tentadas, falhas e features desejadas com regras heurísticas transparentes.
6. Classificar arquétipos como hipótese de discovery; usar `indeterminado` quando o sinal textual for fraco.
7. Separar evidência, inferência e recomendação em todos os documentos.

## 5. Critérios de aceite

{md_table(["Critério", "Como será validado"], [
    ["Contagem dos CSVs bate com manifesto", "Validação automática pós-geração."],
    ["`record_id` sem duplicidade", "Validação automática no consolidado."],
    ["`text_for_ai` não é usado sozinho quando truncado", "Campo `analysis_text` criado com `body_clean` + contexto."],
    ["Achados rastreáveis", "CSV e Markdown preservam identificadores e URLs."],
    ["Sem diagnóstico clínico", "Relatórios usam linguagem de comportamento e fricção, não diagnóstico."],
    ["Copy ética", "Ângulos são descritos como oportunidades e evitam promessa de cura/tratamento."],
])}

## 6. Riscos e limites

- A divergência entre 40 CSVs citados em handoff antigo e 65 CSVs locais fica registrada no manifesto.
- Os dossiês complementares entram apenas como contexto, não como evidência primária.
- A classificação é triagem heurística e exige revisão humana antes de decisão final de produto ou copy.
- Citações diretas devem ser curtas, anonimizadas e sempre rastreáveis.

## Histórico de revisões

{md_table(["Data", "Versão", "Mudança", "Autor"], [[GENERATED_AT, "1.0", "Plano formal gerado e conectado aos outputs desta fase.", "Codex"]])}
"""
    (OUT / "00_plano_acao_fechamento_pesquisa.md").write_text(plan_md, encoding="utf-8")


def write_manifest(csv_files, record_count, record_type_counts, subreddit_counts, header_counter, record_id_dupes, truncated_count, duplicate_cluster_count, duplicate_record_count, body_lengths, tfa_lengths) -> None:
    supplemental = supplemental_inventory()
    manifest_md = header_block(
        "Manifesto do Corpus Reddit - Fechamento de Pesquisa Planner TDAH",
        "Congela o corpus primário usado na análise e explicita divergências, limites e regras de rastreabilidade.",
        ["research/reddit_data/csvs/", "research/reddit_json_to_csv.py", "escopo_handoff_pesquisa_analise_dados_planner_tdah.md"],
    )
    manifest_md += f"""
## 1. Regra de congelamento

O corpus padrão desta fase é composto por todos os CSVs locais em `research/reddit_data/csvs/`. Nenhum scraping novo foi executado e nenhum JSON bruto foi necessário para a geração destes outputs.

A referência antiga a 40 fontes deve ser tratada como desatualizada para esta rodada. O inventário local confirmou **{len(csv_files)} CSVs Reddit**.

## 2. Contagem consolidada

{md_table(["Métrica", "Valor"], [
    ["CSVs Reddit primários", len(csv_files)],
    ["Registros totais", record_count],
    ["Thread posts", record_type_counts.get("thread_post", 0)],
    ["Comentários", record_type_counts.get("comment", 0)],
    ["Subreddits únicos", len(subreddit_counts)],
    ["Schemas únicos nos CSVs primários", len(header_counter)],
    ["Duplicidades de `record_id`", record_id_dupes],
    ["Registros com `text_for_ai` >= 5.900 caracteres", truncated_count],
    ["Clusters de texto duplicado por `body_clean`", duplicate_cluster_count],
    ["Registros em clusters duplicados", duplicate_record_count],
])}

## 3. Distribuição por subreddit

{md_table(["Subreddit", "Registros"], subreddit_counts.most_common())}

## 4. Campos preservados

Os CSVs primários compartilham o mesmo schema. O consolidado preserva campos essenciais de origem, thread, comentário, contexto, score, data, texto limpo e sinais já extraídos, além de campos novos de análise.

{md_table(["Campo novo", "Descrição"], [
    ["analysis_text", "Texto de análise criado a partir de `body_clean`, título e contexto curto de pai/raiz."],
    ["text_for_ai_truncated", "Marca provável truncamento quando `text_for_ai` tem 5.900+ caracteres."],
    ["duplicate_text_cluster", "Cluster de duplicidade baseado em hash do `body_clean` normalizado."],
])}

## 5. Textos longos e truncamento

`text_for_ai` existe em todos os registros, mas não deve ser usado sozinho.

{md_table(["Métrica", "body_clean", "text_for_ai"], [
    ["Média de caracteres", avg(body_lengths), avg(tfa_lengths)],
    ["P95 de caracteres", pct(body_lengths, 0.95), pct(tfa_lengths, 0.95)],
    ["Máximo de caracteres", max(body_lengths) if body_lengths else 0, max(tfa_lengths) if tfa_lengths else 0],
])}

## 6. Dossiês e CSVs complementares

Arquivos CSV fora de `research/reddit_data/csvs/` foram inventariados apenas como contexto complementar. Eles não entram nas contagens primárias nem substituem evidência rastreável do Reddit.

{md_table(["Arquivo", "Linhas", "Colunas", "Status"], [[s["file"], s["rows"], s["columns"], s["status"]] for s in supplemental])}

## 7. Limitações

- A classificação é heurística e serve para triagem de discovery.
- Comentários do Reddit não são evidência clínica nem substituem avaliação profissional.
- Excertos devem ser curtos e usados apenas com `record_id`/URL para rastreabilidade.
- Autores públicos não são necessários para a análise e não foram promovidos nos outputs.
- NotebookLM pode ser usado como contexto por Rodrigo, mas estes outputs não dependem dele.

## Histórico de revisões

{md_table(["Data", "Versão", "Mudança", "Autor"], [[GENERATED_AT, "1.0", "Manifesto de corpus criado a partir dos 65 CSVs locais.", "Codex"]])}
"""
    (OUT / "00_corpus_manifest.md").write_text(manifest_md, encoding="utf-8")


def write_qualitative_map(pain_counts, pain_rows, sentiment_counts, emotion_counts, behavior_counts, solution_counts, failure_counts, feature_counts, examples_for_pain) -> None:
    qual_md = header_block(
        "Mapa Qualitativo de Dores Reddit - Planner TDAH",
        "Sintetiza dores, emoções, comportamentos, soluções tentadas, falhas e features desejadas a partir dos registros consolidados.",
        ["reddit_evidence_consolidated.csv", "reddit_qualitative_findings.csv", "foundation/posicionamento-etico.md"],
    )
    qual_md += f"""
## 1. Método

Cada registro foi analisado por regras textuais transparentes sobre `analysis_text`. O resultado separa evidência textual curta, inferência e nível de confiança. `indeterminado` significa que o registro não tem sinal suficiente para sustentar uma conclusão de discovery.

## 2. Dores principais

{md_table(["Dor ID", "Dor", "Registros", "Relevância média", "% do corpus"], pain_rows)}

## 3. Emoções e tom percebido

{md_table(["Categoria", "Registros"], sentiment_counts.most_common())}

{md_table(["Emoção", "Registros"], emotion_counts.most_common(12))}

## 4. Comportamentos recorrentes

{md_table(["Padrão de comportamento", "Registros"], behavior_counts.most_common(12))}

## 5. Soluções tentadas e falhas associadas

{md_table(["Solução tentada", "Registros"], solution_counts.most_common(12))}

{md_table(["Motivo de falha", "Registros"], failure_counts.most_common(12))}

## 6. Features desejadas ou inferidas

{md_table(["Feature ID", "Feature", "Registros"], [[fid, FEATURE_LABEL.get(fid, "Indeterminado"), count] for fid, count in feature_counts.most_common()])}

## 7. Evidências exemplares por dor
"""
    for pid, _count in pain_counts.most_common(8):
        if pid == "indeterminado":
            continue
        qual_md += f"\n### {PAIN_LABEL.get(pid, pid)}\n\n"
        qual_md += md_table(["record_id", "source_file_stem", "tipo", "evidência curta"], examples_for_pain(pid, 3)) + "\n"
    qual_md += f"""
## 8. Implicações para produto

- O planner deve reduzir manutenção e permitir retomada após falhas; esse é um tema transversal em abandono, rotina rígida e constância.
- A camada de personalização por arquétipo é útil quando traduz dor em regra concreta de uso, não quando adiciona volume de conteúdo.
- Features de baixo atrito, âncoras visuais, micro-ações, reset e revisão semanal têm melhor sustentação textual do que promessas amplas de produtividade.
- Copy deve falar de fricções observáveis, não de cura, tratamento, diagnóstico ou transformação garantida.

## Histórico de revisões

{md_table(["Data", "Versão", "Mudança", "Autor"], [[GENERATED_AT, "1.0", "Mapa qualitativo gerado a partir do consolidado Reddit.", "Codex"]])}
"""
    (OUT / "01_mapa_qualitativo_dores_reddit.md").write_text(qual_md, encoding="utf-8")


def write_archetype_matrix(record_count, arch_counts, conf_counts, pain_arch_counts, arch_feature_counts, examples_for_arch) -> None:
    arch_rows_table = [[arch, ARCHETYPE_NAMES.get(arch, arch), count, round(count / record_count * 100, 1) if record_count else 0] for arch, count in arch_counts.most_common()]
    arch_md = header_block(
        "Matriz Arquétipos x Dores x Features - Planner TDAH",
        "Classifica sinais textuais do Reddit contra os arquétipos existentes do quiz, com confiança e risco de ambiguidade.",
        ["reddit_archetype_classification.csv", "quiz/data/archetypes.js", "quiz/quiz-tdah-especificacao-completa.md"],
    )
    arch_md += f"""
## 1. Método e cautela

A classificação por arquétipo é heurística. Ela aproxima sinais textuais de fricção, comportamento e feature desejada aos arquétipos do quiz. Ela não diagnostica TDAH e não substitui revisão humana.

## 2. Distribuição geral

{md_table(["Arquétipo", "Nome", "Registros", "% do corpus"], arch_rows_table)}

## 3. Nível de confiança

{md_table(["Confiança", "Registros"], conf_counts.most_common())}

## 4. Matriz dor x arquétipo

{md_table(["Dor", "Arquétipo", "Registros"], [[PAIN_LABEL.get(p, p), ARCHETYPE_NAMES.get(a, a), c] for (p, a), c in pain_arch_counts.most_common(30)])}

## 5. Matriz arquétipo x feature sugerida

{md_table(["Arquétipo", "Feature", "Registros"], [[ARCHETYPE_NAMES.get(a, a), FEATURE_LABEL.get(f, f), c] for (a, f), c in arch_feature_counts.most_common(30)])}

## 6. Leituras por arquétipo
"""
    for arch in ["nomade", "reator", "vulcao", "arquiteto", "furacao", "camaleao", "manutencao", "indeterminado"]:
        count = arch_counts.get(arch, 0)
        if not count:
            continue
        arch_md += f"\n### {ARCHETYPE_NAMES.get(arch, arch)}\n\n"
        arch_md += f"Registros classificados: **{count}**. Ângulo ético de copy: {COPY_ANGLES.get(arch, COPY_ANGLES['indeterminado'])}.\n\n"
        arch_md += md_table(["record_id", "confiança", "dor central", "feature", "evidência curta"], examples_for_arch(arch, 3)) + "\n"
    arch_md += f"""
## 7. Recomendações de uso

- Usar classificações `alta` e `média` para priorização exploratória.
- Revisar manualmente registros `baixa` antes de transformar em copy ou regra de produto.
- Tratar `indeterminado` como lacuna ou contexto, não como validação negativa do arquétipo.
- Quando houver arquétipo secundário, priorizar feature transversal em vez de aumentar personalização textual.

## Histórico de revisões

{md_table(["Data", "Versão", "Mudança", "Autor"], [[GENERATED_AT, "1.0", "Matriz de arquétipos gerada sem alterar quiz ou produto.", "Codex"]])}
"""
    (OUT / "02_matriz_arquetipos_dores_features.md").write_text(arch_md, encoding="utf-8")


def write_strategic_matrices(pain_rows, pain_counts, pain_arch_counts, pain_feature_counts, solution_failure_counts, failure_counts, arch_counts) -> None:
    complaint_opp = []
    for pid, count in pain_counts.most_common(12):
        if pid == "indeterminado":
            continue
        feature_candidates = [(f, c) for (p, f), c in pain_feature_counts.items() if p == pid]
        feature_candidates.sort(key=lambda x: x[1], reverse=True)
        best_feature = feature_candidates[0][0] if feature_candidates else "indeterminado"
        complaint_opp.append([PAIN_LABEL.get(pid, pid), count, FEATURE_LABEL.get(best_feature, "Revisão humana"), "Priorizar se aparecer também em arquétipo com confiança média/alta"])

    strategic_md = header_block(
        "Matrizes Estratégicas - Pesquisa Planner TDAH",
        "Organiza achados em matrizes de decisão para planner, quiz, copy, onboarding e antiabandono.",
        ["reddit_qualitative_findings.csv", "reddit_archetype_classification.csv", "product/planner-structure.md"],
    )
    strategic_md += f"""
## 1. Dor x frequência x intensidade

Intensidade usa a relevância média do registro como proxy. Não mede gravidade clínica.

{md_table(["Dor", "Frequência", "Relevância média", "Prioridade discovery"], [[r[1], r[2], r[3], "Alta" if r[2] >= 100 or r[3] >= 60 else "Média" if r[2] >= 40 else "Baixa"] for r in pain_rows if r[0] != "indeterminado"])}

## 2. Dor x arquétipo

{md_table(["Dor", "Arquétipo", "Registros"], [[PAIN_LABEL.get(p, p), ARCHETYPE_NAMES.get(a, a), c] for (p, a), c in pain_arch_counts.most_common(25)])}

## 3. Dor x feature

{md_table(["Dor", "Feature", "Registros"], [[PAIN_LABEL.get(p, p), FEATURE_LABEL.get(f, f), c] for (p, f), c in pain_feature_counts.most_common(25)])}

## 4. Reclamação x oportunidade

{md_table(["Reclamação/dor", "Registros", "Oportunidade de produto", "Uso recomendado"], complaint_opp)}

## 5. Solução tentada x falha

{md_table(["Solução tentada", "Falha relatada/inferida", "Registros"], [[s, f, c] for (s, f), c in solution_failure_counts.most_common(25)])}

## 6. Arquétipo x copy angle ético

{md_table(["Arquétipo", "Registros", "Copy angle seguro", "Cuidado"], [[ARCHETYPE_NAMES.get(a, a), arch_counts.get(a, 0), COPY_ANGLES.get(a, COPY_ANGLES['indeterminado']), "Não prometer cura, foco garantido ou tratamento."] for a in ["nomade", "reator", "vulcao", "arquiteto", "furacao", "camaleao", "manutencao", "indeterminado"] if arch_counts.get(a, 0)])}

## 7. Onboarding x antiabandono

{md_table(["Risco", "Sinal no corpus", "Resposta recomendada"], [
    ["Abandono após perder dias", pain_counts.get("retomada_reset", 0), "Página de reset de 5 minutos e linguagem de retomada sem compensação."],
    ["Planner exige manutenção demais", failure_counts.get("manutencao_alta", 0), "Começar com versão mínima do ritual antes de templates completos."],
    ["Fora do campo visual", failure_counts.get("fora_do_campo_visual", 0), "Âncora visual no onboarding e instrução de posicionamento físico/digital."],
    ["Complexidade visual", failure_counts.get("complexo_demais", 0), "Templates com baixa densidade e regra de preenchimento opcional."],
    ["Novidade acaba", failure_counts.get("novidade_acaba", 0), "Checkpoint semanal curto e microvitórias não dependentes de streak."],
])}

## 8. Decisões estratégicas sugeridas

- Priorizar melhoria de onboarding e antiabandono antes de ampliar volume de páginas por arquétipo.
- Tratar personalização como ajuste de regra de uso, não como sete planners totalmente diferentes.
- Manter promessa comercial ancorada em organização adaptada ao padrão de atenção, com aviso claro de não diagnóstico.
- Usar o corpus para decidir hipóteses de v1.5, não para reescrever automaticamente o produto v1.

## Histórico de revisões

{md_table(["Data", "Versão", "Mudança", "Autor"], [[GENERATED_AT, "1.0", "Matrizes estratégicas geradas a partir dos outputs qualitativos.", "Codex"]])}
"""
    (OUT / "03_matrizes_estrategicas_planner_tdah.md").write_text(strategic_md, encoding="utf-8")


def write_quiz_validation(arch_counts, arch_rows) -> None:
    expected = ["nomade", "reator", "vulcao", "arquiteto", "furacao", "camaleao", "manutencao"]
    quiz_rows = []
    for arch in expected:
        count = arch_counts.get(arch, 0)
        confidence_high_mid = sum(1 for a in arch_rows if a["arquetipo_principal"] == arch and a["nivel_confianca"] in {"alta", "média"})
        if confidence_high_mid >= 25:
            status = "bem sustentado para discovery"
        elif confidence_high_mid > 0:
            status = "sinal presente, revisar amostras"
        elif count:
            status = "sinal fraco"
        else:
            status = "sem sinal direto nesta rodada"
        quiz_rows.append([ARCHETYPE_NAMES[arch], count, confidence_high_mid, status, FEATURE_LABEL.get(FEATURE_BY_ARCH[arch], "")])

    quiz_md = header_block(
        "Validação Quiz vs Pesquisa Reddit - Planner TDAH",
        "Compara os achados do corpus com os arquétipos e a estrutura modular já existentes, sem alterar código.",
        ["quiz/data/archetypes.js", "quiz/quiz-tdah-especificacao-completa.md", "product/planner-structure.md", "reddit_archetype_classification.csv"],
    )
    quiz_md += f"""
## 1. Escopo da validação

Esta validação é documental. Nenhum componente do quiz, landing, copy de produção ou planner foi modificado. O objetivo é verificar se os sinais do corpus sustentam, tensionam ou refinam as hipóteses de arquétipo e personalização leve da v1.

## 2. Arquétipos existentes x evidência de discovery

{md_table(["Arquétipo", "Registros totais", "Confiança média/alta", "Status", "Feature coerente"], quiz_rows)}

## 3. Pontos de aderência

- A estrutura modular do planner combina com os achados: BASE forte + regras curtas por arquétipo reduz risco de sobrecarga.
- A existência de uma variação de manutenção é coerente com registros que preferem sistemas simples e baixo atrito.
- Os arquétipos mais úteis são os que traduzem dor em regra operacional: âncora visual, pausa, check-in, micro-ação, limite de prioridades ou reset.

## 4. Pontos de tensão

- Registros `indeterminado` e de baixa confiança não devem ser forçados em arquétipos só para aumentar cobertura.
- Algumas dores aparecem transversais, especialmente manutenção, retomada e sobrecarga; tratá-las como BASE pode ser melhor do que criar variação excessiva.
- Copy do quiz deve evitar transformar arquétipo em identidade fixa ou diagnóstico implícito.

## 5. Recomendações sem alteração de código nesta fase

{md_table(["Área", "Recomendação", "Prioridade"], [
    ["Quiz", "Revisar perguntas futuras para captar retomada pós-falha e custo de manutenção sem termos clínicos.", "P1"],
    ["Landing", "Manter disclaimer de autoavaliação e reforçar que o planner é ferramenta de organização, não diagnóstico.", "P0"],
    ["Planner", "Garantir que cada variante tenha uma regra de uso concreta baseada em dor rastreável.", "P1"],
    ["Onboarding", "Inserir início mínimo de 15 minutos e reset sem culpa como mecanismo antiabandono.", "P1"],
    ["Copy", "Usar ângulos comportamentais seguros; revisar contra `foundation/posicionamento-etico.md` antes de produção.", "P0"],
])}

## Histórico de revisões

{md_table(["Data", "Versão", "Mudança", "Autor"], [[GENERATED_AT, "1.0", "Validação documental gerada contra quiz e planner existentes.", "Codex"]])}
"""
    (OUT / "04_validacao_quiz_vs_pesquisa.md").write_text(quiz_md, encoding="utf-8")


def write_final_report(csv_files, record_count, pain_counts, pain_feature_counts, arch_counts) -> None:
    expected = ["nomade", "reator", "vulcao", "arquiteto", "furacao", "camaleao", "manutencao"]
    pain_summary = []
    for pid, count in pain_counts.most_common(10):
        if pid == "indeterminado":
            continue
        candidates = [(f, c) for (p, f), c in pain_feature_counts.items() if p == pid]
        candidates.sort(key=lambda x: x[1], reverse=True)
        feature = FEATURE_LABEL.get(candidates[0][0], "Indeterminado") if candidates else "Indeterminado"
        pain_summary.append([PAIN_LABEL.get(pid, pid), count, feature])

    final_md = header_block(
        "Relatório Final de Product Discovery - Planner TDAH",
        "Consolida achados decisórios da fase de pesquisa Reddit e recomenda próximos passos para produto, quiz, copy, onboarding e antiabandono.",
        ["00_corpus_manifest.md", "01_mapa_qualitativo_dores_reddit.md", "02_matriz_arquetipos_dores_features.md", "03_matrizes_estrategicas_planner_tdah.md", "04_validacao_quiz_vs_pesquisa.md"],
    )
    final_md += f"""
## 1. Decisão executiva

A fase de pesquisa pode avançar para revisão humana e priorização de produto. O corpus local é suficiente para sustentar hipóteses de discovery sobre fricções com planners, desde que as conclusões sejam tratadas como sinais qualitativos rastreáveis, não como diagnóstico clínico nem como promessa comercial.

## 2. Evidência primária

{md_table(["Item", "Resultado"], [
    ["Corpus primário", f"{len(csv_files)} CSVs Reddit / {record_count} registros"],
    ["Base consolidada", "reddit_evidence_consolidated.csv"],
    ["Classificação qualitativa", "reddit_qualitative_findings.csv"],
    ["Classificação por arquétipo", "reddit_archetype_classification.csv"],
    ["Rastreabilidade", "source_file_stem + record_id + thread_url + comment_url"],
])}

## 3. Principais dores sustentadas

{md_table(["Dor", "Registros", "Feature mais associada"], pain_summary)}

## 4. Recomendações para o planner

{md_table(["Tema", "Recomendação", "Motivo"], [
    ["Antiabandono", "Adicionar reset de 5 minutos e instrução explícita de retomada sem culpa.", "Abandono, rotina rígida e retomada aparecem como risco transversal."],
    ["Baixo atrito", "Garantir versão mínima de todo ritual antes da versão completa.", "Soluções falham quando exigem manutenção alta."],
    ["Âncora visual", "Orientar onde deixar o planner e como trazer o plano de volta ao campo visual.", "Esquecimento/fora do campo visual é uma dor recorrente."],
    ["Micro-ações", "Converter metas e ideias em próximo passo físico pequeno.", "Iniciação, priorização e excesso de ideias aparecem como fricções centrais."],
    ["Personalização", "Manter variações curtas por arquétipo, com regra operacional e exemplo.", "Personalização profunda demais aumenta complexidade do MVP."],
])}

## 5. Recomendações para quiz e landing

{md_table(["Área", "Recomendação", "Cuidado ético"], [
    ["Quiz", "Captar padrões de funcionamento e custo de manutenção; não inferir diagnóstico.", "Não sugerir que resultado confirma TDAH."],
    ["Landing", "Explicar personalização como ajuste de uso do planner.", "Evitar promessa de foco garantido, cura ou tratamento."],
    ["Copy", "Usar dores observáveis: esquecimento, sobrecarga, retomada, micro-ações.", "Evitar vergonha, urgência manipulativa e medicalização."],
    ["Onboarding", "Comece em 15 minutos deve ser prioridade real, não bônus periférico.", "Não transformar onboarding em mais uma tarefa pesada."],
])}

## 6. Recomendações por arquétipo

{md_table(["Arquétipo", "Sinal no corpus", "Prioridade de produto"], [[ARCHETYPE_NAMES.get(a, a), arch_counts.get(a, 0), FEATURE_LABEL.get(FEATURE_BY_ARCH.get(a, "indeterminado"), "Revisão humana")] for a in expected])}

## 7. Lacunas e riscos

- Registros longos exigem cuidado com `text_for_ai`; usar `analysis_text` e retornar ao registro original quando uma decisão for crítica.
- Dossiês complementares podem ajudar Rodrigo a interpretar, mas não devem ser citados como evidência final sem normalização própria.
- Classificação heurística pode superatribuir arquétipo em registros ambíguos; usar `indeterminado` como proteção, não como falha.
- Evidência sensível deve ser resumida com cuidado e sem exposição de identidade.

## 8. Próximos passos recomendados

1. Rodrigo revisar manualmente os clusters de maior impacto: dor x feature e arquétipo x feature.
2. Selecionar 10-20 registros de alta confiança para embasar decisões editoriais da v1.5.
3. Validar copy angles contra `foundation/posicionamento-etico.md` antes de qualquer uso comercial.
4. Transformar recomendações aprovadas em tickets KAN separados para produto, quiz, onboarding e copy.

## Histórico de revisões

{md_table(["Data", "Versão", "Mudança", "Autor"], [[GENERATED_AT, "1.0", "Relatório final de discovery gerado a partir dos outputs rastreáveis.", "Codex"]])}
"""
    (OUT / "05_relatorio_final_product_discovery_planner_tdah.md").write_text(final_md, encoding="utf-8")


if __name__ == "__main__":
    main()
