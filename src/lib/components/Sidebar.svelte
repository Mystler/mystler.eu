<script>
  import Panel from "./Panel.svelte";
</script>

<Panel>
  {#snippet title()}
    <div class="text-center">Links</div>
  {/snippet}
  <div class="post-panel-body text-center flex flex-col gap-4 text-4xl">
    <a
      href="https://github.com/Mystler"
      title="GitHub"
      aria-label="GitHub"
      target="_blank"
      rel="noopener"
    >
      <i class="fa-brands fa-github"></i>
    </a>
    <a
      href="http://www.youtube.com/user/MystlerDE"
      title="YouTube"
      aria-label="YouTube"
      target="_blank"
      rel="noopener"
    >
      <i class="fa-brands fa-youtube"></i>
    </a>
    <a
      href="https://twitter.com/Mystler"
      title="Twitter"
      aria-label="Twitter"
      target="_blank"
      rel="noopener"
    >
      <i class="fa-brands fa-twitter"></i>
    </a>
    <a
      href="https://twitch.tv/mystler"
      title="Twitch"
      aria-label="Twitch"
      target="_blank"
      rel="noopener"
    >
      <i class="fa-brands fa-twitch"></i>
    </a>
  </div>
</Panel>

<Panel>
  {#snippet title()}
    <div class="text-center">Support Me</div>
  {/snippet}
  <div class="post-panel-body text-center flex flex-col gap-4 text-4xl">
    <a
      href="https://www.paypal.me/Mystler"
      title="PayPal"
      aria-label="PayPal"
      target="_blank"
      rel="noopener"
    >
      <i class="fa-brands fa-paypal"></i>
    </a>
  </div>
</Panel>
