<script>
	import { onMount } from 'svelte';

	let currentTime = new Date();

	// Automatically update the date and time every second
	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="datetime">
	{String(currentTime.getDate()).padStart(2, '0')}/{String(currentTime.getMonth() + 1).padStart(2, '0')}/{String(currentTime.getFullYear()).slice(-2)} 
	- {String(currentTime.getHours()).padStart(2, '0')}:{String(currentTime.getMinutes()).padStart(2, '0')}
</div>