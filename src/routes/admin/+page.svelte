<script lang="ts">
	import { enhance } from "$app/forms"
	import { page } from "$app/stores"
</script>

<pre>
    {JSON.stringify($page.data, null, 2)}
</pre>

<h1 class="my-8 text-2xl">Welcome, {$page.data}</h1>

<form method="POST" action="?/login" class="flex flex-col items-start gap-1" use:enhance>
	<label for="email" class="flex flex-col"
		>Email
		<input name="email" type="email" placeholder="your@email.com" />
	</label>
	<label for="password" class="flex flex-col"
		>Password
		<input name="password" type="password" placeholder="your@email.com" />
	</label>
    <div class="flex flex-col items-baseline">
        <button>Login</button>
        <button formaction="?/signup">Create account</button>
    </div>
</form>
