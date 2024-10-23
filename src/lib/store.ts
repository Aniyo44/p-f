// src/lib/store.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; 

export const balance = writable(
  browser ? parseFloat(localStorage.getItem('balance') || '0') : 0
);
export const history = writable(
  browser ? JSON.parse(localStorage.getItem('history') || '[]') : []
);

balance.subscribe((value) => {
  if (browser) {
    localStorage.setItem('balance', String(value)); 
  }
});
history.subscribe((value) => {
  if (browser) {
    localStorage.setItem('history', JSON.stringify(value)); 
  }
});

// Clear function for resetting balance and history
export function clearAllData() {
  balance.set(0); // Reset balance to 0
  history.set([]); // Clear transaction history
  if (browser) {
    localStorage.removeItem('balance'); // Clear from localStorage
    localStorage.removeItem('history'); // Clear from localStorage
  }
}
