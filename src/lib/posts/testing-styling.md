---
title: Styling Markdown
description: I'm trying different ways to style my Markdown.
date: "2024-4-6"
lastmod: "2024-4-7"
tags:
    - sveltekit
    - svelte
    - markdown
    - bananas
published: true
---

Since I'm using mdSveX to import .md files, I have to figure out how to style them.

The first thing that annoyed me was that line breaks don't immediately show up as such in the parsed HTML. Apparently I could use a `\` to mimick those, but that wasn't working in the default implementation.

Now I need to decide whether I want to solve this problem with CSS, using something like the `TailwindCSS/Typography` plugin, or whether I want to use a plugin that parses line breaks and adds `<br>` code blocks. I doubt the latter makes any difference from an SEO perspective. But one may look better on more browsers than the other.

# Here's a H1
