import { siteDescription, siteTitle } from "$lib/utils/config"
import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
	return {
		title: siteTitle,
		description: siteDescription
	}
}
