import { tagsPerPost as findTagsPerPost, sortPostsDesc } from "$lib/client/postHelpers"
import { getAllPostTagPairs, getAllPosts, getAllTags } from "$lib/server/postDatabaseHelpers"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { getSession, isBudiAuthenticated } }) => {
	const postRows = await getAllPosts()
	const postsSortedDesc = sortPostsDesc(postRows)

	const tagRows = await getAllTags()
	const postTags = await getAllPostTagPairs()
	const postTagRows = findTagsPerPost(postTags)

	const session = await getSession()

	if (postsSortedDesc && tagRows && postTagRows) {
		return {
			posts: postsSortedDesc,
			tags: tagRows,
			postTags: postTagRows,
			session,
			isBudiAuthenticated
		}
	} else {
		return { posts: [], tags: [], postTags: [], session, isBudiAuthenticated }
	}
}
