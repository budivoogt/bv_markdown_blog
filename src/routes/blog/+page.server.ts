export function load({ setHeaders }) {
	setHeaders({
		"Cache-Control": `max-age=0, s-maxage=${60 * 60}`
	})
	return {}
}
