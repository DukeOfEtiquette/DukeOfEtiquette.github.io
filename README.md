# DukeOfEtiquette.github.io

Personal blog built with [Hugo](https://gohugo.io/) and the [Hugo Blog Awesome](https://github.com/hugo-sid/hugo-blog-awesome) theme, deployed to GitHub Pages.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) for local development
- Or [Hugo extended](https://gohugo.io/installation/) installed locally

## Local Development

### With Docker (recommended)

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/DukeOfEtiquette/DukeOfEtiquette.github.io.git
cd DukeOfEtiquette.github.io

# Start the dev server
docker compose up

# Site is available at http://localhost:1313
```

The site live-reloads as you edit files.

### With Hugo installed locally

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/DukeOfEtiquette/DukeOfEtiquette.github.io.git
cd DukeOfEtiquette.github.io

# Start the dev server
hugo server -D
```

### If you already cloned without submodules

```bash
git submodule update --init --recursive
```

## Creating a New Post

```bash
# With Hugo installed
hugo new posts/my-new-post.md

# Or manually create a file at content/posts/my-new-post.md
```

Set `draft = false` in the front matter when the post is ready to publish.

## Deployment

Deployment is automated via GitHub Actions. Pushing to the `main` branch triggers the workflow at `.github/workflows/deploy.yml`, which:

1. Installs Hugo extended
2. Checks out the repo with submodules
3. Builds the site
4. Deploys to GitHub Pages

The site is published at https://DukeOfEtiquette.github.io/.

### GitHub Pages Setup

In your repository settings, under **Pages**, set the source to **GitHub Actions**.

## Project Structure

```
.
├── archetypes/        # Content templates
├── assets/            # Files processed by Hugo (SCSS, images)
├── content/posts/     # Blog posts
├── layouts/           # Layout overrides
├── static/            # Static files (copied as-is)
├── themes/            # Hugo themes (git submodule)
├── hugo.toml          # Site configuration
├── Dockerfile         # Docker image for local dev
└── docker-compose.yml # Docker Compose config
```
