<script lang="ts">
  import type { PostMD } from "$lib/posts";
  import Panel from "./Panel.svelte";

  export let post: PostMD;
  export let date: string;
  export let url: string | undefined = undefined;

  const dateDisplay = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
</script>

<Panel>
  <div slot="title">
    {#if !url}
      {post.metadata.title}
    {:else}
      <a href={url}>{post.metadata.title}</a>
    {/if}
  </div>
  <div slot="date">{dateDisplay}</div>
  <svelte:component this={post.default} />
</Panel>
