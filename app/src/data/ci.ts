import type { LanguageDef } from '../lib/types'

// A "concept" entry that renders code rather than a mockup: a CI pipeline IS a
// file, so the clearest way to dissect one is to annotate a real GitHub Actions
// workflow. GitLab CI, CircleCI, and Jenkins rename the keys but keep the shape.
export const ci: LanguageDef = {
  id: 'ci',
  name: 'CI Pipeline',
  category: 'concept',
  titleWord: 'CI',
  titleNoun: 'pipeline',
  article: 'a',
  extensions: ['.yml', '.yaml'],
  accentHex: '#2088ff',
  officialUrl:
    'https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions',
  shikiLang: 'yaml',
  note: 'CI (continuous integration) means a server builds and tests every change automatically, so a broken commit is caught in minutes instead of on release day. This is a GitHub Actions workflow; GitLab CI, CircleCI, and Jenkins use different key names for the same handful of ideas.',
  annotations: [
    {
      id: 'workflow-name',
      title: 'Workflow name',
      body: "The label shown in the Actions tab and on every commit's status.",
      details:
        "`name:` is the human-facing title of the whole pipeline. It appears in the repository's Actions tab, in the checks list on a pull request, and in the emails you get when a run fails. If you omit it, GitHub falls back to the file path, which is legal and unhelpful.\n\nA separate `run-name:` key can title each individual *run*, and it accepts expressions, so a workflow can label runs with the branch or the person who triggered them. The file itself must live in `.github/workflows/` in the default branch to be picked up at all.",
      learnMore:
        'https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#name',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'trigger',
      title: 'Trigger (`on:`)',
      body: 'The events that start a run: pushes, pull requests, a clock, a button.',
      details:
        '`on:` answers "when does this run?". `push` and `pull_request` are the everyday pair, each optionally narrowed by `branches:`, `tags:`, or `paths:` filters so that a docs-only change does not spend ten minutes compiling. `schedule:` takes cron expressions and runs on GitHub\'s clock in UTC. `workflow_dispatch:` adds a **Run workflow** button in the UI and can declare typed `inputs:`.\n\nOne trap is worth knowing early: `pull_request` runs the workflow *as defined in the pull request* but denies it secrets and write access, precisely because the code came from a stranger. `pull_request_target` grants those, running the base branch\'s definition instead, and misusing it is the classic Actions security hole.',
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'permissions',
      title: 'Permissions',
      body: 'How much the automatic `GITHUB_TOKEN` is allowed to touch.',
      details:
        'Every run is handed a short-lived `GITHUB_TOKEN` that expires when the job ends. `permissions:` decides what that token can do, scope by scope (`contents`, `packages`, `issues`, `pull-requests`, `id-token`, and so on). Declaring `contents: read` at the top of the file is the least-privilege default: anything not listed is set to `none`.\n\nThis matters because a workflow runs third-party code from the internet by design. A compromised or merely careless action inherits whatever the token can do, so a pipeline that only needs to read the repo should not be holding a token that can push to it or publish a release.',
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'concurrency',
      title: 'Concurrency',
      body: 'Limits runs to one per group, optionally cancelling the older ones.',
      details:
        'Without this, pushing five commits in a minute starts five full pipelines that all race to tell you about the same code. `concurrency:` puts runs into a named `group:` where only one may be in progress, and `cancel-in-progress: true` kills the older run the moment a newer one arrives.\n\nThe usual group expression combines the workflow and the branch, so different branches still build in parallel while a single branch only ever has one live run. The one place to be careful is deployment: cancelling a half-finished deploy is worse than queueing it, so production jobs normally set `cancel-in-progress: false`.',
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#concurrency',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'job',
      title: 'Job',
      body: 'A named unit of work. Jobs run in parallel on separate machines.',
      details:
        'Everything under `jobs:` is a job, and by default they all start at once on independent, freshly created machines. That isolation is the reason a pipeline is fast, and also the reason nothing carries over: two jobs share no disk, no installed packages, and no environment. Anything one job produces for another has to travel as an artifact or a job `outputs:` value.\n\nA job is also the unit of retry. When you click "Re-run failed jobs" after a flaky test, this is what gets re-run. `timeout-minutes:` caps how long one may hang before GitHub stops paying for it, which defaults to 360.',
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobs',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'runner',
      title: 'Runner (`runs-on:`)',
      body: 'Which machine executes the job.',
      details:
        '`runs-on:` picks the hardware and operating system. GitHub-hosted labels like `ubuntu-latest`, `windows-latest`, and `macos-latest` give you a clean virtual machine that is created for this job and destroyed afterwards, preloaded with common toolchains. The `-latest` labels move: `ubuntu-latest` currently means Ubuntu 24.04, and GitHub migrates the label to newer images on a published schedule, so pinning an explicit `ubuntu-24.04` is the way to avoid being surprised by that.\n\nThe alternative is a self-hosted runner, your own machine registered with the repo, used when a job needs particular hardware, a private network, or more RAM than the hosted tiers offer.',
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idruns-on',
      color: 'green',
      side: 'right',
    },
    {
      id: 'matrix',
      title: 'Matrix strategy',
      body: 'Runs one job many times over a set of values.',
      details:
        "A `strategy: matrix:` expands a single job definition into one run per combination of the values you list. Three Node versions becomes three parallel jobs; three versions across two operating systems becomes six. Inside the job, `${{ matrix.node }}` holds that run's value, which is also how you give each one a distinct name.\n\n`fail-fast: true` is the default and cancels every sibling the moment one fails, which is right when you just want a red light quickly. Setting it to `false` lets them all finish, which is what you want when the interesting question is *which* combinations broke. `max-parallel:` throttles how many run at once.",
      learnMore:
        'https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'needs',
      title: 'Dependency (`needs:`)',
      body: 'Makes one job wait for another, turning the pipeline into stages.',
      details:
        "`needs: test` holds a job back until the named job has finished successfully. That single key is what turns a flat pile of parallel jobs into the classic build, test, deploy shape, and it accepts a list, so a job can wait on several at once. If one of the jobs it needs fails or is skipped, the dependent job is skipped too.\n\nBecause a matrix expands into many runs of the same job, depending on it waits for *all* of them. A dependent job can also read the earlier job's declared `outputs:` through the `needs` context, which is the supported way to pass a value (a version number, an image tag) from one machine to the next.",
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'step',
      title: 'Step',
      body: 'One ordered task inside a job. Steps share the same machine.',
      details:
        "A job's `steps:` run one after another on the same runner, so unlike jobs they *do* share a working directory and any environment changes made along the way. Each step can carry a `name:` for the log, an `id:` so later steps can read its outputs, and its own `env:`, `if:`, `working-directory:`, or `continue-on-error:`.\n\nThe first step of almost every workflow is a checkout, because the runner starts empty: it has your repository's *name*, not its files. A step that fails stops the job at that point, which is why ordering matters and why the cheapest checks are usually put first.",
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idsteps',
      color: 'rose',
      side: 'left',
    },
    {
      id: 'action',
      title: 'Action (`uses:`)',
      body: 'Pulls in a reusable, packaged step from another repository.',
      details:
        "`uses: actions/checkout@v7` runs someone else's published step. The part before `@` is a repository, and the part after is a git ref: a tag, a branch, or a full commit SHA. `with:` passes that action its inputs, which are declared in the action's own `action.yml`.\n\nThis is the reuse mechanism that makes workflows short, and it is also the supply chain. `@v7` is a moving tag the author can repoint at any time, so security-sensitive pipelines pin the full commit SHA instead and let a bot propose the bumps. A handful of first-party actions (`checkout`, `setup-*`, `cache`, `upload-artifact`) cover most of what a normal project needs.",
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'run',
      title: 'Shell command (`run:`)',
      body: 'Executes commands directly on the runner, exactly as you would locally.',
      details:
        "`run:` is the escape hatch and the workhorse. It hands a string to the runner's shell (bash on Linux and macOS, PowerShell on Windows, overridable per step with `shell:`). A block scalar written with `|` lets one step hold several lines of script.\n\nThe rule that governs everything is the exit code: zero passes, anything else fails the step and therefore the job. That is why `npm test` needs no special integration to work here. Bash steps run with `set -eo pipefail` by default, so a failure partway through a multi-line script stops it rather than sailing on to report success.",
      learnMore:
        'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsrun',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'secret',
      title: 'Secrets and variables',
      body: '`${{ secrets.X }}` injects a stored credential without printing it.',
      details:
        'Secrets are encrypted values stored on the repository, environment, or organization, and read back through the `secrets` context. Their values are masked in the logs, so an accidental `echo` prints `***` rather than your deploy key. The `vars` context is the same mechanism for values that are merely configuration and not sensitive, and `env:` sets plain environment variables at the workflow, job, or step level.\n\nScope them as tightly as they will go. Attaching a secret to an `environment:` means only jobs targeting that environment can read it, and an environment can additionally demand a human approval before the job starts, which is the standard guard on a production deploy.',
      learnMore:
        'https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets',
      color: 'red',
      side: 'right',
    },
    {
      id: 'condition',
      title: 'Condition (`if:`)',
      body: 'Runs a step or job only when an expression is true.',
      details:
        "`if:` takes an expression and skips the step or job when it evaluates false. Inside an `if:` the surrounding `${{ }}` is optional, which is why you see both forms in the wild. Common uses are branch guards (`github.ref == 'refs/heads/main'`) and event guards (`github.event_name == 'push'`).\n\nThe status functions matter here. By default every step carries an implicit `success()`, meaning a step is skipped once something earlier has failed. `if: always()` runs the step regardless, which is how test reports and artifacts still get uploaded from a failing build, and `if: failure()` runs one only when something broke.",
      learnMore: 'https://docs.github.com/en/actions/reference/workflows-and-actions/expressions',
      color: 'slate',
      side: 'right',
    },
  ],
  // `topology` maps one-to-one onto the YAML keys annotated in the code
  // variants, so the Visual tab teaches the same lesson in a second language.
  // `timeline` then shows the one thing the YAML cannot: that a matrix is three
  // machines at once, and that `needs:` is what makes deploy wait.
  visual: {
    panels: [
      {
        template: 'topology',
        caption: 'What the file sets up',
        zones: [
          {
            id: 'events',
            label: 'events',
            nodes: [
              { id: 'push', ref: 'trigger', title: 'push', pill: true },
              { id: 'pr', ref: 'trigger', title: 'pull_request', pill: true },
              { id: 'cron', ref: 'trigger', title: 'schedule', pill: true },
              { id: 'manual', ref: 'trigger', title: 'workflow_dispatch', pill: true },
            ],
          },
          {
            id: 'workflow',
            label: '.github/workflows/ci.yml',
            nodes: [
              {
                id: 'test',
                ref: 'job',
                title: 'test',
                sub: 'runs-on: ubuntu-latest',
                rows: [
                  { label: 'node 20', ref: 'matrix', ok: true },
                  { label: 'node 22', ref: 'matrix', ok: true },
                  { label: 'node 24', ref: 'matrix', ok: true },
                ],
              },
              {
                id: 'deploy',
                ref: 'job',
                title: 'deploy',
                sub: 'environment: production',
                rows: [
                  { label: "if: ref == 'refs/heads/main'", ref: 'condition' },
                  { label: 'secrets.DEPLOY_TOKEN', ref: 'secret' },
                ],
              },
            ],
          },
        ],
        edges: [
          { from: 'pr', to: 'test', ref: 'trigger' },
          { from: 'test', to: 'deploy', ref: 'needs', label: 'needs: test', bow: 0, dashed: true },
        ],
      },
      {
        template: 'timeline',
        caption: 'One run, on the clock',
        max: 90,
        unit: 's',
        bars: [
          { id: 'n20', ref: 'matrix', label: 'test (node 20)', start: 0, end: 42 },
          { id: 'n22', ref: 'matrix', label: 'test (node 22)', start: 0, end: 45 },
          { id: 'n24', ref: 'matrix', label: 'test (node 24)', start: 0, end: 39 },
          { id: 'dep', ref: 'job', label: 'deploy', start: 47, end: 78, note: 'gated on main' },
        ],
        markers: [{ at: 45, ref: 'needs', label: 'needs: test' }],
      },
    ],
  },
  examples: {
    minimal: [
      { code: '# .github/workflows/ci.yml', refs: ['workflow-name'] },
      { code: 'name: CI', refs: ['workflow-name'] },
      { code: '' },
      { code: 'on:\n  push:\n    branches: [main]', refs: ['trigger'] },
      { code: '' },
      { code: 'jobs:', refs: ['job'] },
      { code: '  test:', refs: ['job'] },
      { code: '    runs-on: ubuntu-latest', refs: ['runner'] },
      { code: '    steps:', refs: ['step'] },
      { code: '      - uses: actions/checkout@v7', refs: ['step', 'action'] },
      { code: '      - run: npm ci', refs: ['step', 'run'] },
      {
        code: '      - run: npm test # exit code 0 passes, anything else is a red cross',
        refs: ['step', 'run'],
      },
    ],
    verbose: [
      {
        code: '# .github/workflows/ci.yml\n#\n# Runs on GitHub\'s machines, not yours, which is the entire point:\n# "works on my machine" is not one of the available runners.',
        refs: ['workflow-name'],
      },
      { code: '' },
      {
        code: 'name: CI # briefly "CI (fix)", then "CI (fix 2)", then "CI (final)"',
        refs: ['workflow-name'],
      },
      { code: '' },
      { code: '# WHEN to run.', refs: ['trigger'] },
      {
        code: 'on:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n  schedule:\n    - cron: "0 6 * * 1" # 06:00 UTC every Monday\n  workflow_dispatch: # adds a "Run workflow" button in the UI',
        refs: ['trigger'],
      },
      { code: '' },
      {
        code: '# What the automatic GITHUB_TOKEN may touch. Start at read-only.',
        refs: ['permissions'],
      },
      { code: 'permissions:\n  contents: read', refs: ['permissions'] },
      { code: '' },
      {
        code: '# One live run per branch. Cancels the six you queued while\n# fixing the last one.',
        refs: ['concurrency'],
      },
      {
        code: 'concurrency:\n  group: ${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true',
        refs: ['concurrency'],
      },
      { code: '' },
      { code: '# Jobs run in parallel, on separate machines, sharing nothing.', refs: ['job'] },
      { code: 'jobs:', refs: ['job'] },
      { code: '  test:', refs: ['job'] },
      { code: '    name: Test (Node ${{ matrix.node }})', refs: ['job', 'matrix'] },
      { code: '    runs-on: ubuntu-latest', refs: ['runner'] },
      { code: '    timeout-minutes: 10', refs: ['job'] },
      { code: '' },
      {
        code: '    strategy:\n      fail-fast: false # let every version fail, for completeness\n      matrix:\n        node: [20, 22, 24]',
        refs: ['matrix'],
      },
      { code: '' },
      { code: '    steps:', refs: ['step'] },
      {
        code: "      # The runner starts empty. It has your repo's name, not its files.\n      - name: Check out the repository\n        uses: actions/checkout@v7",
        refs: ['step', 'action'],
      },
      { code: '' },
      {
        code: '      - name: Set up Node\n        uses: actions/setup-node@v7\n        with:\n          node-version: ${{ matrix.node }}\n          cache: npm',
        refs: ['step', 'action', 'matrix'],
      },
      { code: '' },
      { code: '      - run: npm ci', refs: ['step', 'run'] },
      { code: '      - run: npm test', refs: ['step', 'run'] },
      { code: '' },
      {
        code: '      # always() so the report survives a failing test run.\n      - name: Keep the coverage report\n        if: always()',
        refs: ['step', 'condition'],
      },
      {
        code: '        uses: actions/upload-artifact@v7\n        with:\n          name: coverage-node-${{ matrix.node }}\n          path: coverage/',
        refs: ['action', 'matrix'],
      },
      { code: '' },
      { code: '  deploy:', refs: ['job'] },
      { code: '    needs: test # waits for ALL of the matrix jobs above', refs: ['needs'] },
      {
        code: "    if: github.ref == 'refs/heads/main'",
        refs: ['condition'],
      },
      { code: '    runs-on: ubuntu-latest', refs: ['runner'] },
      {
        code: '    environment: production # can require a human to click Approve',
        refs: ['secret'],
      },
      { code: '    steps:', refs: ['step'] },
      { code: '      - uses: actions/checkout@v7', refs: ['step', 'action'] },
      {
        code: '      - name: Ship it\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }} # masked as *** in the log\n        run: ./scripts/deploy.sh',
        refs: ['step', 'secret', 'run'],
      },
    ],
  },
}
