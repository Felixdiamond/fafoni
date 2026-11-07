# Editing site content (Pages CMS)

The client edits the site's words in a web editor. Nothing is hosted for it: Pages CMS reads
and writes the JSON files in this repo, and every save is a commit to `main`, which Vercel
deploys in about a minute.

```
client edits in app.pagescms.org ──► commit to main (app/_content/data/*.json)
                                   ──► Vercel build ──► www.fafoni.com
```

## What is editable

| In the editor | File | Shown on |
|---|---|---|
| Home page | `app/_content/data/home.json` | `/` (stories + closing also on `/services`) |
| Services (the five products) | `app/_content/data/products.json` | `/services` |
| Services page text | `app/_content/data/services.json` | `/services` |
| About page | `app/_content/data/about.json` | `/about` |
| Figures (PLACEHOLDER until supplied) | `app/_content/data/numbers.json` | `/about`, `/services` |
| Contact details | `app/_content/data/contact.json` | nav menu, footer, contact |

Not editable, on purpose: layout and design, legal pages, quiz and consultation form links.

## One-time setup (Felix)

1. Push this change to `main`.
2. Go to https://app.pagescms.org and sign in with the GitHub account that owns
   `Felixdiamond/fafoni`.
3. Install the Pages CMS GitHub App when prompted and give it access to **only** the
   `fafoni` repository.
4. Open the repo in Pages CMS, branch `main`. The sidebar should list the six entries above.
5. Invite the client: repo → Collaborators → invite by email. Collaborators don't need a
   GitHub account. They can edit content but not `.pages.yml` or other collaborators.
6. Do one test edit yourself (e.g. a word in "Contact details"), check the Vercel deployment
   goes green and the live site shows it, then revert it.

## Safety net

- If an edit leaves a file in a shape the code can't read, `next build` fails on Vercel and the
  **previous version stays live**. Vercel emails the failure; fix or revert the commit.
- Blank fields degrade quietly instead of failing: an empty badge disappears, an empty suffix
  shows nothing, an unknown photo shows initials, an unknown tile style falls back to `plate`.
- Every edit is a normal git commit ("Content: update … (via Pages CMS, name)"), so history
  and rollback work as usual.

## For developers

- Components never import the JSON. They import from `app/_content/*.ts`, which normalises
  every value through `app/_content/cms.ts`.
- Adding a field: add it to the JSON, the adapter, and `.pages.yml` together.
- Adding a story portrait: put the image in `public/photos/`, import it in
  `app/_content/portraits.ts`, and add its key to the `photo` select in `.pages.yml`.
- Pull before working locally. The client's commits land on `main` at any time.
