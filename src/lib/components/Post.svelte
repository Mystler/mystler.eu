<script lang="ts">
  import type { PostMD } from "$lib/posts";
  import Panel from "./Panel.svelte";

  interface Props {
    post: PostMD;
    date: string;
    url?: string | undefined;
  }
  let { post, date, url = undefined }: Props = $props();

  const dateDisplay = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
</script>

<Panel>
  {#snippet title()}
    <div>
      {#if !url}
        {post.metadata.title}
      {:else}
        <a href={url}>{post.metadata.title}</a>
      {/if}
    </div>
  {/snippet}
  {#snippet date()}
    <div>{dateDisplay}</div>
  {/snippet}
  <post.default />
</Panel>
