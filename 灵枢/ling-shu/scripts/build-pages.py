#!/usr/bin/env python3
"""Build index.html from index.template.html and partials."""
from pathlib import Path
import re

INCLUDE_RE = re.compile(r"<!--\s*@include\s+(.+?)\s*-->")


def expand(path: Path) -> str:
    content = path.read_text(encoding="utf-8")

    def replacer(match: re.Match) -> str:
        include_path = (path.parent / match.group(1).strip()).resolve()
        if not include_path.exists():
            raise FileNotFoundError(f"Include not found: {include_path}")
        return expand(include_path)

    return INCLUDE_RE.sub(replacer, content)


def main() -> None:
    base = Path(__file__).resolve().parent.parent
    template_path = base / "index.template.html"
    output_path = base / "index.html"
    if not template_path.exists():
        raise SystemExit(f"Missing template: {template_path}")

    output = expand(template_path)
    if not output.endswith("\n"):
        output += "\n"
    output_path.write_text(output, encoding="utf-8")
    print(f"Generated {output_path} from {template_path}")


if __name__ == "__main__":
    main()
