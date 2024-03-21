<script lang="ts">
	import GlobalNav from '$lib/components/GlobalNav.svelte';
	import '../app.pcss';
</script>

<div class="mx-auto w-full max-w-[35rem]">
	<div class="mx-6">
		<slot />
	</div>
</div>

<GlobalNav />
