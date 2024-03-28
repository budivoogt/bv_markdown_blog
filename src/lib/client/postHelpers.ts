import { goto, invalidate } from "$app/navigation"
import { error } from "@sveltejs/kit"
import { get } from "svelte/store"
import type { SuperForm } from "sveltekit-superforms"
import type { Post } from "../../../drizzle/schema"
import type { TagsPerPost } from "../types/types"
import { postInEditFlag } from "./postStores"

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
		error(400, "request failed")
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
			error(400, "request failed")
		}

		postInEditFlag.set(true)
		const location = await editResponse.json()
		if (location) return await goto(location)
	}
}

export async function newPostHandler() {
	clearEditPostStore()

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
			error(400, "request failed")
		}
		postInEditFlag.set(false)
		invalidate("editingPost")
	}
}
