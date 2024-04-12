<script>
	import { BottomNav, BottomNavItem, DarkMode } from 'flowbite-svelte';
	import HomeSolid from '~icons/flowbite/home-solid';
	import AdjustmentsVerticalOutline from '~icons/flowbite/adjustments-vertical-outline';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;

	const svgClass =
		'mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500';
	const svgActiveClass =
		'mb-1 h-5 w-5 text-primary-700 group-hover:text-primary-600 dark:text-primary-700 dark:group-hover:text-primary-500';
</script>

<BottomNav {activeUrl} position="absolute" classInner="grid-cols-3">
	<BottomNavItem btnName="Home" href="/">
		<HomeSolid class={activeUrl === '/' ? svgActiveClass : svgClass} />
	</BottomNavItem>
	<BottomNavItem btnName="Settings" href="/settings" exact={false}>
		<AdjustmentsVerticalOutline
			class={activeUrl.startsWith('/settings') ? svgActiveClass : svgClass}
		/>
	</BottomNavItem>

	<DarkMode
		size="md"
		btnClass="group flex items-center justify-center rounded-none text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800"
	/>
	<!-- <BottomNavItem btnName="Dark Mode">
	</BottomNavItem> -->
</BottomNav>
