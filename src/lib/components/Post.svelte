<script lang="ts">
  import type { PostMD } from "$lib/posts";

  export let post: PostMD;
  export let date: string;
  export let url: string | undefined = undefined;

  const dateDisplay = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
</script>

<div class="post-panel">
  <article>
    <div class="post-panel-head">
      <h3>
        {#if !url}
          {post.metadata.title}
        {:else}
          <a href={url}>{post.metadata.title}</a>
        {/if}
      </h3>
      <p>{dateDisplay}</p>
    </div>
    <div class="post-panel-body">
      <svelte:component this={post.default} />
    </div>
  </article>
</div>
