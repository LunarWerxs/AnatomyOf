import type { LanguageDef } from '../lib/types'

// A "concept" entry that still renders code rather than a mockup: the GitHub
// vocabulary (fork, clone, branch, commit, push, pull request, merge) is best
// explained by the commands that perform it, so the example is a shell session
// of plain `git` (local) and `gh` (GitHub's API over the wire).
export const github: LanguageDef = {
  id: 'github',
  name: 'GitHub',
  category: 'concept',
  titleWord: 'GitHub',
  titleNoun: 'contribution',
  article: 'a',
  extensions: ['.sh'],
  accentHex: '#8250df',
  officialUrl: 'https://docs.github.com/en/get-started/using-github/github-flow',
  shikiLang: 'bash',
  note: 'Git records the history and GitHub hosts it, adding forks, pull requests, and review on top. Every line below is either a plain `git` command working on your own machine or a `gh` command talking to GitHub over the network.',
  annotations: [
    {
      id: 'repository',
      title: 'Repository',
      body: 'The project plus its entire history, stored in a hidden `.git` folder.',
      details:
        'A repository ("repo") is one project\'s files together with every version of them there has ever been. The history lives in a hidden `.git` directory next to your files; delete that folder and you are left with an ordinary folder of files and no memory of how they got that way.\n\nA repo on GitHub is that same thing on a server, wrapped in a web page with issues, pull requests, releases, and permissions. GitHub is not a different kind of repository, it is a copy of yours that happens to have a URL, which is why every command below is either reading from or writing to one.',
      learnMore:
        'https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'fork',
      title: 'Fork',
      body: "Your own server-side copy of someone else's repository.",
      details:
        'Forking creates a full copy of a repository under your own account. You get write access to the copy without needing any permission on the original, which is the whole point: it is how open source accepts changes from strangers safely. The fork remembers where it came from, so GitHub can still offer to merge your work back.\n\nYou only need a fork when you cannot push to the original. If you are on the team, skip it and branch directly in the shared repo. Note that a fork is a GitHub concept, not a git one: git itself has no idea your repo is a copy of anything.',
      learnMore:
        'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'clone',
      title: 'Clone',
      body: 'Downloads a full local copy of a repository, history and all.',
      details:
        '`git clone <url>` copies an entire repository onto your machine: every file, every branch, every commit ever made. This is not a checkout of the latest version, it is the whole database, which is why git can show you a five-year-old diff with no network connection.\n\nCloning also wires up a remote named `origin` pointing back at the URL you cloned from, so later `git push` and `git pull` already know where to go. "Clone" is the local copy; "fork" is the server-side one. You usually make a fork and then clone the fork.',
      learnMore:
        'https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'remote',
      title: 'Remote (`origin`, `upstream`)',
      body: 'A nickname for a repository URL you exchange commits with.',
      details:
        "A remote is just a saved URL with a short name. By convention `origin` is the copy you push to (your fork, or the shared repo if you have access) and `upstream` is the original project you forked from. Nothing in git enforces those names; they are a convention so strong that tools assume it.\n\n`git remote -v` lists them. Because a clone only sets up `origin`, working on a fork means adding `upstream` yourself with `git remote add upstream <url>`, which is what makes it possible to pull in the original project's new commits later.",
      learnMore:
        'https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'sync',
      title: 'Sync (`fetch`, `pull`)',
      body: 'Bring down commits other people made since you last looked.',
      details:
        '`git fetch` downloads new commits from a remote and updates your record of where its branches are, without touching any file you are working on. `git pull` is `fetch` followed immediately by a merge into your current branch, so it changes your files. Fetch is the safe one to run at any time; pull is the one that can surprise you.\n\nOn a fork this is the "your branch is 47 commits behind" problem. The fix is `git fetch upstream` then merging `upstream/main` into your `main`. GitHub calls the one-click version of this **Sync fork** in the web UI, and `gh repo sync` on the command line.',
      learnMore: 'https://git-scm.com/docs/git-fetch',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'conflict',
      title: 'Merge conflict',
      body: 'Two people changed the same lines, so git stops and asks you.',
      details:
        'Git merges by comparing changes rather than files, and it resolves the overwhelming majority of them without help. A conflict happens only when two branches changed the same lines of the same file, because there is no rule that says whose version wins. Git marks the spot with `<<<<<<<`, `=======`, and `>>>>>>>` and stops.\n\nResolving one is manual and unglamorous: open the file, decide what the code should actually say, delete the markers, `git add` the file, and finish with `git merge --continue`. A conflict is not an error or a sign anyone did anything wrong. It is git refusing to guess.',
      learnMore:
        'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts',
      color: 'red',
      side: 'right',
    },
    {
      id: 'branch',
      title: 'Branch',
      body: 'A movable name for one line of work, so `main` stays shippable.',
      details:
        'A branch is a lightweight, movable pointer to a commit. Creating one is instant and costs essentially nothing, because git is not copying files, it is writing down a name. `git switch -c fix/readme-typo` makes a new branch from where you are and moves you onto it.\n\nThe convention is that `main` always works and every change happens on its own short-lived branch, which is then reviewed and merged. GitHub has defaulted new repositories to `main` rather than `master` since October 2020. `git switch` and `git restore` are the modern split of the old, overloaded `git checkout`.',
      learnMore:
        'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches',
      color: 'green',
      side: 'left',
    },
    {
      id: 'stage',
      title: 'Stage (`git add`)',
      body: 'Pick exactly which changes go into the next commit.',
      details:
        '`git add` moves changes into the staging area (also called the index), a holding pen between your working files and the history. Nothing is committed until you stage it, which is what lets you turn one messy afternoon of edits into three clean, separately reviewable commits.\n\nThis extra step is the part of git that most confuses newcomers and the part experienced users would fight hardest to keep. `git status` shows what is staged, unstaged, and untracked; `git add -p` walks you through a file hunk by hunk so you can stage half of it.',
      learnMore: 'https://git-scm.com/docs/git-add',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'commit',
      title: 'Commit',
      body: 'A permanent snapshot of the staged changes, plus a message.',
      details:
        'A commit records the complete state of the project at one moment, who made it, when, which commit came before it, and why. That last part is the message, and it is the only piece git cannot generate for you. It gets a unique hash like `a3f9c21`, which is how every other command refers to it.\n\nCommits are the unit of history: they are what you revert, cherry-pick, bisect through, and blame. A good message explains the *why* in the first line and leaves the *what* to the diff, which is already right there. `git commit -m "fix"` is a message you are writing to yourself, at 2am, six months from now.',
      learnMore: 'https://github.com/git-guides/git-commit',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'push',
      title: 'Push',
      body: 'Upload your commits to a remote so other people can see them.',
      details:
        "Until you push, every commit you have made exists only on your laptop. `git push -u origin <branch>` sends the branch to the remote and, thanks to `-u`, remembers the pairing so plain `git push` works from then on.\n\nPushing never destroys someone else's work, because git rejects a push that would drop commits you do not have. `--force` overrides that check and is how history gets deleted for everyone. `--force-with-lease` is the version that first confirms nobody else pushed while you were not looking, and is what you almost always actually want.",
      learnMore: 'https://github.com/git-guides/git-push',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'pull-request',
      title: 'Pull request (merge request)',
      body: 'A formal ask: "please merge my branch into yours."',
      details:
        'A pull request wraps a branch in a conversation. It shows the diff, runs the checks, collects review comments, and provides the button that merges it. The name comes from the original workflow of emailing a maintainer to ask them to *pull* from your repo; GitHub turned that email into a page.\n\nGitLab calls the identical concept a **merge request**, and Bitbucket calls it a pull request too. The difference is branding, not behavior. A pull request is not part of git: close every PR and your commits are untouched, because a PR is a proposal *about* branches that lives entirely on the host.',
      learnMore:
        'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
      color: 'rose',
      side: 'left',
    },
    {
      id: 'checks',
      title: 'Checks (CI on the PR)',
      body: 'Automated builds and tests that run against your branch.',
      details:
        'Every push to a pull request can kick off a CI pipeline that builds the project, runs the tests, and reports back as a green tick or a red cross on the PR itself. That report is the "check". See the CI pipeline page for what is actually inside one of those runs.\n\nRepository rules can make specific checks **required**, which disables the merge button until they pass. GitHub calls those rules **rulesets** now (the older per-branch version is still there as branch protection rules), and a **merge queue** can re-run them on the merged result so `main` never breaks from two PRs that were each green alone.',
      learnMore:
        'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'review',
      title: 'Review',
      body: 'A human reads the diff and approves, comments, or requests changes.',
      details:
        'A review is a bundle of comments plus one of three verdicts: approve, comment, or request changes. Comments can be anchored to individual lines of the diff, and "request changes" blocks the merge until the reviewer clears it, so it is a genuine gate rather than an opinion.\n\nReview is the reason pull requests exist. It is also where "LGTM" (looks good to me) comes from, and where the well-known asymmetry lives: a one-line change gets nine comments about naming, while a two-thousand-line refactor gets approved in forty seconds.',
      learnMore:
        'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'merge',
      title: 'Merge',
      body: 'Combine the branch into the target. Three strategies, one result.',
      details:
        'A **merge commit** keeps every commit on the branch and adds one more that joins the two histories, preserving exactly what happened. **Squash** flattens the whole branch into a single new commit on the target, so `main` reads as one tidy change per pull request. **Rebase** replays each commit onto the tip of the target, giving a straight line with no merge commit at all.\n\nGitHub offers all three and starts you on the merge commit; plenty of projects switch to squash because it makes `main` readable and makes reverting a whole feature a one-command job. Whichever you pick, deleting the branch afterwards is safe: the commits now live in the target branch, and the branch name was only ever a pointer.',
      learnMore:
        'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github',
      color: 'green',
      side: 'right',
    },
  ],
  // Two templates, because the vocabulary splits cleanly in two: `topology`
  // answers "where does this live" (fork vs clone is the question everyone
  // actually has), and `graph` answers "in what order", which is the only way
  // to show a branch diverging and a conflict happening on the same line.
  visual: {
    panels: [
      {
        template: 'topology',
        caption: 'Where the copies live',
        zones: [
          {
            id: 'server',
            label: 'github.com',
            nodes: [
              {
                id: 'upstream',
                ref: 'repository',
                title: 'octocat/hello-world',
                sub: 'the original, you cannot push here',
              },
              {
                id: 'fork',
                ref: 'fork',
                title: 'you/hello-world',
                sub: 'your copy, you own it',
              },
            ],
          },
          {
            id: 'local',
            label: 'your laptop',
            nodes: [
              {
                id: 'clone',
                ref: 'clone',
                title: '~/code/hello-world',
                sub: 'every commit, offline',
                rows: [{ label: '.git/' }, { label: 'README.md' }],
              },
            ],
          },
        ],
        edges: [
          { from: 'upstream', to: 'fork', ref: 'fork', label: 'gh repo fork', bow: -62 },
          { from: 'fork', to: 'upstream', ref: 'pull-request', label: 'gh pr create', bow: 62 },
          { from: 'upstream', to: 'clone', ref: 'sync', label: 'git fetch upstream', bow: -14 },
          { from: 'fork', to: 'clone', ref: 'clone', label: 'git clone', bow: 20 },
          { from: 'clone', to: 'fork', ref: 'push', label: 'git push', bow: -20 },
        ],
      },
      {
        template: 'graph',
        caption: 'What happens, in order',
        lanes: [
          { id: 'main', label: 'main' },
          { id: 'feature', label: 'fix/readme-typo' },
        ],
        nodes: [
          { id: 'm1', ref: 'commit', lane: 'main', col: 0 },
          { id: 'm2', ref: 'commit', lane: 'main', col: 1 },
          {
            id: 'theirs',
            ref: 'conflict',
            lane: 'main',
            col: 3,
            kind: 'conflict',
            above: 'someone edited the same line',
          },
          { id: 'f1', ref: 'commit', lane: 'feature', col: 2, label: 'a3f9c21' },
          { id: 'f2', ref: 'commit', lane: 'feature', col: 3, label: '7b1e4d0' },
          {
            id: 'merged',
            ref: 'merge',
            lane: 'main',
            col: 4.4,
            kind: 'merge',
            above: '1 commit on main',
          },
        ],
        links: [
          { from: 'm2', to: 'f1', ref: 'branch', label: 'switch -c' },
          { from: 'f1', to: 'f2', ref: 'commit' },
          { from: 'f2', to: 'merged', ref: 'merge', label: 'squash merge', arrow: true },
        ],
      },
    ],
  },
  examples: {
    minimal: [
      { code: '# The everyday loop, in a repo you can already push to.', refs: ['repository'] },
      { code: '' },
      { code: 'git clone https://github.com/octocat/hello-world.git', refs: ['clone'] },
      { code: 'cd hello-world', refs: ['clone'] },
      { code: '' },
      { code: '# A branch is just a name. Making one is instant.', refs: ['branch'] },
      { code: 'git switch -c fix/readme-typo', refs: ['branch'] },
      { code: '' },
      { code: '# ... edit README.md ...', refs: ['stage'] },
      { code: 'git add README.md', refs: ['stage'] },
      {
        code: 'git commit -m "Fix the typo everyone was too polite to mention"',
        refs: ['commit'],
      },
      { code: '' },
      { code: '# Until now, all of this existed only on your laptop.', refs: ['push'] },
      { code: 'git push -u origin fix/readme-typo', refs: ['push'] },
      { code: '' },
      { code: 'gh pr create --fill', refs: ['pull-request'] },
    ],
    verbose: [
      { code: '#!/usr/bin/env bash', refs: ['repository'] },
      {
        code: '# Contributing to a project you do NOT have write access to.\n# `git` talks to your disk. `gh` talks to GitHub.',
        refs: ['repository'],
      },
      { code: '' },
      { code: '# 1. Fork: your own copy of their repo, on their servers.', refs: ['fork'] },
      { code: 'gh repo fork octocat/hello-world --clone', refs: ['fork', 'clone'] },
      { code: 'cd hello-world', refs: ['clone'] },
      { code: '' },
      {
        code: '# 2. Remotes are nicknames for URLs. gh set both of these up:\n#      origin   -> your fork      (you can push here)\n#      upstream -> the original   (you cannot)',
        refs: ['remote'],
      },
      { code: 'git remote -v', refs: ['remote'] },
      { code: '' },
      { code: '# 3. Sync: fetch downloads, merge applies. Fetch is always safe.', refs: ['sync'] },
      { code: 'git fetch upstream', refs: ['sync'] },
      { code: 'git switch main', refs: ['sync', 'branch'] },
      { code: 'git merge upstream/main', refs: ['sync', 'merge'] },
      { code: '' },
      {
        code: '# If you both edited the same lines, git stops rather than guess.\n# Edit the file, remove the <<<<<<< markers, then:',
        refs: ['conflict'],
      },
      { code: 'git add README.md && git merge --continue', refs: ['conflict', 'stage'] },
      { code: '' },
      {
        code: '# 4. Branch: one short-lived name per change, so main stays shippable.',
        refs: ['branch'],
      },
      { code: 'git switch -c fix/readme-typo', refs: ['branch'] },
      { code: '' },
      {
        code: '# 5. Stage, then commit. Staging is what lets one messy afternoon\n#    become three clean, separately reviewable commits.',
        refs: ['stage'],
      },
      { code: 'git add -p README.md', refs: ['stage'] },
      { code: 'git status', refs: ['stage'] },
      {
        code: 'git commit -m "Fix the typo everyone was too polite to mention"',
        refs: ['commit'],
      },
      { code: '' },
      {
        code: '# 6. Push. --force-with-lease, because --force has ended friendships.',
        refs: ['push'],
      },
      { code: 'git push -u origin fix/readme-typo', refs: ['push'] },
      { code: '' },
      {
        code: '# 7. Pull request: ask them to merge your branch into theirs.\n#    GitLab calls this exact thing a "merge request".',
        refs: ['pull-request'],
      },
      {
        code: 'gh pr create \\\n  --repo octocat/hello-world \\\n  --base main \\\n  --title "Fix README typo" \\\n  --body "One character. Deeply satisfying."',
        refs: ['pull-request'],
      },
      { code: '' },
      { code: '# 8. Checks: CI builds and tests the branch and reports back.', refs: ['checks'] },
      { code: 'gh pr checks --watch', refs: ['checks'] },
      { code: '' },
      {
        code: '# 9. Review: nine comments on one line, or "LGTM" on two thousand.',
        refs: ['review'],
      },
      { code: 'gh pr review 42 --approve --body "LGTM"', refs: ['review'] },
      { code: '' },
      {
        code: '# 10. Merge. --squash flattens the branch to one commit on main.',
        refs: ['merge'],
      },
      { code: 'gh pr merge 42 --squash --delete-branch', refs: ['merge', 'branch'] },
    ],
  },
}
