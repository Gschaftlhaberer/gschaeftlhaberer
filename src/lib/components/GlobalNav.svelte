<script>
	import { BottomNav, BottomNavItem, DarkMode } from 'flowbite-svelte';
	import HomeSolid from '~icons/flowbite/home-solid';
	import AdjustmentsVerticalOutline from '~icons/flowbite/adjustments-vertical-outline';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<BottomNav {activeUrl} position="absolute" classInner="grid-cols-3">
  <BottomNavItem btnName="Home" href="/">
    <HomeSolid />
  </BottomNavItem>
  <BottomNavItem btnName="Settings" href="/settings" exact={false}>
    <AdjustmentsVerticalOutline />
  </BottomNavItem>
  <BottomNavItem btnName="Dark Mode">
	<DarkMode btnClass="" />
  </BottomNavItem>
</BottomNav>