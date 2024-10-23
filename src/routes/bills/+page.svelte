<script lang="ts">
    import DateTime from "../../components/DateTime.svelte";
    import ExchangeRate from "../../components/exchangeRate.svelte";
    import { balance, history } from "$lib/store";
    import { futureBills } from "$lib/futureBillsStore"; // Import the future bills store

    let amount: number = 0;
    let description: string = '';
    let selectedDay: string = '';

    function subtractFromBalance() {
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
        const transactionId = Date.now(); // Generate a unique ID based on current timestamp

        if (currentDate.getDate() === transactionDate.getDate()) {
            const currentBalance = $balance;
            const transaction = {
                id: Date.now(), // Generate a unique ID for the transaction
                type: 'bill',
                amount: transactionAmount,
                timestamp: `${transactionDate.getDate()}/${transactionDate.getMonth() + 1}`,
                newBalance: currentBalance - transactionAmount,
                desc: description || '',
            };

            balance.update(currentBalance => {
                const newBalance = currentBalance - transactionAmount;
                console.log(`Balance updated: ${currentBalance} - ${transactionAmount} = ${newBalance}`);
                return newBalance;
            });

            history.update(history => [...history, transaction]);

            amount = 0;
            description = '';
            selectedDay = '';
        } else {
            // Add future bill to the store
            futureBills.update(currentBills => [
                ...currentBills,
                {
                    type: 'bill',
                    amount: transactionAmount,
                    date: `${day}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
                    desc: description || '',
                },
            ]);

            console.log("Future bill recorded.");
        }
    }

    function checkFutureBills() {
        const currentDate = new Date();
        const todayString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        futureBills.update(currentBills => {
            return currentBills.filter((bill) => {
                if (bill.date === todayString) {
                    const currentBalance = $balance;

                    const transaction = {
                        type: 'bill',
                        amount: bill.amount,
                        timestamp: todayString,
                        newBalance: currentBalance - bill.amount,
                        desc: bill.desc,
                    };

                    history.update(history => [...history, transaction]);
                    balance.update(currentBalance => currentBalance - bill.amount);

                    console.log(`Future bill subtracted from balance: ${bill.amount}`);
                    return false; // Remove this bill from futureBills after adding it to the history
                }
                return true; // Keep future bill if the date doesn't match today
            });
        });
    }

    checkFutureBills();
</script>

<h2>Balance: {$balance}</h2>
<input type="number" bind:value={amount} placeholder="Enter bill to subtract" />
<input type="number" bind:value={selectedDay} placeholder="Enter day (1-31)" min="1" max="31" />
<input type="text" bind:value={description} placeholder="Description (optional)" />
<button on:click={subtractFromBalance}>Subtract From Balance</button>

<h3>Today's Bills</h3>
<ul>
    {#each $history as entry, index (entry.timestamp + index)}
        {#if entry.type === 'bill'}
            <li>
                {entry.timestamp} - Bill: $-{entry.amount}, Description: {entry.desc}
            </li>
        {/if}
    {/each}
</ul>

<h3>Future Bills</h3>
<ul>
    {#each $futureBills as futureBill, index (futureBill.date + index)}
        <li>
            {futureBill.date} - Future Bill: $-{futureBill.amount}, Description: {futureBill.desc}
        </li>
    {/each}
</ul>
