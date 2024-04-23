import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"Cache-Control": `max-age=0, s-maxage=${60 * 60}`
	})
}
