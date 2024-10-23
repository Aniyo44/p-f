<script lang="ts">
import { balance,history } from "$lib/store";

let amount = 0
let description=''
let tag =''
function subtractFromBalance() {
    const transactionAmount = Number(amount);

    // Check if the amount is greater than 0
    if (transactionAmount <= 0) {
        console.log("Please enter a valid positive amount.");
        return;
    }
    if (!tag.trim()) {
        console.log("Please enter a tag for the expense.");
        return;
    }

    const currentBalance = $balance - transactionAmount; // Calculate the new balance

    const transaction = {
        id: Date.now(), // Generate a unique ID for the transaction
        type: 'expense',
        amount: transactionAmount,
        timestamp: new Date().toLocaleString(),
        newBalance: currentBalance,
        desc: description || '',
        tag:tag.trim()


    };

    balance.set(currentBalance); // Update balance
    history.update(history => [...history, transaction]);
    
    console.log(transaction);
    
    amount = 0;
    description=''
    tag=''
}


</script>

<h2> Balance: {$balance}</h2>
<input type="number" bind:value={amount} placeholder="enter amount to subtract" />
<input type="text" bind:value={description} placeholder="Description (optional)" />
<input type="text" bind:value={tag} placeholder="expense tag" />


<button on:click={subtractFromBalance} > Subtract From Balance</button>

<h1>expenses page</h1>
<ul>
    {#each $history as entry (entry.timestamp)}
    {#if entry.type === 'expense'}
    <li>
        {entry.timestamp} - Expense: ${entry.amount}, Category: {entry.tag}
    </li>
{/if}
    {/each}
</ul>