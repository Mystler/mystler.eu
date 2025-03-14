<script lang="ts">
  import PageNavigation from "$lib/components/PageNavigation.svelte";
  import Post from "$lib/components/Post.svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }
  let { data }: Props = $props();
</script>

{#each data.page.posts as post (post.url)}
  <Post post={post.post} date={post.date} url={post.url} />
{/each}

<PageNavigation
  currentPage={data.page.page}
  hasNextPage={data.page.hasNextPage}
  hasPrevPage={data.page.hasPrevPage}
/>
