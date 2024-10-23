// src/lib/futureBillsStore.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';  // Import `browser` from SvelteKit environment

// Initialize futureBills from localStorage if in the browser, otherwise default to an empty array
export const futureBills = writable(
  browser ? JSON.parse(localStorage.getItem('futureBills') || '[]') : []
);

// Subscribe to futureBills changes and update localStorage only in the browser
futureBills.subscribe((value) => {
  if (browser) {
    localStorage.setItem('futureBills', JSON.stringify(value));  // Update futureBills in localStorage
  }
});

// Clear function for resetting futureBills
export function clearFutureBills() {
  futureBills.set([]); // Reset futureBills to an empty array
  if (browser) {
    localStorage.removeItem('futureBills'); // Clear from localStorage
  }
}
