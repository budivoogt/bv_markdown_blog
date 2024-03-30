import { z } from "zod"

export const formSchema = z.object({
	title: z.string().min(1).max(60).trim(),
	description: z.string().min(1).max(160).trim(),
	body: z.string().min(1),
	tags: z.string().array().optional(),
	slug: z
		.string()
		.min(1)
		.max(50)
		.refine((value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value), {
			message:
				"Invalid slug format. Slugs can only contain lowercase letters, numbers, and hyphens."
		})
})

export type FormSchema = typeof formSchema
