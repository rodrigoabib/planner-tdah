from pathlib import Path
from datetime import datetime
import re
import argparse


def natural_sort_key(path: Path):
    """
    Ordena arquivos de forma natural.
    Exemplo:
    01-arquivo.md vem antes de 10-arquivo.md.
    """
    text = str(path).lower()
    return [
        int(part) if part.isdigit() else part
        for part in re.split(r"(\d+)", text)
    ]


def read_markdown_file(file_path: Path) -> str:
    """
    Lê um arquivo markdown com fallback simples de encoding.
    """
    try:
        return file_path.read_text(encoding="utf-8").strip()
    except UnicodeDecodeError:
        return file_path.read_text(encoding="latin-1").strip()


def get_markdown_files(folder: Path, recursive: bool = True, skip_readme: bool = False):
    """
    Retorna arquivos .md dentro de uma pasta.
    """
    pattern = "**/*.md" if recursive else "*.md"

    files = list(folder.glob(pattern))

    if skip_readme:
        files = [
            file for file in files
            if file.name.lower() != "readme.md"
        ]

    return sorted(files, key=natural_sort_key)


def build_file_section(file_path: Path, root_path: Path, heading_level: int = 2) -> str:
    """
    Cria uma seção identificável para cada arquivo markdown.
    """
    relative_path = file_path.relative_to(root_path)
    content = read_markdown_file(file_path)

    heading = "#" * heading_level

    return f"""
{heading} Arquivo: `{relative_path.as_posix()}`

<!-- INÍCIO DO ARQUIVO: {relative_path.as_posix()} -->

{content}

<!-- FIM DO ARQUIVO: {relative_path.as_posix()} -->
""".strip()


def consolidate_base(base_dir: Path, output_file: Path, skip_readme: bool = False):
    """
    Consolida todos os arquivos markdown da pasta base em um único arquivo.
    """
    if not base_dir.exists():
        raise FileNotFoundError(f"Pasta base não encontrada: {base_dir}")

    markdown_files = get_markdown_files(
        folder=base_dir,
        recursive=True,
        skip_readme=skip_readme
    )

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    sections = [
        "# Consolidado - BASE",
        "",
        f"> Arquivo gerado automaticamente em: `{generated_at}`",
        f"> Origem: `{base_dir.as_posix()}`",
        "",
        "---",
        "",
        "## Índice de arquivos",
        "",
    ]

    for file in markdown_files:
        relative_path = file.relative_to(base_dir.parent)
        sections.append(f"- `{relative_path.as_posix()}`")

    sections.append("")
    sections.append("---")
    sections.append("")

    for file in markdown_files:
        sections.append(
            build_file_section(
                file_path=file,
                root_path=base_dir.parent,
                heading_level=2
            )
        )
        sections.append("\n---\n")

    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text("\n".join(sections).strip() + "\n", encoding="utf-8")

    return output_file


def consolidate_variants(variants_dir: Path, output_file: Path, skip_readme: bool = True):
    """
    Consolida todos os arquivos markdown das subpastas dentro de variants.

    Cada subpasta vira uma seção principal no arquivo final.
    Exemplo:
    variants/
      arquiteto-do-caos/
      nomade-quantico/
      furacao/
    """
    if not variants_dir.exists():
        raise FileNotFoundError(f"Pasta variants não encontrada: {variants_dir}")

    variant_folders = sorted(
        [
            folder for folder in variants_dir.iterdir()
            if folder.is_dir()
        ],
        key=natural_sort_key
    )

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    sections = [
        "# Consolidado - VARIANTS",
        "",
        f"> Arquivo gerado automaticamente em: `{generated_at}`",
        f"> Origem: `{variants_dir.as_posix()}`",
        "",
        "---",
        "",
        "## Índice de variantes",
        "",
    ]

    for variant_folder in variant_folders:
        markdown_files = get_markdown_files(
            folder=variant_folder,
            recursive=True,
            skip_readme=skip_readme
        )

        sections.append(f"- `{variant_folder.name}`")

        for file in markdown_files:
            relative_path = file.relative_to(variants_dir.parent)
            sections.append(f"  - `{relative_path.as_posix()}`")

    sections.append("")
    sections.append("---")
    sections.append("")

    for variant_folder in variant_folders:
        markdown_files = get_markdown_files(
            folder=variant_folder,
            recursive=True,
            skip_readme=skip_readme
        )

        sections.append(f"# Variante: `{variant_folder.name}`")
        sections.append("")
        sections.append(f"> Pasta de origem: `{variant_folder.relative_to(variants_dir.parent).as_posix()}`")
        sections.append("")
        sections.append("---")
        sections.append("")

        if not markdown_files:
            sections.append("> Nenhum arquivo markdown encontrado nesta variante.")
            sections.append("")
            sections.append("---")
            sections.append("")
            continue

        for file in markdown_files:
            sections.append(
                build_file_section(
                    file_path=file,
                    root_path=variants_dir.parent,
                    heading_level=2
                )
            )
            sections.append("\n---\n")

    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text("\n".join(sections).strip() + "\n", encoding="utf-8")

    return output_file


def main():
    parser = argparse.ArgumentParser(
        description="Consolida arquivos markdown das pastas base e variants."
    )

    parser.add_argument(
        "--content-dir",
        default="product/content",
        help="Caminho da pasta content. Exemplo: product/content"
    )

    parser.add_argument(
        "--output-dir",
        default="product/content/_consolidated",
        help="Pasta onde os arquivos consolidados serão gerados."
    )

    parser.add_argument(
        "--include-readme",
        action="store_true",
        help="Inclui arquivos README.md nos consolidados."
    )

    args = parser.parse_args()

    content_dir = Path(args.content_dir)
    output_dir = Path(args.output_dir)

    base_dir = content_dir / "base"
    variants_dir = content_dir / "variants"

    skip_readme = not args.include_readme

    base_output = output_dir / "base-consolidado.md"
    variants_output = output_dir / "variants-consolidado.md"

    consolidate_base(
        base_dir=base_dir,
        output_file=base_output,
        skip_readme=skip_readme
    )

    consolidate_variants(
        variants_dir=variants_dir,
        output_file=variants_output,
        skip_readme=skip_readme
    )

    print("Consolidação concluída com sucesso!")
    print(f"BASE: {base_output.resolve()}")
    print(f"VARIANTS: {variants_output.resolve()}")


if __name__ == "__main__":
    main()