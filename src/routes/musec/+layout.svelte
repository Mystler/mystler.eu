<script lang="ts">
  import Panel from "$lib/components/Panel.svelte";
  let { children } = $props();
</script>

<Panel>
  {@render children?.()}
</Panel>
