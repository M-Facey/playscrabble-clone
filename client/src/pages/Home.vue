<script lang="ts" setup></script>

<template>
  <main
    class="h-screen bg-neutral-900 flex items-center justify-center gap-x-9 text-white"
  >
    <div class="relative tiles w-[550px]">
      <img
        src="@/assets/images/scrabble-anim-light.webp"
        alt=""
        class="rounded-lg"
      />
    </div>
    <RouterView v-slot="{ Component }">
      <Transition name="route" mode="out-in" appear>
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.2s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
