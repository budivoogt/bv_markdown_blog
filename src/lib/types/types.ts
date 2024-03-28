import type { Post, TagToPost } from "../schemas/drizzleSchema"

export type PostTag = { posts: Post | null; tags_to_posts: TagToPost }

export type TagsPerPost = Record<string, string[]>
