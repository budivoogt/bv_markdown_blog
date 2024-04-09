import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
	return {
		title: "Budi Voogt",
		description:
			"Welcome to my blog. I'm an indie developer, entrepreneur and investor from The Netherlands."
	}
}
