<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import Project from "$lib/components/projectList/Project.svelte"
	import ProjectList from "$lib/components/projectList/ProjectList.svelte"

	const title = "About"
	const description = "Learn how I went from music industry founder to indie web developer."
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
		That's why I'm going to build a new business. I'll bootstrap it and it should be more scalable
		than anything I have done before. I began coding in 2023 to make this more viable. I'm now working
		with SvelteKit, a full-stack framework. This is my public declaration. Think I'll make it happen?

		<br /><br />
	</p>
</hgroup>

<div class="prose mt-8">
	<h3>Projects</h3>
</div>

<ProjectList>
	<Project
		link="https://striking.markets/"
		name="Striking Markets"
		description="Angel investment syndicate focused on media tech and future of work"
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
