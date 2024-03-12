# Site structure

Generated via [ASCII Tree Generator](https://ascii-tree-generator.com/).

static/
src/
├─ lib/
│ ├─ components/
├─ routes/
│ ├─ about/
│ ├─ coding/
│ ├─ blog/
│ ├─ admin/

# Page content

## Homepage

This should have:

-   photo of me
-   brief bio of me
-   newsletter form
-   most recent posts

## About

Maybe this page isn't necessary at all.

However I should build it and then I can always decide to add it as crawlable.

Should have a photograph of me, long-form about story and _potentially_ a contact field.

## Coding

-   Brief description of my coding journey and goals. Reference my GitHub.

-   Visually appealing list of my projects with links to the GitHub Repo's and/or Vercel deployments.

## Blog

List of all blog posts, sorted chronologically.

## Footer

Should have links to GitHub, X and LinkedIn.

## Header

Navigation to the `/coding`, `/blog` and `/about` pages.

## Metadata

I want to optimize the SEO for this website.

Therefore I'll need:

-   [] SvelteKit and HTML sections like `<head>`
-   [] Metadata title, description for every page.
-   [] Alternative description for every image.
-   [] Server-side rendering of all the content, especially when drawn from a database.
-   [] Protect routes for everything under /admin.

## Admin panel

I must easily be able to edit posts, which are pulled from the database. Therefore I'll need a place to create, update, remove and delete posts. I could permit this on the `/blog` page, or alternatively create an admin panel where I can log in/out and CRUD posts and portfolio projects. That would be the most educational challenge. I can then re-use this architecture for the Striking Markets site.

# Technical deliberations

## Integrating Markdown

I want to write the posts in Markdown, sanitize and style them locally. For SEO it'll be important that the data is loaded from a SK SSR function. That way it can be crawlable.

## Using a local or managed database?

I've understood SQLite is the easiest since it's just a local file. It struggles with concurrency at scale, but is reported to support 10K concurrent users. My blog won't have that. Therefore, SQLite technically could work.

I don't need a database however, since the posts can be written as Markdown files and stored on the server. But it would present an opportunity to experiment with a third party managed service, like Neon (Postgres) or Turso (SQLite). Ben Davis spoke highly of SQLite and Turso, so I'm eager to give that a shot. It will make my sites dependent on Turso going forward however.

If I use local markdown files, I can build components based on the markdown file's content. If I use a database, I can store the post title, content, date, author as separate columns. That has its benefits, which I could mimic in a local database too. I'll use **SQLite**. I'm also going to use Turso for educational purposes.

## What ORM to use?

I've tried Prisma in the Lucia Auth project that I've built. I will now use **Drizzle**, which has a more SQL-esque query builder, but also abstracted object-oriented queries like Prisma. This is a new feature. I want to experience the set-up and query process.

# Features

-   [] Update global font
-   [] Add semantic HTML
-   [] Add metadata tags
-   [] Create 404 routing for invalid slugs
-   [] Make sure draft posts are only visible for the admin and not crawlable

# Learnings

## $env variables

SvelteKit has built-in $env variables. For Vercel deployments and therefore for dev environments, I should import the specific variables defined in `.env` and import them like so: `import { VARIABLE_NAME } from "$env/static/private`. Always prefer static over dynamic vars. Vercel replaces the local variables with the ones you provide for the project, inserting them upon build.

## $page.data and endpoints

Pages have access to data loaded to that page by `+page.ts` and any parent layout data. If there's also `+page.server.ts` providing data, you can destructure `{data}` in the `PageLoad` function and spread it, returning both the server and the page data.

I can return parent data from child load functions by destructuring `parent` and calling `await parent()`. It's a bit unclear to me what data is procured, but I think a /child/layout.ts accesses
