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
		For the past decade, I was a music entrepreneur. I began managing my friends in university.
		Then I built record label, publishing and education companies. We developed artists from
		bedroom producers to performing globally at festivals like Coachella. We generated millions
		of streams. It was a marvelous journey, teaching me how to lead, operate and sell. In 2022
		we were acquired, allowing me to pursue my interests beyond music.
		<br /><br />
		I then built and sold a music industry job board. And dove into the world of crypto and venture
		capital. I founded a crypto DAO and angel investment syndicate for Media Tech and Future of Work.
		After 10 investments I realized that while supporting founders is cool, it's not as enjoyable
		to me as taking something from zero to one.
		<br /><br />
		That's why I want to build a new business. Something bootstrapped and scalable. I'm learning
		to code to be better equipped to build it. I'm working with SvelteKit, a full-stack framework
		I love. This blog is made with it. I'm sharing what I learn along the way here and
		<a
			href="https://x.com/0x_brucey"
			aria-label="Visit my X profile"
			target="_blank"
			class="hover:decoration-orange-500">on X</a
		>.
		<br /><br />
		Always happy to connect with other builders. Reach me via mail (guess the address 🕵️‍♀️) or
		<a
			href="https://dm.new/budi"
			aria-label="Send me a DM on X"
			target="_blank"
			class="hover:decoration-orange-500">DM</a
		>.
	</p>
</hgroup>

<div class="my-8">
	<h3 class="text-xl">Projects</h3>
	<ProjectList>
		<Project
			link={{ href: "https://striking.markets/", label: "Visit Striking Markets website" }}
			name="Striking Markets"
			description="Angel syndicate for media tech and future of work"
		/>
		<Project
			link={{ href: "https://www.deusexdao.com/", label: "Visit Deus Ex DAO website" }}
			name="Deus Ex DAO"
			description="Crypto advisory and angel syndicate"
		/>
		<Project
			link={{ href: "http://musiccareers.co", label: "Visit MusicCareers website" }}
			name="MusicCareers"
			description="Music industry job board"
			acquired="(Acquired)"
		/>
		<Project
			link={{ href: "https://bitbirdofficial.com/", label: "Visit bitbird website" }}
			name="bitbird"
			description="Record label, publishing, merchandising"
			acquired="(Exited)"
		/>
		<Project name="Heroic Academy" description="Visit Heroic Academy website" />
		<Project
			name="The SoundCloud Bible"
			description="Book about SoundCloud and music marketing"
		/>
		<Project
			link={{ href: "https://heroicrecordings.com/", label: "Visit Heroic website" }}
			name="Heroic"
			description="Artist management, record label, publishing"
			acquired="(Acquired)"
		/>
	</ProjectList>
</div>
