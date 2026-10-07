# /jb:work-ticket, the iaux-specific half

What `/jb:work-ticket` reads before it claims. The pipeline is the plugin's; this
is only what's true of this repo.

This is `github.com/internetarchive/iaux`, a **monorepo of independent npm
packages** under `packages/`. Three things differ from the other projects in the
fleet:

- **Tickets are in Jira, PRs are on GitHub.** The issue key is `WEBDEV-1234`. It
  goes in the branch name and at the front of the PR title
  (`WEBDEV-1234: Short description`). That prefix is what attaches the PR to the
  ticket's Development panel. The default branch is `master`, not `main`.
- **Every package is its own project.** There is no root install, no workspaces
  and no lerna. Each package under `packages/` has its own `package.json`,
  lockfile, `node_modules` and version, and is published on its own.
- **This repo is not mine alone.** Colleagues work in it. A ticket reached this
  run because a human labelled it `agent-ready`. Nothing else in the project is
  yours to touch, and nothing here may comment on, close or relabel a ticket
  that wasn't handed to you.

## Worktree

```bash
git worktree add .claude/worktrees/$ARGUMENTS-<slug> -b $ARGUMENTS-<slug> origin/master
cd .claude/worktrees/$ARGUMENTS-<slug>/packages/<package>
npm ci
```

Inside `.claude/worktrees/`, **not** a sibling directory. Branch from
`origin/master`. The branch name carries the ticket key
(`WEBDEV-1234-short-description`).

Install only the package(s) the ticket touches, with `npm ci`. Never run
`scripts/bootstrap.sh` for a ticket: it runs `npm install` in all 14 packages,
which can rewrite every lockfile.

The repo's `.gitignore` doesn't list `.claude/worktrees/` until WEBDEV-8890 merges. Never `git add` anything under it.

**If this is a resumed worktree, check `git status` before touching anything.**
Uncommitted changes you didn't make in this run are not yours to discard. Stop,
write what you found into the ticket's `## Agent blocked` section and flip to
`agent-blocked`.

## Which package

Map the ticket to a package before installing anything.

- **Live:** `ia-activity-indicator`, `ia-pic-uploader`, `ia-styles`, `ia-topnav`,
  `ia-userlist-settings`, `ia-wayback-search`, `ia-zendesk-help-widget`.
- **Deprecated, don't edit:** `radio-player`, `audio-element`,
  `waveform-progress`, `playback-controls`, `scrubber-bar`,
  `expandable-search-bar`, `transcript-view`. They moved to
  [`@internetarchive/elements`](https://github.com/internetarchive/elements) and
  are deprecated on npm. If a ticket needs a change in one of these, it belongs in
  elements. Write that into `## Agent blocked` and stop.
- **This repo takes no new packages.** New components go in
  `iaux-typescript-wc-template`.

If the ticket spans more than one repo (for example iaux plus elements), only
this repo's half is yours. Say so in `## Agent blocked` rather than guessing at
the other half.

## Package manager

**npm, per package.** The live packages have a `package-lock.json`. Use plain
`npm ci` to install and `npm run <script>` to run things. No pnpm, no yarn, no
corepack.

`ia-pic-uploader` is the exception: it has a `yarn.lock` and its scripts call
`yarn`. Use `yarn install --frozen-lockfile` and `yarn run <script>` there.

Never use `npm install` for a ticket that isn't about dependencies. It rewrites
the lockfile against whatever the registry has today.

## Read first

The package's own `README.md` and the root `README.md`. There's no root
`CLAUDE.md`. The PR template is in `PULL_REQUEST_TEMPLATE.md` (Description,
Technical, Testing, Evidence).

## House rules

- **TypeScript + Lit web components, ES modules.** Tests are
  `test/**/*.test.ts`, compiled to `dist/test/` and run by Web Test Runner (or
  Vitest in `ia-zendesk-help-widget`).
- **ESLint and Prettier decide formatting**, not you. `npm run format` fixes it.
  `npm run lint` is what CI checks. Format only what you edited.
- **No new dependency unless it's the point of the ticket.** A lockfile change
  buried in a behaviour fix is the reviewer's problem.
- **Code comments describe only the current state, never the past.** No "instead
  of the old...", no "we used to...".
- **Merge conflict policy is absolute.** A conflicted `package-lock.json`: take
  `origin/master`'s version and regenerate with `npm install`. Every other
  conflicted file: don't pick a side. `git merge --abort`, describe both sides in
  the ticket, `agent-blocked`, stop. To update a branch, **merge**
  `origin/master` in. Never rebase.

## Verify

From the package directory, in the worktree:

```bash
npm test
```

`npm test` is the package's whole check. In most packages that's
`tsc && npm run lint && npm run circular && wtr --coverage`: typecheck, ESLint
and Prettier, a `madge` circular-dependency check, then the tests in headless
Chromium. It takes seconds to a couple of minutes. Package scripts differ a
bit, so read `scripts` in the package's `package.json` rather than assuming.
Some packages run `npm run format` as part of `test`. If that changes files you
didn't edit, revert them.

Never invoke bare `wtr --watch` or `npm run start`, which open browser windows.

If Chromium is missing, `node_modules/.bin/playwright install chromium` once
(installs into the shared `~/.cache/ms-playwright`).

CI runs `scripts/test.sh`, which runs `npm run test` in every package under
Node 24. A change to one package shouldn't need the others, but if the ticket
touches something shared (like `ia-styles`), also run `npm test` in a package
that depends on it.

## QA

Each package has a demo page. `npm run start` builds with `tsc` and serves it
with `wds` (Web Dev Server). `ia-topnav` serves
`https://local.archive.org:8000/demo` over HTTP/2 with a self-signed certificate
from the package's `ssl/` folder. Drive the browser with a context created with
`ignoreHTTPSErrors: true`. `ia-zendesk-help-widget` uses `vite serve demo`.

If the change isn't reachable from a demo page (a type, a build script, a test
helper), say so and let `npm test` be the verification. A QA section describing
a page you never loaded is worse than none.

**Stop the dev server when you're done.** `pgrep -lf "wds|vite"` lists what's
running. Kill the one you started.

## Publishing

**The worker never publishes.** Each package is released on its own, by a human.
The version bump is a normal PR (`package.json` and `package-lock.json`, titled
like `WEBDEV-1234: Bump ia-topnav to v2.2.1`). Don't bump a version unless the
ticket says to.

If a ticket does ask for a release: a final (`latest`) version is only ever
published from `master` after the PR merges, then git-tagged
(`<package>@<version>`, e.g. `transcript-view@1.0.1`). **Never publish a final
from a branch.** A branch can only publish a prerelease under a non-`latest` tag
(`npm version prerelease --preid <name> --no-git-tag-version && npm publish
--tag <name>`). Don't `npm publish`, tag, or run `ghpages:publish` from this
run.

## Hazards

- **Never push to `master`, and never merge your own PR.** A human merges. The
  PR is the whole output of this run.
- **Don't run `scripts/bootstrap.sh`** or `npm install` across packages. It
  touches every lockfile.
- **Never edit `dist/`, `coverage/`, `ghpages/` or `custom-elements.json` by
  hand.** They're build output.
- **The Jira ticket belongs to a team.** Don't transition it, reassign it, touch
  its sprint or story points, or comment on it. Write status into the
  description's `## Agent blocked` section instead, never a comment (comments
  from the `jasonb+jira` account are permanent). Never move it to Code Review.
- **Verify the assignee is exactly Jason before claiming, every time, even on a
  resumed ticket.** Seeing the wrong assignee is a hard stop.
- **`.env`, `ssl/` keys and anything that looks like a credential stays
  untouched.**
