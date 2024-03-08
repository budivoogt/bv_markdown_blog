import { z } from "zod"

export const formSchema = z.object({
	title: z.string().min(1).max(60),
	description: z.string().min(1).max(160),
	body: z.string().min(1),
	tags: z.string().array().optional()
})

export type FormSchema = typeof formSchema
