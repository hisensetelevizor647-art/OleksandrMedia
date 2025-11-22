<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { theme } from "$lib/theme";
	import "../app.css";
	import SplashScreen from "$lib/components/SplashScreen.svelte";

	export const user = writable<any>(null);
	let showSplash = false;

	onMount(async () => {
		// Initialize theme
		const savedTheme = localStorage.getItem("theme") as "light" | "dark";
		if (savedTheme) {
			theme.set(savedTheme);
		}

		// Check splash screen
		const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
		if (!hasSeenSplash) {
			showSplash = true;
		}

		try {
			const res = await fetch("/api/auth/me");
			if (res.ok) {
				const data = await res.json();
				user.set(data.user);
			}
		} catch (e) {
			console.log("Not authenticated");
		}
	});
</script>

<slot />

{#if showSplash}
	<SplashScreen
		onComplete={() => {
			showSplash = false;
			sessionStorage.setItem("hasSeenSplash", "true");
		}}
	/>
{/if}
