import { clsx, type ClassValue } from "clsx"
import { cubicOut } from "svelte/easing"
import type { TransitionConfig } from "svelte/transition"
import { twMerge } from "tailwind-merge"

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

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"]
type DateStyle2 = Intl.DateTimeFormatOptions

export function formatDate(
	date: string | Date,
	dateStyle: DateStyle2 = {
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
