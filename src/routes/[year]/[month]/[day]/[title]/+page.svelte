<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import type { PageData } from "./$types";
  interface Props {
    data: PageData;
  }
  let { data }: Props = $props();
</script>

<Post post={data.post} date={data.date} />
