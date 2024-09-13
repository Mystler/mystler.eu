<div class="audio-card-list">
  <slot />
</div>

<style lang="postcss">
  .audio-card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    @apply gap-4 mb-4;
  }
</style>
