+++
title = 'DRAFT: The call is coming from inside!'
date = 2026-02-08
draft = true
pinned = false
priority = 4
+++

- Be smart when installing and launching Claude Code!
- Permissions are off by default, even read requests
    - It will ask permission each time it wants to do something
- Permissions can be turned on for all future requests
    - Can be scoped globally -- "you can do this on any project"
    - Can be scoped per-project -- "you can do this on only this project"
- If launching in a project with secrets, I make sure it is well documented in CLAUDE.md where the secrets live
    - Models are trained to not leak secrets, but an additional "do not leak these" doesn't hurt
    - I want to avoid the model assuming what is or is not a secret

## But don't take my word for it!

- What security measures do you take to ensure you do not leak project secrets? What are modern best practices to make sure a model does not leak my secrets? How does Claude Code handle tool permissions? Research official Anthropic documentation when generating your response.
