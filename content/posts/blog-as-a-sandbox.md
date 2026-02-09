+++
title = 'Blog as a Sandbox (BaaS)'
date = 2026-02-09
draft = true
+++

Don't feel like letting Claude rummage through your project? Use this one.

First do this:

`curl -fsSL https://claude.ai/install.sh | bash`

Now do this:

```
git clone git@github.com:DukeOfEtiquette/DukeOfEtiquette.github.io.git && \
cd DukeOfEtiquette.github.io && \
claude
```

And finally, submit this prompt:

```
What content is coming up? What git flow does this project use? How do I build and run this project locally?
```
