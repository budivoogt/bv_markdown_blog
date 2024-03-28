import { error } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import { posts, tags, tagsToPosts } from "../schemas/drizzleSchema"
import db from "./database"

export async function insertPost(data, matchedUser) {
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
