+++
title = 'DRAFT: Crash Course: Claude Code'
date = 2026-02-07
draft = true
pinned = false
+++

## Model vs LLM

- Model is a broad, generic term. Large Language Model is a type of model.
- Anthropic's LLMs are Opus, Sonnet, Haiku

## Claude vs Opus vs Sonnet vs Haiku

- Claude is branding and generically refers to all their available models
- Opus, Sonnet, and Haiku are specific models trained for different tiers of work
- Opus is most capable, the slowest, and most expensive
- Haiku is the least capable, the fastest, and cheapest
- Sonnet is the balance between Opus and Haiku

## Can we finally talk about Claude Code?

- CC is a CLI that can enter into a REPL, which provides a built-in generic agent and tooling that unlocks agentic workflows
- Anthropic refers to CC as an *augmented LLM*
- The generic agent and extra tooling allow for building workflows where agents can chain work together via well-defined inputs and outputs
- For example...
- CC is built using the Claude Agent SDK
- Often referred to as a *harness* or *scaffold*
    - Google has a CLI tool called `gemini` and OpenAI has one called `codex`
- CC provides far more than just an interface to their LLMs
- Comes with a lot of tools and a memory system that augments their LLMs
- These *augmented LLMs* (e.g. Claude Code)
- Obfuscates a lot of work by allowing a generic-agent to call Tools and/or delegate work to other agents
- From prompt to response, a lot of decisions and actions will be taken before returning a response
- Claude Code provides a chat window that allows you to watch and inspect that work from prompt to response, rather than hide it in a black box

## File System Access Unlocked

- The real power is in CC's ability to read/write files from/to your file system
- This empors more than just modifying code files
- I can now save snapshots of compiled* context into a file so future claude session can quickly/easily/cheaply pull that memory back into it's context window
- This greatly speeds up future requests that require knowledge from that compiled* context, and doesn't require "double spending" on tokens

## Compiled* context

- I don't mean like a compiler
- I mean information scattered across several locations being compiled into a single location with additional context that ties them all together
- The CLAUDE.md is the canonical example
- It compiles all the context for how to operate within a particular project such that each fresh session always starts with that information in it's context window
- This saves you from having to re-explain things like build/run commands or even project structure to each new session
- It will just "remember" after you've compiled it all into the CLAUDE.md
- Rather than spend thousands of tokens scanning and exploring your project to find a file, it'll have it fresh in its "memory" and just immediately make a Read tool call on the correct path
