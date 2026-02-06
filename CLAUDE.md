# CLAUDE.md

## Project Overview

Personal blog built with [Hugo](https://gohugo.io/) using the [Hugo Blog Awesome](https://github.com/hugo-sid/hugo-blog-awesome) theme, deployed to GitHub Pages at https://DukeOfEtiquette.github.io/.

## Tech Stack

- **Hugo** (static site generator, extended edition)
- **Go modules** for theme management (go 1.21+)
- **Docker / Docker Compose** for local development
- **GitHub Actions** for CI/CD (deploys on push to `master`)

## Local Development

```bash
# Docker (recommended)
docker compose up
# Site at http://localhost:1313

# Or with Hugo installed locally
hugo server -D
```

## Creating Posts

```bash
hugo new posts/my-new-post.md
```

- Posts live in `content/posts/`
- Front matter uses TOML (`+++` delimiters)
- Set `draft = false` when ready to publish

## Content Guidelines

See `STYLE_GUIDE.md` for voice, prose, and structural requirements. Key points:

- First person voice ("I" / "me")
- Every post ends with a **"But don't take my word for it!"** section
- All content is human-curated — do not generate generic filler or repackage others' content

## Build & Validation

```bash
# Build the site (same as CI)
hugo --gc --minify

# Check for drafts still marked true
grep -r 'draft = true' content/
```

## Project Structure

```
archetypes/        # Content templates (default.md)
content/posts/     # Blog posts (Markdown + TOML front matter)
.github/workflows/ # GitHub Actions deploy workflow
hugo.toml          # Site configuration
Dockerfile         # Local dev container
docker-compose.yml # Docker Compose config
```
