---
title: Code blocks
description: Checking how the code  blocks display using my MDsveX settings.
date: "2023-4-14"
categories:
    - sveltekit
    - svelte
published: true
---

# Header 1 example

Hey friends! 👋

Typescript code block:

```ts showLineNumbers title="typescript block" {2}
function greet(name: string) {
	console.log(`Hey ${name}! 👋`)
}
```

And this is just something between backticks `console.log(lol!)`.

A note[^1]

[^1]: Big note

https://striking.markets

www.budivoogt.com

budi@budivoogt.com

~~strikethrough~~

## Header 2 example

Here's a quote:

"The quote goes as such"

Here come two dashes -- how do they look?

Here's a Svelte code block:

```svelte title="PostList.svelte"
<script lang="ts">
	import { capitalizer, formatDate } from "$lib/utils"

	export let title, date, categories
</script>

<article>
	<hgroup class="space-y-3">
		<h1 class="mb-1 text-3xl">{capitalizer(title ?? "")}</h1>
		{#if date}
			<p class="text-sm font-light">{formatDate(date)}</p>
		{/if}
	</hgroup>
	<div class="mt-1 flex gap-x-2 border-b-2 border-neutral-400/10">
		{#if categories}
			{#each categories as category}
				<span class="rounded-sm">{category}</span>
			{/each}
		{/if}
	</div>
	<div class="prose prose-neutral mt-8">
		<slot />
	</div>
</article>
```

### Header 3

Here's some Javascript:

```js title="bananacake"
function greet(name) {
	console.log(`Hey ${name}! 👋`)
}
```

Does MSDVEX respect spaces in this Markdown?

For example if I write something like this, with single line breaks in between?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut dignissim ex, in vulputate mi. Curabitur nec mauris vitae mauris convallis varius. Integer tempor consequat mi, id interdum magna tempus vel. Quisque pharetra arcu nec vehicula sollicitudin. Nam semper sagittis lacus at efficitur. Fusce dictum interdum massa quis commodo. Cras commodo ut dui ut facilisis. Fusce nec aliquam erat. Ut consequat urna felis. In vehicula turpis et sem dignissim scelerisque. Duis at ex eget risus rutrum pharetra non et arcu. Praesent gravida a arcu nec pharetra. Fusce vitae dolor ac ex auctor interdum. Duis aliquam consectetur lorem ut varius.

Sed tempor iaculis nisl, sit amet lacinia libero pulvinar eu. Etiam malesuada sollicitudin nulla, et iaculis nibh aliquet et. Integer libero arcu, scelerisque in pellentesque id, consequat eget massa. Curabitur facilisis metus vitae turpis imperdiet, id mattis mi convallis. Aliquam vestibulum arcu et mi semper imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus blandit mauris sem, nec sagittis sapien gravida quis. Mauris varius tellus ut augue vestibulum, et tempus mi consectetur. Pellentesque vehicula tincidunt molestie. Vestibulum eget urna vitae lectus fermentum cursus at sed sem. Vestibulum eu leo tincidunt, condimentum urna at, egestas odio. Maecenas efficitur nulla tincidunt, porttitor felis et, maximus ex. Duis dictum efficitur risus, at fermentum odio volutpat at.

Praesent posuere tempor ultrices. Nunc lacinia, turpis sit amet posuere dictum, leo mauris ornare lacus, eget ultricies orci urna in tortor. Quisque varius viverra felis, ut sodales urna. Vivamus sit amet velit eu orci sodales suscipit. Duis commodo imperdiet justo vel malesuada. Proin sit amet mauris at tortor finibus ornare ac non nisi. Vivamus faucibus efficitur est, vel fermentum neque blandit a. Aenean finibus scelerisque ex, vestibulum ornare arcu. Nunc mollis, metus sed cursus faucibus, dolor nulla porttitor tortor, ac sodales dolor mi et massa. Donec nisi elit, egestas id scelerisque cursus, egestas id nulla. Vestibulum non malesuada velit. Suspendisse sit amet aliquet leo, eu maximus massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur et mauris condimentum, pulvinar diam eget, sollicitudin arcu. Praesent quis elit est. Praesent scelerisque nisi id commodo congue.

Mauris vel risus eget orci feugiat mollis. Etiam pulvinar leo lectus, ac ultricies lacus interdum in. Sed at fringilla metus. Duis consectetur enim quis posuere aliquam. Cras vitae justo dui. Morbi consectetur, nisi vitae ultricies tristique, ante mauris sodales nisi, a maximus magna purus vel sem. Duis posuere leo ut commodo vehicula. Nullam scelerisque sapien et maximus iaculis.

Praesent sit amet mauris elit. Duis risus odio, molestie quis elit ac, maximus mattis enim. Mauris sapien sapien, ullamcorper a sem et, commodo eleifend lorem. Integer id nisi consectetur quam fermentum fringilla. Nullam nec metus suscipit, faucibus mi ac, posuere dui. Fusce cursus neque ut dapibus consectetur. Duis vitae nisi turpis. Quisque non posuere mi, eu varius neque. Mauris egestas fermentum nulla, sed bibendum orci auctor et.
