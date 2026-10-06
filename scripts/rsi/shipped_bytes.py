"""Bytes the app ships: committed size at HEAD of app/src (no tests), app/index.html and app/public. Prints shipped_bytes=<n>."""
import subprocess

EXTS = (".ts", ".vue", ".css", ".html", ".svg", ".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".ico",
        ".woff", ".woff2", ".json", ".webmanifest", ".xml", ".txt", ".md")
listing = subprocess.run(["git", "ls-tree", "-r", "-l", "-z", "HEAD"], capture_output=True, check=True).stdout
total = 0
for entry in listing.split(b"\0"):
    if not entry:
        continue
    meta, path = entry.decode("utf-8", "replace").split("\t", 1)
    size = meta.split()[3]
    if size == "-":
        continue
    low = path.lower()
    parts = path.split("/")
    if any(p.startswith(".") for p in parts):
        continue
    if not low.endswith(EXTS):
        continue
    in_src = low.startswith("app/src/") and not low.endswith((".test.ts", ".spec.ts"))
    in_public = low.startswith("app/public/")
    if in_src or in_public or low == "app/index.html":
        total += int(size)
print(f"shipped_bytes={total}")
