# content/

Posts and other long-form content live here.

## Adding a post

1. Create a new `.mdx` file under `content/posts/`. The filename (minus
   the extension) becomes the slug, so the URL is `/blog/<slug>`.
2. Required frontmatter:

   ```yaml
   ---
   title: "Your title"
   date: 2026-05-18        # YYYY-MM-DD
   summary: "One-sentence summary for the index."
   draft: false            # omit or set true to hide
   ---
   ```

3. Write the body in markdown. Heading levels start at `##` (the page
   renders an `h1` from the title automatically). Code fences,
   blockquotes, lists, and links work as standard markdown.
4. Posts are sorted by `date` descending on the index page. Drafts
   (`draft: true`) are excluded from the list at build time.

## Adding more than posts

`content/README.md` is intentionally not a post. Anything that is not
a `.mdx` file inside `content/posts/` is ignored by the reader.
