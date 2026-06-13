# Building a Website with Claude Code — A Workflow Guide

This is a working method for building and running a website with Claude Code,
written so anyone can adopt it for their own site. It was developed building a
real static site (hand-written HTML/CSS/JS, no framework) hosted on Netlify and
deployed from GitHub. The same loop works for most static and lightly-dynamic
sites regardless of the exact tools.

Nothing here is specific to one person’s site. Swap in your own domain, repo,
and content and it works the same.

-----

## 1. The stack this assumes

- **Code lives in a GitHub repo.** One folder on your computer, version-controlled.
- **Hosting auto-deploys from GitHub.** Push to the main branch → the host rebuilds
  and publishes within a minute or two. (Netlify, Vercel, Cloudflare Pages, and
  GitHub Pages all do this. The guide uses Netlify’s behavior but the loop is identical.)
- **Static files, no build step** is the simplest version: the host publishes the
  repo as-is. If you use a framework with a build command, the only change is the
  host runs that command before publishing — the workflow below doesn’t change.
- **Forms/email capture** via the host’s built-in form handling (Netlify Forms) or
  a third-party service, so you don’t run a server.

You do NOT need to know how to code to use this. Claude Code writes and edits the
files. You drive with plain-language requests and decisions.

-----

## 2. The core loop: work in “rounds”

This is the heart of the method. Don’t ship every tiny change one at a time.
Batch related changes into a **round**, then ship the whole round at once.

1. **You request changes in plain language.** “Make the header smaller.” “Add a
   contact page.” “The bio should mention X.” Stack as many as you want.
1. **Claude Code stages them but does NOT publish.** It edits the files in your
   repo and, after each change, tells you what’s now waiting (“Queue: header
   resize, new contact page, bio edit — keep going or build?”).
1. **You keep stacking** until the round feels complete. Reviewing as you go is
   normal — ask to see the current state of any page anytime.
1. **You say “build it”** (or “ship it,” or whatever phrase you like — just be
   consistent). Only then does Claude Code verify everything, make ONE commit
   describing the whole round, and push — which triggers the deploy.

**Why rounds beat shipping each change:** one clean commit per round keeps your
history readable, lets you review before anything goes live, and means a single
“build it” publishes a coherent set of changes instead of ten half-finished ones.

**The rule that makes it safe:** *nothing goes live until you say the magic word.*
Tell Claude Code this explicitly at the start: “Stage all changes silently. Never
commit or push until I say ‘build it.’ After each change, tell me what’s queued.”

-----

## 3. Set it up once

Tell Claude Code, in your first session, to create a **CLAUDE.md** file in your
repo root. Claude Code automatically reads this file every time it starts, so it’s
how your preferences and rules survive across sessions. Put in it:

- **What the site is** and who it’s for (one paragraph).
- **The deploy pipeline** (“push to main = live on [host]”).
- **The round workflow** from section 2, so every future session follows it.
- **Your house style** — colors (as hex codes), fonts, tone, formatting rules,
  any “always do this / never do that” conventions.
- **A file map** — what each page is.
- **Landmines** — anything fragile that’s bitten you before.
- **Open decisions** — things you haven’t decided yet, so Claude asks instead of guessing.

Treat CLAUDE.md as living: when you make a lasting decision (“we’re never using a
hamburger menu”), have Claude add it. When something becomes final (“the bio is
done”), mark it final so future sessions don’t helpfully re-edit it.

-----

## 4. Verify before every publish

Have Claude Code run quick checks before each “build it” push. These catch the
embarrassing stuff before it goes live, not after:

- **Syntax check any code it changed.** For a page with JavaScript, extract the
  script and parse it so a typo fails loudly in the terminal instead of silently
  on the live site.
- **Confirm the change actually landed.** Search the file for the new text/feature
  and for the absence of whatever was removed. (“Grep that it’s there.”)
- **Check consistency across pages** for anything site-wide (every page has the
  footer, the nav, the meta tags, etc.).

You don’t run these — Claude Code does. You just make it a standing instruction:
“Verify before every push and tell me the result.”

-----

## 4a. Previewing locally before anything is live

For a no-build static site, Claude Code can run a tiny local web server in your
project folder (e.g. `python3 -m http.server 8080`). This gives you an address
like `http://127.0.0.1:8080` that only works on your own computer — open it in
Safari (or any browser) to click through the real site exactly as a visitor
would, with zero risk of it being public.

- Ask Claude Code to start this server any time you want to look at the site.
- Refresh the page after Claude makes changes to see them instantly — no
  rebuild or push needed.
- This is separate from "build it" (section 2) — looking locally is free and
  instant; "build it" is the one-way step that goes to GitHub/Netlify.

## 4b. Hotspot overlays — making designed images interactive without editing them

If your site's content comes from designed image exports (e.g. slides from
Canva) and you don't want those images altered, Claude Code can add an
**invisible clickable layer on top of the image** instead of editing it:

- Each clickable area is a transparent `<a class="hotspot">` element,
  positioned using **percentages** (not pixels), so it scales and stays
  aligned with the image at any screen size.
- To line these up with the text/buttons already drawn into the image, add
  `?debug=1` to the page's URL (e.g. `http://127.0.0.1:8080/about.html?debug=1`).
  This highlights every hotspot in pink with a label, so you can see exactly
  where it sits relative to the image and tell Claude Code how to nudge it
  ("move the CONTENTS hotspot down a bit, it's too high").
- Once positions look right, the hotspots are invisible in normal browsing —
  visitors just see Grace's design, but the text she drew (HOME, CONTENTS,
  email, links, etc.) is clickable.

This lets you keep 100% of the original artwork while making it a real,
navigable website.

-----

## 5. Safe editing habits (tell Claude Code to follow these)

- **For risky edits to big or fragile files, anchor on exact existing text and
  assert it exists and is unique before replacing.** This way, if the file has
  changed since Claude last read it, the edit fails instead of corrupting the file.
- **Re-read a file right before editing it** if there’s any doubt it’s current.
- **Keep binary assets (images, fonts) in a dedicated folder** (e.g. `assets/`)
  and everything the host serves as a page in the locations the host expects.
- **One commit per round, with a message that describes the whole round.**

-----

## 6. Handling handoffs between sessions

Long projects span many chats. Two files keep continuity:

- **CLAUDE.md** (section 3) carries the permanent method and rules.
- A **HANDOFF.md** or running notes file captures the current state and open items
  at the end of a heavy session. Start the next session by pointing Claude at it.

Claude Code can also read your repo’s git history and existing files directly, so
most context rebuilds itself — but an explicit handoff file removes guesswork.

-----

## 7. Things you (the human) own, not Claude

Some steps live outside the code and only you can do them. Keep a short list and
knock them out as they come up:

- **Connecting the repo to the host** and pointing your domain at it (one-time).
- **HTTPS / SSL**: most hosts provision a free certificate automatically; you may
  need to click “provision” and turn on “Force HTTPS” so visitors aren’t warned
  the site is “Not secure.” Free on every major host — don’t pay for it.
- **Analytics**: create the account (e.g. Google Analytics), get your measurement
  ID, and hand it to Claude Code to install on every page.
- **Search visibility**: add a `sitemap.xml`, register at Google Search Console,
  submit the sitemap. New sites are invisible until search engines are told they exist.
- **Domain email, payment processors, third-party account approvals**: anything
  requiring your login and your decision.

Tell Claude Code your decisions; let it handle the code that follows from them.

-----

## 8. The shortest possible version

1. Code in GitHub, host auto-deploys on push.
1. Put your rules in CLAUDE.md so every session obeys them.
1. Request changes freely; Claude stages them silently.
1. Say “build it” to verify + commit + push the whole round live.
1. Nothing publishes until you say it.
1. You handle accounts/domain/HTTPS; Claude handles the code.

That’s the whole method. It scales from a one-page site to a fifteen-page one
without changing.