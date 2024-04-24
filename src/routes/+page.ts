import { siteDescription, siteTitle } from "$lib/utils/config"

export async function load({ setHeaders }) {
	setHeaders({
		"Cache-Control": `max-age=0, s-maxage=${60}`
	})

	return {
		title: siteTitle,
		description: siteDescription
	}
}
