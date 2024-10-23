<script lang="ts">
    import DateTime from "../../components/DateTime.svelte";
    import ExchangeRate from "../../components/exchangeRate.svelte";
    import { balance, history } from "$lib/store";
    import { futureIncomes } from "$lib/futureIncomesStore"; // Import the future incomes store

    let amount: number = 0;
    let description: string = '';
    let selectedDay: string = '';

    function addToBalance() {
        const transactionAmount = Number(amount);

        if (transactionAmount <= 0) {
            console.log("Please enter a valid positive amount.");
            return;
        }

        const day = parseInt(selectedDay);

        if (isNaN(day) || day < 1 || day > 31) {
            console.log("Please select a valid day (1-31).");
            return;
        }

        const currentDate = new Date();
        const transactionDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        if (currentDate.getDate() === transactionDate.getDate()) {
            const currentBalance = $balance;
            const transaction = {
                id: Date.now(), // Generate a unique ID for the transaction
                type: 'income',
                amount: transactionAmount,
                timestamp: `${transactionDate.getDate()}/${transactionDate.getMonth() + 1}`,
                newBalance: currentBalance + transactionAmount,
                desc: description || '',
            };

            balance.update(currentBalance => {
                const newBalance = currentBalance + transactionAmount;
                console.log(`Balance updated: ${currentBalance} + ${transactionAmount} = ${newBalance}`);
                return newBalance;
            });

            history.update(history => [...history, transaction]);

            amount = 0;
            description = '';
            selectedDay = '';
        } else {
            // Add future income to the store
            futureIncomes.update(currentIncomes => [
                ...currentIncomes,
                {
                    id: Date.now(), // Generate a unique ID for the transaction
                    type: 'income',
                    amount: transactionAmount,
                    date: `${day}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
                    desc: description || '',
                },
            ]);

            console.log("Future income recorded.");
        }
    }

    function checkFutureIncomes() {
        const currentDate = new Date();
        const todayString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        futureIncomes.update(currentIncomes => {
            return currentIncomes.filter((income) => {
                if (income.date === todayString) {
                    const currentBalance = $balance;

                    const transaction = {
                        id: Date.now(), // Generate a unique ID for the transaction
                        type: 'income',
                        amount: income.amount,
                        timestamp: todayString,
                        newBalance: currentBalance + income.amount,
                        desc: income.desc,
                    };

                    history.update(history => [...history, transaction]);
                    balance.update(currentBalance => currentBalance + income.amount);

                    console.log(`Future income added to balance: ${income.amount}`);
                    return false; // Remove this income from futureIncomes after adding it to the history
                }
                return true; // Keep future income if the date doesn't match today
            });
        });
    }

    checkFutureIncomes();
</script>

<h2>Balance: {$balance}</h2>
<input type="number" bind:value={amount} placeholder="Enter income to add" />
<input type="number" bind:value={selectedDay} placeholder="Enter day (1-31)" min="1" max="31" />
<input type="text" bind:value={description} placeholder="Description (optional)" />
<button on:click={addToBalance}>Add To Balance</button>

<h3>Today's Income</h3>
<ul>
    {#each $history as entry, index (entry.timestamp + index)}
        {#if entry.type === 'income'}
            <li>
                {entry.timestamp} - Income: ${entry.amount}, Description: {entry.desc}
            </li>
        {/if}
    {/each}
</ul>

<h3>Future Incomes</h3>
<ul>
    {#each $futureIncomes as futureIncome, index (futureIncome.date + index)}
        <li>
            {futureIncome.date} - Future Income: ${futureIncome.amount}, Description: {futureIncome.desc}
        </li>
    {/each}
</ul>
