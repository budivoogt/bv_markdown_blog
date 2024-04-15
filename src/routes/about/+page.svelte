<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import Project from "$lib/components/projectList/Project.svelte"
	import ProjectList from "$lib/components/projectList/ProjectList.svelte"

	const title = "About"
	const description =
		"A brief history about my journey from music entrepreneurship to angel investing, crypto and coding."
</script>

<SeoComponent data={{ title, description }} />

<hgroup class="space-y-4">
	<PageHeader text="A long story, short" />
	<p class="prose">
		Over the past decade I built multiple music businesses. It began by managing my friends in
		university. Then we added record labels, publishing and education companies. It was an
		intense and educational ride where I learned how to operate. In 2022 we were acquired,
		allowing me to pursue other goals.
		<br /><br />
		I then built a job board for the music industry and dove into the world of crypto and venture
		capital. I founded a crypto DAO and angel investment syndicate for Media Tech and Future of Work.
		After 10 investments I realized that while supporting founders is cool, it's distant from building
		and taking an idea from zero to one. That's what I love most.
		<br /><br />
		That's why I'm going to build a new business. I'll bootstrap it and want it to be more scalable
		than anything I've done before. I've learned to code to make this happen. I'm now working with
		SvelteKit, a full-stack framework (which I built this blog with). This is my public declaration.
		<a href="https://x.com/0x_brucey" target="_blank" class="hover:decoration-orange-500"
			>Follow along?</a
		>
	</p>
</hgroup>

<div class="my-8">
	<h3 class="text-xl">Projects</h3>
	<ProjectList>
		<Project
			link="https://striking.markets/"
			name="Striking Markets"
			description="Angel syndicate for media tech and future of work"
		/>
		<Project
			link="https://www.deusexdao.com/"
			name="Deus Ex DAO"
			description="Crypto advisory and angel syndicate"
		/>
		<Project
			link="http://musiccareers.co"
			name="MusicCareers"
			description="Music industry job board"
			acquired="(Acquired)"
		/>
		<Project
			name="bitbird"
			description="Record label, publishing, merchandising"
			link="https://bitbirdofficial.com/"
			acquired="(Exited)"
		/>
		<Project name="Heroic Academy" description="Music industry educational platform" />
		<Project
			name="Heroic"
			description="Artist management, record label, publishing"
			link="https://heroicrecordings.com/"
			acquired="(Acquired)"
		/>
	</ProjectList>
</div>
