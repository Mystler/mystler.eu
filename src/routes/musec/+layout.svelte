<script>
  import Panel from "$lib/components/Panel.svelte";
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<Panel>
  {@render children?.()}
</Panel>
