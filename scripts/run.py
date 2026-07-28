#!/usr/bin/env python3
"""Start the Anatomy-of-a-File dev server and open it in a browser.

Usage:
    python scripts/run.py          # start dev server, open http://localhost:5173
    python scripts/run.py --build  # build for production and preview it instead

Requires Bun (https://bun.sh). Runs `bun install` on first launch if needed.
"""

from __future__ import annotations

import argparse
import shutil
import socket
import subprocess
import sys
import time
import urllib.request
import webbrowser
from pathlib import Path

APP_DIR = Path(__file__).resolve().parent.parent / "app"
PORT = 5173
URL = f"http://localhost:{PORT}"


def find_bun() -> str:
    bun = shutil.which("bun")
    if bun:
        return bun
    sys.exit(
        "Error: 'bun' was not found on your PATH.\n"
        "Install it from https://bun.sh and try again."
    )


def ensure_deps(bun: str) -> None:
    if not (APP_DIR / "node_modules").is_dir():
        print("Installing dependencies (first run)...")
        subprocess.run([bun, "install"], cwd=APP_DIR, check=True)


def port_is_open(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.5)
        return sock.connect_ex(("127.0.0.1", port)) == 0


def wait_for_server(timeout: float = 60.0) -> bool:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if port_is_open(PORT):
            try:
                urllib.request.urlopen(URL, timeout=1).read(1)
            except Exception:
                pass  # server up but still warming, good enough to open
            return True
        time.sleep(0.4)
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--build",
        action="store_true",
        help="build for production and serve the preview instead of dev mode",
    )
    args = parser.parse_args()

    bun = find_bun()
    ensure_deps(bun)

    if args.build:
        print("Building for production...")
        subprocess.run([bun, "run", "build"], cwd=APP_DIR, check=True)
        cmd = [bun, "run", "preview", "--", "--port", str(PORT)]
    else:
        cmd = [bun, "run", "dev"]

    print(f"Starting server ({'preview' if args.build else 'dev'})...")
    # Use shell=False; on Windows bun is a real exe so this works directly.
    server = subprocess.Popen(cmd, cwd=APP_DIR)

    try:
        if wait_for_server():
            print(f"Opening {URL}")
            webbrowser.open(URL)
        else:
            print(f"Server did not respond in time; open {URL} manually.")
        print("Server is running. Press Ctrl+C to stop.")
        server.wait()
    except KeyboardInterrupt:
        print("\nStopping server...")
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
