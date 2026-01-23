<script lang="ts">
  import { resolve } from "$app/paths";
  import type { PostMD } from "$lib/posts";
  import Panel from "./Panel.svelte";

  interface Props {
    post: PostMD;
    date: string;
    url?: `/${string}/${string}/${string}/${string}/` | undefined;
  }
  let { post, date, url = undefined }: Props = $props();

  const dateDisplay = $derived(
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date)),
  );
</script>

<Panel>
  {#snippet title()}
    <div>
      {#if !url}
        {post.metadata.title}
      {:else}
        <a href={resolve(url)}>{post.metadata.title}</a>
      {/if}
    </div>
  {/snippet}
  {#snippet date()}
    <div>{dateDisplay}</div>
  {/snippet}
  <post.default />
</Panel>
