import type { Post, tagToPost } from "../../../drizzle/schema"

export type PostTag = { posts: Post | null; tags_to_posts: tagToPost }
