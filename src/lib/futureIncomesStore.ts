// src/lib/futureIncomesStore.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';  // Import `browser` from SvelteKit environment

// Initialize futureIncomes from localStorage if in the browser, otherwise default to an empty array
export const futureIncomes = writable(
  browser ? JSON.parse(localStorage.getItem('futureIncomes') || '[]') : []
);

// Subscribe to futureIncomes changes and update localStorage only in the browser
futureIncomes.subscribe((value) => {
  if (browser) {
    localStorage.setItem('futureIncomes', JSON.stringify(value));  // Update futureIncomes in localStorage
  }
});

// Clear function for resetting futureIncomes
export function clearFutureIncomes() {
  futureIncomes.set([]); // Reset futureIncomes to an empty array
  if (browser) {
    localStorage.removeItem('futureIncomes'); // Clear from localStorage
  }
}
