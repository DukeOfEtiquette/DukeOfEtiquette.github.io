# Contributing

All changes to this project **must** go through a pull request. Direct pushes to `master` are not allowed.

## Workflow

1. **Create a feature branch** off `master`:

   ```bash
   git checkout master
   git pull origin master
   git checkout -b your-branch-name
   ```

2. **Make your changes** on the feature branch. Follow the guidelines in `CLAUDE.md` and `STYLE_GUIDE.md`.

3. **Test locally** using Docker:

   ```bash
   docker compose up
   # Verify your changes at http://localhost:1313
   ```

4. **Build the site** to catch errors before pushing:

   ```bash
   hugo --gc --minify
   ```

5. **Commit and push** your feature branch:

   ```bash
   git add <files>
   git commit -m "Short description of changes"
   git push -u origin your-branch-name
   ```

6. **Open a pull request** targeting `master` on GitHub.

7. **Wait for review and CI checks** to pass before merging.

## Rules

- **Never push directly to `master`.** All changes reach `master` through merged pull requests.
- **One logical change per PR.** Keep pull requests focused — don't bundle unrelated changes.
- **Write clear commit messages.** Summarize the "why", not just the "what".
- **Verify the build passes** locally before opening a PR (`hugo --gc --minify`).
- **Check for leftover drafts** — run `grep -r 'draft = true' content/` and set `draft = false` for any posts you intend to publish.

## Branch Naming

Use descriptive branch names that reflect the change:

- `add-post-topic-name` — new blog post
- `fix-layout-issue` — bug fix
- `update-config-setting` — configuration change

## For Claude Agents

Claude agents must follow the same PR workflow. See the **Branching & Pull Request Workflow** section in `CLAUDE.md` for agent-specific instructions.
