import { tagsPerPost as findTagsPerPost, sortPostsDesc } from "$lib/client/dbPostHelpers"
import { getAllPostTagPairs, getAllPosts, getAllTags } from "$lib/server/dbPostHelpers"
import { getMDPosts } from "$lib/server/mdPostHelpers"

export async function load({ locals: { getSession, isBudiAuthenticated } }) {
	const postRows = await getAllPosts()
	const posts = sortPostsDesc(postRows)

	const tags = await getAllTags()
	const postTagPairs = await getAllPostTagPairs()
	const postTags = findTagsPerPost(postTagPairs)

	const session = await getSession()

	const mdPosts = await getMDPosts()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const returnObj: { [key: string]: any } = {
		posts,
		mdPosts,
		tags,
		postTags,
		session,
		isBudiAuthenticated
	}

	for (const key in returnObj) {
		if (!returnObj[key] && key !== "isBudiAuthenticated") {
			delete returnObj[key]
		}
	}

	return returnObj
}
