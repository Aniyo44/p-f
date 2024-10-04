<script lang="ts">
	import { onMount } from 'svelte';

	let exchangeRate :number |null= null;
	let error : string | null = null; 

	// Fetch the exchange rate from an API
	const fetchExchangeRate = async () => {
		try {
			const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
			const data = await response.json();
			exchangeRate = data.rates.TND; // Get the exchange rate for TND
		} catch (err) {
			error = '?_?';
            console.log("Failed to fetch exchange rate ")
			console.error(err);
		}
	};

	onMount(() => {
		fetchExchangeRate();
	});
</script>

<div class="exchange-rate">
	{#if error}
		<p>{error}</p>
	{:else if exchangeRate}
		<p>1 USD = {exchangeRate.toFixed(3)} TND</p>
	{:else}
		<p>Loading exchange rate...</p>
	{/if}
</div>