# GEMINI.md

## Project Overview

Personal blog built with [Hugo](https://gohugo.io/) using the [Hugo Blog Awesome](https://github.com/hugo-sid/hugo-blog-awesome) theme, deployed to GitHub Pages at https://DukeOfEtiquette.github.io/. This project is managed with the help of Gemini.

## Tech Stack

- **Hugo** (static site generator, extended edition)
- **Go modules** for theme management (go 1.21+)
- **Docker / Docker Compose** for local development
- **GitHub Actions** for CI/CD (PR validation + deploys on merge to `master`)

## Local Development

Always use Docker for local development. Do not run Hugo directly.

```bash
docker compose up
# Site at http://localhost:1313
```

## Creating Posts

```bash
hugo new posts/my-new-post.md
```

- Posts live in `content/posts/`
- Front matter uses TOML (`+++` delimiters)
- Set `draft = false` when ready to publish

## Draft Priority

Drafts use a `priority` field in front matter to indicate planned release order (lower = release sooner):

```toml
priority = 1
```

- `priority = 1` is the next post to publish
- Unprioritized drafts have no `priority` field
- Update priorities as plans change

## Post Ideas

The `.ideas/` directory holds early-stage post ideas that aren't ready to become drafts. Files here are invisible to Hugo—they won't appear on the site even in development mode.

- Store ideas as markdown files in `.ideas/`
- When ready to start writing, move the file to `content/posts/`
- Use the same markdown format as posts (front matter optional for ideas)

## Pinned Posts

Add `pinned = true` to a post's front matter to pin it to the top of the posts list page. Pinned posts appear above regular posts on page 1 only.

- The list template override lives in `layouts/_default/list.html`
- Post card rendering is in `layouts/partials/post-entry.html`
- Pinned post CSS is in `layouts/partials/custom-head.html`

## Content Guidelines

See `STYLE_GUIDE.md` for voice, prose, and structural requirements. Key points:

- First person voice ("I" / "me")
- Every post ends with a **"But don't take my word for it!"** section
- All content is human-curated — do not generate generic filler or repackage others' content

## Draft Summary

When the user asks for a summary of drafts, upcoming posts, what's in the pipeline, or anything about what content is coming up, **always** respond with a Markdown table listing every post in `content/posts/` that has `draft = true` in its front matter. Ignore files in `.ideas/`! The table must have these columns:

| Priority | Post | File | Description |
|----------|------|------|-------------|

- **Priority** — the `priority` value from front matter, or "—" if not set.
- **Post** — the `title` from the post's front matter.
- **File** — relative path (e.g. `content/posts/my-post.md`).
- **Description** — a single-sentence summary of the post's content. If the post body is too short or empty to summarize, write "*(no content yet)*".

Sort the table by priority (lowest first). Drafts without a priority appear at the end.

To build the table, read the front matter and body of every draft post. Do not omit any drafts and do not include published posts (`draft = false` or no `draft` field).

## Interacting with Gemini

Gemini models have built-in tools like `google_web_search` that can be used for research. You can create custom tools and skills to extend Gemini's capabilities.

This project had `Style Review` and `Fact Check` skills for another model. You can re-create them for Gemini using the `skill-creator` skill.

## Branching & Pull Request Workflow

**Direct pushes to `master` are forbidden.** All changes must be submitted via pull request.

### Rules for AI agents

1. **Never commit or push directly to `master`.** Always work on a feature branch.
2. **Create a feature branch** before making any changes:
   ```bash
   git checkout -b your-branch-name
   ```
3. **Commit changes** to the feature branch with clear, descriptive messages.
4. **Push the feature branch** to the remote:
   ```bash
   git push -u origin your-branch-name
   ```
5. **Open a pull request** targeting `master` using `gh pr create`.
6. **Never force-push to `master`** or bypass branch protections.

If you are already on `master`, switch to a new branch **before** making any commits. Under no circumstances should an AI agent push commits to `master`.

See `CONTRIBUTING.md` for the full contribution workflow.

### GitHub CLI Workaround

If `gh pr create` fails with gitconfig permission errors, use the API directly:

```bash
gh api repos/DukeOfEtiquette/DukeOfEtiquette.github.io/pulls --method POST \
  -f title="PR title" \
  -f head="branch-name" \
  -f base="master" \
  -f body="PR description"
```

## Build & Validation

```bash
# Build the site (same as CI)
hugo --gc --minify

# Check for drafts still marked true
grep -r 'draft = true' content/
```

## Project Structure

```
.ideas/            # Early-stage post ideas (not processed by Hugo)
archetypes/        # Content templates (default.md)
content/posts/     # Blog posts (Markdown + TOML front matter)
layouts/           # Template overrides (list page, post entry, custom head CSS)
.github/workflows/ # GitHub Actions (deploy.yml + ci.yml for PR validation)
.githooks/         # Git hooks (pre-push blocks direct pushes to master)
hugo.toml          # Site configuration
Dockerfile         # Local dev container
docker-compose.yml # Docker Compose config
CONTRIBUTING.md    # Contribution workflow and PR rules
```

## Git Hooks Setup

This project uses a pre-push hook to block direct pushes to `master`. To activate the hook after cloning:

```bash
git config core.hooksPath .githooks
```