import { z } from "zod"

// // Need to use `as const` to define the enum values as a tuple of strings
// export const tags = ["journal", "investing", "build-in-public", "coding"] as const

// export type Tag = typeof tags

export const formSchema = z.object({
	title: z.string().min(1).max(60),
	description: z.string().min(1).max(160),
	body: z.string().min(1),
	tag: z.string().min(1, "Must select a tag")
})

export type FormSchema = typeof formSchema
