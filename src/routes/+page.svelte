<script lang="ts">
  import PageNavigation from "$lib/components/PageNavigation.svelte";
  import Post from "$lib/components/Post.svelte";

  export let data;
</script>

{#each data.page.posts as post}
  <Post post={post.post} date={post.date} url={post.url} />
{/each}

<PageNavigation
  currentPage={data.page.page}
  hasNextPage={data.page.hasNextPage}
  hasPrevPage={data.page.hasPrevPage}
/>
