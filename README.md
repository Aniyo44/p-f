personal-finance 


~~projected balance to be added (trigged by income or bills) ~~ kinda uslesss

negative balance is a thing 

~~after the new month start refresh~~ 

expenses have immediate change to the balance but  bills ,income  wait for  their transctions date 




#to do later 
home page timeline + monthly thing 
add to local storage 
test fucnt 
test all 



the pop ups should not accept negative value 



#
reset code for balance 

 function resetBalance() {
        if (confirm("Are you sure you want to reset the balance to 0?")) {
            balance.set(0);  // Reset balance to 0
        }
    }

    <button on:click={resetBalance}>Reset Balance</button>



function resetBalance() {
        if (confirm("Are you sure you want to reset the balance to 0?")) {
            const transaction = {
                type: 'reset',
                timestamp: new Date().toLocaleString(),
            };

            balance.set(0);  // Reset balance to 0
            history.update(history => [...history, transaction]);
        }
    }



make card type to ask user how much are they gonna add or subtract a card 
once he click add to the balance or add expenses or bill or income 
 the sum a number 
 an optional description 
 type (if clicked on home page it's balance type, it's income it's income it)
 tag (empty in all expecet in expenses)
    rewwrite the fucntion subtract 
    it should accept propos (type = either expenses or bills)
    also should have an optional varabile which is tag( avaiable in expenses)
    the fucntion should fire immedilty but when a an other optional varaible (this time related to expenses)is not empty instead a date the fucntion should wait the date 
    the same logic should applied to add fucntion with (add to balance and income)





    *add 
    save date of transtion to history -
    save type 
    save desc (optional)
    calclute the balance (if it's has date like income does wait until that date to add it) ~
    save new balance -

    *subtract

    save date of transtion to history - 
    save type 
    save desc(optional) 
    save tag (only if it's expenses)
    calclute the balance (if it's has date like bills does wait until that date to add it)  ~
    save new balance   -


gonna make spreate functions to each page later on optimzied 



bug at expenses .
lockdown-install.js:1 Removing unpermitted intrinsics
root.svelte:47 [HMR][Svelte] Unrecoverable HMR error in <+page>: next update will trigger a full reload
overrideMethod @ hook.js:608
logError @ proxy.js?v=1aad7280:15
Proxy<+page> @ proxy.js?v=1aad7280:380
construct_svelte_component_dev @ chunk-DCE4O3CF.js?v=1aad7280:2571
update @ root.svelte:47
update_slot_base @ chunk-DCE4O3CF.js?v=1aad7280:126
update @ +layout.svelte:23
update @ chunk-DCE4O3CF.js?v=1aad7280:1323
flush @ chunk-DCE4O3CF.js?v=1aad7280:1290
Promise.then
schedule_update @ chunk-DCE4O3CF.js?v=1aad7280:1264
make_dirty @ chunk-DCE4O3CF.js?v=1aad7280:2108
(anonymous) @ chunk-DCE4O3CF.js?v=1aad7280:2143
$$self.$$set @ root.svelte:51
(anonymous) @ proxy.js?v=1aad7280:83
$set @ chunk-DCE4O3CF.js?v=1aad7280:2453
dest.<computed> @ proxy.js?v=1aad7280:46
navigate @ client.js?v=1aad7280:1401
await in navigate
(anonymous) @ client.js?v=1aad7280:2135
Show 15 more frames
Show lessUnderstand this error
chunk-DCE4O3CF.js?v=1aad7280:1820 Uncaught (in promise) Error: Cannot have duplicate keys in a keyed each: Keys at index 22 and 23 with value '23/10' are duplicates
    at validate_each_keys (chunk-DCE4O3CF.js?v=1aad7280:1820:13)
    at create_fragment (+page.svelte:56:46)
    at init (chunk-DCE4O3CF.js?v=1aad7280:2150:35)
    at new Page (+page.svelte:49:35)
    at createProxiedComponent (svelte-hooks.js?v=1aad7280:341:9)
    at new ProxyComponent (proxy.js?v=1aad7280:242:7)
    at new Proxy<+page> (proxy.js?v=1aad7280:349:11)
    at construct_svelte_component_dev (chunk-DCE4O3CF.js?v=1aad7280:2571:22)
    at Object.update [as p] (root.svelte:47:45)
    at update_slot_base (chunk-DCE4O3CF.js?v=1aad7280:126:10)


    i tried to fix by adding
        id: transactionId, // Add ID here
const transactionId = Date.now(); // Generate a unique ID based on current timestamp
to bills page 
but i end up with another bug 
Removing unpermitted intrinsics
root.svelte:47 [HMR][Svelte] Unrecoverable HMR error in <+page>: next update will trigger a full reload
overrideMethod @ hook.js:608
logError @ proxy.js?v=1aad7280:15
Proxy<+page> @ proxy.js?v=1aad7280:380
construct_svelte_component_dev @ chunk-DCE4O3CF.js?v=1aad7280:2571
update @ root.svelte:47
update_slot_base @ chunk-DCE4O3CF.js?v=1aad7280:126
update @ +layout.svelte:23
update @ chunk-DCE4O3CF.js?v=1aad7280:1323
flush @ chunk-DCE4O3CF.js?v=1aad7280:1290
Promise.then
schedule_update @ chunk-DCE4O3CF.js?v=1aad7280:1264
make_dirty @ chunk-DCE4O3CF.js?v=1aad7280:2108
(anonymous) @ chunk-DCE4O3CF.js?v=1aad7280:2143
$$self.$$set @ root.svelte:51
(anonymous) @ proxy.js?v=1aad7280:83
$set @ chunk-DCE4O3CF.js?v=1aad7280:2453
dest.<computed> @ proxy.js?v=1aad7280:46
navigate @ client.js?v=1aad7280:1401
await in navigate
(anonymous) @ client.js?v=1aad7280:2135
Show 15 more frames
Show lessUnderstand this error
chunk-DCE4O3CF.js?v=1aad7280:1820 Uncaught (in promise) Error: Cannot have duplicate keys in a keyed each: Keys at index 0 and 1 with value 'undefined' are duplicates
    at validate_each_keys (chunk-DCE4O3CF.js?v=1aad7280:1820:13)
    at create_fragment (+page.svelte:108:39)
    at init (chunk-DCE4O3CF.js?v=1aad7280:2150:35)
    at new Page (+page.svelte:103:43)
    at createProxiedComponent (svelte-hooks.js?v=1aad7280:341:9)
    at new ProxyComponent (proxy.js?v=1aad7280:242:7)
    at new Proxy<+page> (proxy.js?v=1aad7280:349:11)
    at construct_svelte_component_dev (chunk-DCE4O3CF.js?v=1aad7280:2571:22)
    at Object.update [as p] (root.svelte:47:45)
    at update_slot_base (chunk-DCE4O3CF.js?v=1aad7280:126:10)
    the whole app is bugged now ...