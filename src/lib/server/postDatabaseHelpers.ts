import type { User } from "@supabase/supabase-js"
import { error } from "@sveltejs/kit"
import { and, eq, isNotNull } from "drizzle-orm"
import {
	posts,
	tags,
	tagsToPosts,
	users,
	type Post,
	type SchemaUser
} from "../schemas/drizzleSchema"
import db from "./database"

export async function getAllPosts() {
	try {
		const database = db()
		const posts = await database.query.posts.findMany()
		return posts
	} catch (err) {
		error(400, "Couldn't get posts")
	}
}

export async function getPostById(postId: number) {
	try {
		const database = db()
		return await database.query.posts.findFirst({ where: eq(posts.id, postId) })
	} catch (err) {
		error(400, "Couldn't get post")
	}
}

export async function getAllTags() {
	try {
		const database = db()
		return await database.query.tags.findMany()
	} catch (err) {
		error(400, "Couldn't get tags")
	}
}

export async function getAllPostTagPairs() {
	try {
		const database = db()
		return await database
			.select({
				postId: tagsToPosts.postId,
				tagName: tags.name
			})
			.from(posts)
			.leftJoin(tagsToPosts, eq(tagsToPosts.postId, posts.id))
			.leftJoin(tags, eq(tags.id, tagsToPosts.tagId))
			.where(isNotNull(tags.name))
	} catch (err) {
		error(400, "Couldn't get tag post pairs")
	}
}

export async function getPostTagsObjects(postId: number) {
	try {
		const database = db()
		return await database.query.tagsToPosts.findMany({
			where: eq(tagsToPosts.postId, postId)
		})
	} catch (err) {
		error(400, "Could not get post tags")
	}
}

export async function getPostTagsStrings(postId: number) {
	try {
		const database = db()
		const tagPairs = await database.query.tagsToPosts.findMany({
			where: eq(tagsToPosts.postId, postId)
		})
		const tagPairArray =
			// wait for all promises to resolve
			(
				await Promise.all(
					tagPairs.map(async (pair) => {
						try {
							const tag = await findTagById(pair.tagId)
							return tag?.name
							// catch any rejected promises per tag
						} catch (error) {
							return null
						}
					})
				)
			)
				// filter for tags that exist
				.filter((tag): tag is string => tag !== null && tag !== undefined)
		return tagPairArray
	} catch (err) {
		error(400, "Could not get post tags")
	}
}

export async function insertPost(data, matchedUser: SchemaUser) {
	const database = db()
	try {
		const postArray = await database
			.insert(posts)
			.values({
				title: data.title,
				description: data.description,
				body: data.body,
				slug: data.slug,
				authorId: matchedUser?.id
			})
			.returning()
		return postArray[0]
	} catch (er) {
		error(400, "error inserting post")
	}
}
export async function updatePost(data, postInEdit: Post, matchedUser: SchemaUser) {
	const database = db()
	try {
		const postArray = await database
			.update(posts)
			.set({
				title: data.title,
				description: data.description,
				body: data.body,
				slug: data.slug,
				authorId: matchedUser?.id
			})
			.where(eq(posts.id, postInEdit.id))
			.returning()
		return postArray[0]
	} catch (er) {
		error(400, "error updating post")
	}
}

export async function findTagByName(tagName: string) {
	const database = db()
	try {
		const tag = await database.query.tags.findFirst({
			where: eq(tags.name, tagName)
		})
		return tag
	} catch (err) {
		error(400, "No tag found")
	}
}
export async function findTagById(tagId: number) {
	const database = db()
	try {
		const tag = await database.query.tags.findFirst({
			where: eq(tags.id, tagId)
		})
		return tag
	} catch (err) {
		error(400, "No tag found")
	}
}

export async function insertTag(tagName: string) {
	const database = db()
	try {
		const tagArray = await database
			.insert(tags)
			.values({
				name: tagName
			})
			.returning()
		if (tagArray.length === 0) {
			error(400, "Tag insert failed")
		}
		return tagArray[0]
	} catch (err) {
		error(400, "Tag insert failed")
	}
}

export async function insertTagToPostPair(postId: number, tagId: number) {
	const database = db()
	try {
		const response = await database
			.insert(tagsToPosts)
			.values({
				postId,
				tagId
			})
			.returning()
		return response
	} catch (err) {
		error(400, "Couldn't match post to tag")
	}
}

export async function deleteTagToPostPair(postId: number, tagId?: number) {
	const database = db()
	try {
		if (postId && tagId) {
			const response = await database
				.delete(tagsToPosts)
				.where(and(eq(tagsToPosts.postId, postId), eq(tagsToPosts.tagId, tagId)))
			return response
		}
		if (postId) {
			const response = await database
				.delete(tagsToPosts)
				.where(eq(tagsToPosts.postId, postId))
			return response
		}
	} catch (err) {
		error(400, "Couldn't delete pair(s)")
	}
}

export async function findUserById(id: string) {
	const database = db()
	try {
		return await database.query.users.findFirst({
			where: eq(users.uuid, id)
		})
	} catch (err) {
		error(400, "couldn't find user by id")
	}
}

export async function createNewUser(user: User) {
	const database = db()
	try {
		const userArray = await database
			.insert(users)
			.values({
				uuid: user.id,
				fullName: user.user_metadata.full_name,
				email: user.email,
				emailVerified: user.user_metadata.email_verified
			})
			.returning()
		return userArray[0]
	} catch (err) {
		error(400, "Couldn't create new user")
	}
}

export async function updatePostStatus(postId: number, oppositeStatus: string) {
	const database = db()
	return await database
		.update(posts)
		.set({ status: oppositeStatus })
		.where(eq(posts.id, postId))
		.returning()
}
