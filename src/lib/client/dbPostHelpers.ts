import { goto, invalidate } from "$app/navigation"
import { get } from "svelte/store"
import type { SuperForm } from "sveltekit-superforms"
import { type Post } from "../schemas/drizzleSchema"
import type { TagsPerPost } from "../types/types"
import { postInEditFlag } from "./dbPostStores"

export function sortPostsDesc(posts: Post[]) {
	return posts.sort((a, b) => b.id - a.id)
}

export function filterPostsPublished(posts: Post[]) {
	return posts.filter((post) => post.status === "published")
}

export function tagsPerPost(
	postTags: { postId: number | null; tagName: string | null }[]
): TagsPerPost {
	const tagsPerPost = postTags.reduce((acc: TagsPerPost, { postId, tagName }) => {
		if (!postId || !tagName) return acc
		if (!acc[postId]) {
			acc[postId] = []
		}
		acc[postId].push(tagName)
		return acc
	}, {} as TagsPerPost)
	return tagsPerPost
}

export function findTagForPost(postId: number, postTags: TagsPerPost) {
	let matchedTags: string[] = []
	if (postTags[postId]) {
		matchedTags = postTags[postId]
	}
	return matchedTags
}

export function recentPostSlug(posts: Post[]) {
	const newestPost: Post = posts.reduce((prev, current) => {
		return current.id > prev.id ? current : prev
	})
	return newestPost.slug
}

export async function editPostHandler(postId: number) {
	const postResponse = await fetch("/api/getPostById", {
		method: "POST",
		body: JSON.stringify(postId),
		headers: { "content-type": "application/json" }
	})

	if (!postResponse.ok) {
		return { failure: true }
	}

	const postObject = await postResponse.json()

	let editResponse
	if (postObject) {
		editResponse = await fetch("/api/setEditPost", {
			method: "POST",
			body: JSON.stringify(postObject),
			headers: { "content-type": "application/json" }
		})

		if (!editResponse.ok) {
			return { failure: true }
		}

		postInEditFlag.set(true)
		const location = await editResponse.json()
		if (location) return await goto(location)
	}
}

export async function newPostHandler() {
	await clearEditPostStore()

	goto("/admin/posts/editor")
}

// eslint-disable-next-line
export async function discardPostHandler(form: SuperForm<any, any>) {
	if (form.isTainted()) form.reset()

	clearEditPostStore()
}

export async function clearEditPostStore() {
	const existingPostInEdit = get(postInEditFlag)
	if (existingPostInEdit) {
		const response = await fetch("/api/clearEditPost", {
			method: "GET",
			headers: { "content-type": "application/json" }
		})
		if (!response.ok) {
			return { failure: true }
		}
		postInEditFlag.set(false)
		invalidate("editingPost")
	}
}
