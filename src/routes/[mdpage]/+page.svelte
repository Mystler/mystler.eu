<script lang="ts">
  import Panel from "$lib/components/Panel.svelte";
  import type { PageData } from "./$types";
  interface Props {
    data: PageData;
  }
  let { data }: Props = $props();
</script>

<Panel>
  <data.page.default />
</Panel>
