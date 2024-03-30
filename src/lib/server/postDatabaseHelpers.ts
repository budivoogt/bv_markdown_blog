import { error } from "@sveltejs/kit"
import { eq, isNotNull } from "drizzle-orm"
import { posts, tags, tagsToPosts, users, type SchemaUser } from "../schemas/drizzleSchema"
import db from "./database"
import type { User } from "@supabase/supabase-js"

export async function getPosts() {
	const database = db()
	const posts = await database.query.posts.findMany()
	return posts
}

export async function getTags() {
	const database = db()
	return await database.query.tags.findMany()
}

export async function getTagPostPairs() {
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
		error(400, "error inserting")
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

export async function insertTagToPost(postId: number, tagId: number) {
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

export async function findUserById(id: string) {
	const database = db()
	return await database.query.users.findFirst({
		where: eq(users.uuid, id)
	})
}

export async function createNewUser(user: User) {
	const database = db()
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
}
