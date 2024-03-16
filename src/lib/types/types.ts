import type { Post, TagToPost } from "../../../drizzle/schema"

export type PostTag = { posts: Post | null; tags_to_posts: TagToPost }

export type TagsPerPost = Record<string, string[]>
