<script lang="ts">
  export let currentPage: number;
  export let hasNextPage: boolean;
  export let hasPrevPage: boolean;
</script>

<div class="flex justify-between">
  {#if hasPrevPage}
    <a href={currentPage == 2 ? "/" : `/page${currentPage - 1}`}>
      <button type="button" class="btn"><i class="fa-solid fa-arrow-left-long"></i> Previous</button
      >
    </a>
  {:else}
    <button type="button" class="btn disabled"
      ><i class="fa-solid fa-arrow-left-long"></i> Previous</button
    >
  {/if}
  {#if hasNextPage}
    <a href={`/page${currentPage + 1}`}>
      <button type="button" class="btn">Next <i class="fa-solid fa-arrow-right-long"></i></button>
    </a>
  {:else}
    <button type="button" class="btn disabled"
      >Next <i class="fa-solid fa-arrow-right-long"></i></button
    >
  {/if}
</div>
