<script lang="ts">
  import { resolve } from "$app/paths";

  interface Props {
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }

  let { currentPage, hasNextPage, hasPrevPage }: Props = $props();
</script>

<div class="flex justify-between">
  {#if hasPrevPage}
    <a href={resolve(currentPage == 2 ? "/" : `/page${currentPage - 1}`)}>
      <button type="button" class="btn"><i class="fa-solid fa-arrow-left-long"></i> Previous</button
      >
    </a>
  {:else}
    <button type="button" class="btn disabled"
      ><i class="fa-solid fa-arrow-left-long"></i> Previous</button
    >
  {/if}
  {#if hasNextPage}
    <a href={resolve(`/page${currentPage + 1}`)}>
      <button type="button" class="btn">Next <i class="fa-solid fa-arrow-right-long"></i></button>
    </a>
  {:else}
    <button type="button" class="btn disabled"
      >Next <i class="fa-solid fa-arrow-right-long"></i></button
    >
  {/if}
</div>
