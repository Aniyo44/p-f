<script lang="ts">
import { balance } from "$lib/store";

let amount = 0
function subtractFromBalance(){
    balance.update(currentBalance => currentBalance - Number(amount))
    amount=0 
}


</script>

<h2> Balance: {$balance}</h2>
<input type="number" bind:value={amount} placeholder="enter amount to subtract" />
<button on:click={subtractFromBalance} > Subtract From Balance</button>

<h1>expenses page</h1>