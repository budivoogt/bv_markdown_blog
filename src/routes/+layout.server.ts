import { tagsPerPost as findTagsPerPost, sortPostsDesc } from "$lib/client/postHelpers"
import { getAllTagPostPairs, getPosts, getTags } from "$lib/server/postDatabaseHelpers"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { getSession, isBudiAuthenticated } }) => {
	const postRows = await getPosts()
	const postsSortedDesc = sortPostsDesc(postRows)

	const tagRows = await getTags()
	const postTags = await getAllTagPostPairs()
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
