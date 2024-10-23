<script>
    import { page } from "$app/stores";
    import "../tailwind.css";
  $: isHomePage= $page.url.pathname=== "/"
  </script>
  <nav class="flex flex-col">
    {#if isHomePage}
    <a href="/hot"> History Of Transction </a>
    <a href="/income"> Income </a>
    <a href="/expenses"> Expenses </a>
    <a href="/bills"> Bills </a>
    {:else}
    <a href="/">Return Home</a>
    {/if}
  </nav>
 
  <main>
  <slot />
</main>

  <footer>

  </footer>