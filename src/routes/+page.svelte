<script>
    import DateTime from "../components/DateTime.svelte";
    import ExchangeRate from "../components/exchangeRate.svelte";
    import { balance,history } from "$lib/store";
    import { clearAllData } from "$lib/store";
    import { clearFutureBills } from "$lib/futureBillsStore";
    import { clearFutureIncomes } from "$lib/futureIncomesStore";
    let amount = 0 
    let description = '';

    function handleReset() {
        clearAllData(); // Call the clear function to reset data
        clearFutureBills()
        clearFutureIncomes()
        console.log("All data has been reset.");
    }
    function addToBalance() {
    const transactionAmount = Number(amount);
    
    // Check if the amount is greater than 0
    if (transactionAmount <= 0) {
        console.log("Please enter a valid positive amount.");
        return;
    }

    const currentBalance = $balance;
    const transaction = {
        id: Date.now(), // Generate a unique ID for the transaction
        type: 'add',
        amount: transactionAmount,
        timestamp: new Date().toLocaleString(),
        newBalance: currentBalance + transactionAmount,
        desc: description || '',
    };

    balance.update(currentBalance => currentBalance + transactionAmount);
    history.update(history => [...history, transaction]);

    amount = 0;
    description = '';
}
    



</script>
<div class="flex justify-center items-center flex-col">
<h1 class="text-blue-500"> my personal finance app  </h1>
<h2>Balance: {$balance} </h2>
<input type="number" bind:value={amount} placeholder="enter amount to add" />
<input type="text" bind:value={description} placeholder="Description (optional)" />

<button on:click={addToBalance}> Add To Balance</button>
<DateTime />
<ExchangeRate />
<button on:click={handleReset}>Reset</button>

</div>

<!-- bills and income should have the same exact funct execept one will add ,the other will subtract ,should they have their own funct ?
 or should i use global subtract and add fucntion that is just triigred by time  -->