<script>
    import DateTime from "../components/DateTime.svelte";
    import ExchangeRate from "../components/exchangeRate.svelte";
    import { balance } from "$lib/store";
    let amount = 0 
    function addToBalance (){
        balance.update(currentBalance => currentBalance + Number(amount))
        amount=0 
    }



</script>

<h1 class="text-blue-500"> my personal finance app  </h1>
<h2>Balance: {$balance} </h2>
<input type="number" bind:value={amount} placeholder="enter amount to add" />
<button on:click={addToBalance}> Add To Balance</button>
<DateTime />
<ExchangeRate />