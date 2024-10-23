<script>
    import DateTime from "../../components/DateTime.svelte";
    import ExchangeRate from "../../components/exchangeRate.svelte";
    import { balance, history } from "$lib/store";

    let amount = 0;
    let description = '';
    let selectedDate = ''; // Keep it as an empty string

    function addToBalance() {
        const transactionAmount = Number(amount);

        // Check if the amount is greater than 0
        if (transactionAmount <= 0) {
            console.log("Please enter a valid positive amount.");
            return;
        }

        // Ensure a date is selected
        if (!selectedDate) {
            console.log("Please select a date.");
            return;
        }

        const transactionDate = new Date(selectedDate); // Convert selected date to a Date object
        const currentDate = new Date(); // Get the current date

        // Log the income amount
        console.log(`Income Amount: ${transactionAmount}`);

        // Check if the selected date is the same as the current day
        if (currentDate.getFullYear() === transactionDate.getFullYear() && 
            currentDate.getMonth() === transactionDate.getMonth() && 
            currentDate.getDate() === transactionDate.getDate()) {
            
            const currentBalance = $balance;
            const transaction = {
                id: Date.now(), // Generate a unique ID for the transaction
                type: 'add',
                amount: transactionAmount,
                timestamp: new Date().toLocaleString(),
                newBalance: currentBalance + transactionAmount,
                desc: description || '',
            };

            balance.update(currentBalance => {
                const newBalance = currentBalance + transactionAmount;
                console.log(`Balance updated: ${currentBalance} + ${transactionAmount} = ${newBalance}`);
                return newBalance;
            });
            history.update(history => [...history, transaction]);

            // Reset input fields
            amount = 0;
            description = '';
            selectedDate = '';
        } else {
            console.log("The selected date is not today. Waiting for the specified date to add to the balance.");
        }
    }

    // Reactive statements to filter income and future transactions
    $: incomeTransactions = $history.filter(entry => entry.type === 'add');
    $: futureTransactions = $history.filter(entry => new Date(entry.timestamp) > new Date());
</script>

<h2>Balance: {$balance}</h2>
<input type="number" bind:value={amount} placeholder="Enter income to add" />
<input type="date" bind:value={selectedDate} placeholder="Select date" />
<input type="text" bind:value={description} placeholder="Description (optional)" />
<button on:click={addToBalance}>Add To Balance</button>

<div class="flex justify-center items-center flex-col">
    <h1>History of Transactions</h1>
    <h2>Transaction History:</h2>
    <ul>
        {#each $history as entry}
            <li>
                {entry.timestamp} - 
                {entry.type === 'expense' 
                    ? `Expense: $${entry.amount}, New Balance: $${entry.newBalance}` 
                    : `Added: $${entry.amount}, New Balance: $${entry.newBalance}`}
            </li>
        {/each}
    </ul>

    

    
</div>
