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
		For the past decade, I was a music industry entrepreneur. It began with managing my friends
		in university and evolved into record label, publishing and education businesses. We managed
		artists who went from bedroom producers to international touring fame, performing at famous
		festivals like Coachella and generating millions of streams. It was a marvelous journey,
		teaching me how to lead, operate and sell. In 2022 we were acquired and I exited my music
		ventures to do something new.
		<br /><br />
		I then built and sold a job board for the music industry and dove into the world of crypto and
		venture capital. I founded a crypto DAO and angel investment syndicate for Media Tech and Future
		of Work. After 10 investments I realized that while supporting founders is cool, it's not as
		enjoyable to me as taking something from zero to one.
		<br /><br />
		That's why I want to build a new business. Bootstrapped and scalable. I'm learning to code to
		be able to build MVPs. I expect it's going to take multiple tries to get traction, since I need
		to match the complexity of the idea with my coding skills. I'm working with the SvelteKit full-stack
		framework (with which I made this blog). I'm sharing what I learn along the way here and
		<a href="https://x.com/0x_brucey" target="_blank" class="hover:decoration-orange-500"
			>on X</a
		>.
		<br /><br />
		Reach me via mail (guess the address 🕵️‍♀️) or
		<a href="https://dm.new/budi" target="_blank" class="hover:decoration-orange-500">X DM</a>.
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
		<Project name="Heroic Academy" description="Music industry education platform" />
		<Project
			name="The SoundCloud Bible"
			description="Book about SoundCloud and music marketing"
		/>
		<Project
			name="Heroic"
			description="Artist management, record label, publishing"
			link="https://heroicrecordings.com/"
			acquired="(Acquired)"
		/>
	</ProjectList>
</div>
