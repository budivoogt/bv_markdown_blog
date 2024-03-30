import { deleteTagToPostPair } from "./postDatabaseHelpers"

async function run() {
	const deletedPair = await deleteTagToPostPair(273, 11)
	console.log("deleted pair: ", deletedPair)
}

run()

// findMany returns:
// pairs:  [ { tagId: 11, postId: 273 }, { tagId: 12, postId: 273 } ]
