<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  interface Props {
    data: any;
  }
  let { data }: Props = $props();
</script>

<Post post={data.post} date={data.date} />
