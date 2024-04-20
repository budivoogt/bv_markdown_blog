import { dev } from "$app/environment"
import { PUBLIC_CANONICAL_ORIGIN, PUBLIC_DEV_URL } from "$env/static/public"
import { clsx, type ClassValue } from "clsx"
import { cubicOut } from "svelte/easing"
import type { TransitionConfig } from "svelte/transition"
import { twMerge } from "tailwind-merge"
import type { MarkdownPost } from "./types/types"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type FlyAndScaleParams = {
	y?: number
	x?: number
	start?: number
	duration?: number
}

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node)
	const transform = style.transform === "none" ? "" : style.transform

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA
		const [minB, maxB] = scaleB

		const percentage = (valueA - minA) / (maxA - minA)
		const valueB = percentage * (maxB - minB) + minB

		return valueB
	}

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str
			return str + `${key}:${style[key]};`
		}, "")
	}

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0])
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0])
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1])

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			})
		},
		easing: cubicOut
	}
}

export function capitalizer(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatDate(
	date: string | Date,
	dateStyle: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	},
	locales: string = "en-US"
) {
	const dateToFormat = typeof date === "string" ? new Date(date.replaceAll("-", "/")) : date
	const dateFormatter = new Intl.DateTimeFormat(locales, dateStyle)
	return dateFormatter.format(dateToFormat)
}

export function decorate(title: string) {
	return `${title} - Budi Voogt`
}

export function getRootURL() {
	return new URL(dev ? PUBLIC_DEV_URL : PUBLIC_CANONICAL_ORIGIN).href
}

export function getURLhref(path: string, url?: string) {
	if (!url) url = getRootURL()
	return new URL(path, url).href
}

export function createSitemapEntry({
	post,
	page,
	pageLastMod,
	url
}: {
	post?: MarkdownPost
	page?: string
	pageLastMod?: string
	url?: string
}) {
	if (!url) url = getRootURL()

	if (page)
		return `
                <url>
                    <loc>${getURLhref(page, url)}</loc>
					${pageLastMod ? `<lastmod>${pageLastMod}</lastmod>` : ``}
                </url>
                `

	if (post)
		return `
            <url>
              <loc>${getURLhref(`blog/${post.slug}`, url)}</loc>
              <lastmod>${post.lastmod || post.date}</lastmod>
            </url>
            `
}

export function createRSSEntry(post: MarkdownPost, url?: string) {
	if (!url) url = getRootURL()
	const href = getURLhref(`blog/${post.slug}`, url)

	return `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${href}</link>
							<guid isPermaLink="true">${href}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
}
