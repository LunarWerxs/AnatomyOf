"""Regression test: scripts/run.py reinstalls when the lockfile changed.

Run with: python -m unittest scripts/test_run_deps.py
"""

from __future__ import annotations

import hashlib
import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest import mock

RUN_PATH = Path(__file__).resolve().parent / "run.py"
spec = importlib.util.spec_from_file_location("run", RUN_PATH)
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)


class EnsureDepsTest(unittest.TestCase):
    def test_reinstalls_when_lockfile_changed_since_last_install(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            app = Path(tmp)
            (app / "bun.lock").write_text("new lockfile")
            node_modules = app / "node_modules"
            node_modules.mkdir()
            # node_modules exists, but was installed from an older lockfile.
            (node_modules / ".lock-sha256").write_text(hashlib.sha256(b"old lockfile").hexdigest())

            with mock.patch.object(run, "APP_DIR", app), mock.patch.object(run.subprocess, "run") as sub_run:
                run.ensure_deps("bun")

            sub_run.assert_called_once()
            self.assertEqual(sub_run.call_args.args[0], ["bun", "install"])


if __name__ == "__main__":
    unittest.main()
