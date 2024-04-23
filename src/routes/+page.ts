import { siteDescription, siteTitle } from "$lib/utils/config"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ setHeaders }) => {
	setHeaders({
		"Cache-Control": `max-age=0, s-maxage=${60}`
	})

	return {
		title: siteTitle,
		description: siteDescription
	}
}
