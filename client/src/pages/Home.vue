<script lang="ts" setup>
import GameMode from "../components/home/GameMode.vue";
</script>

<template>
  <main
    class="h-screen bg-slate-900 flex items-center justify-center gap-x-9 text-white"
  >
    <div class="relative tiles">
      <img src="@/assets/images/scrabble-light.png" alt="" class="w-[550px]" />
      <img
        src="@/assets/images/p.png"
        alt=""
        class="tile absolute w-[34.5px] top-[224px] left-[159px]"
      />
      <img
        src="@/assets/images/l.png"
        alt=""
        class="tile absolute w-[34.5px] top-[224px] left-[193px]"
      />
      <img
        src="@/assets/images/a.png"
        alt=""
        class="tile absolute w-[34.5px] top-[224px] left-[227px]"
      />
      <img
        src="@/assets/images/y.png"
        alt=""
        class="tile absolute w-[34.5px] top-[224px] left-[261px]"
      />
      <img
        src="@/assets/images/n.png"
        alt=""
        class="tile absolute w-[34.5px] top-[259px] left-[261px]"
      />
      <img
        src="@/assets/images/o.png"
        alt=""
        class="tile absolute w-[34.5px] top-[260px] left-[295px]"
      />
      <img
        src="@/assets/images/w.png"
        alt=""
        class="tile absolute w-[34.5px] top-[259px] left-[329px]"
      />
      <img
        src="@/assets/images/arrow.png"
        alt=""
        class="tile absolute w-[34.5px] top-[259px] left-[363px]"
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

.tiles .tile {
  opacity: 0;
  transform: translateY(-60px);
}

.tiles .tile:nth-child(2) {
  animation: animate-tile 0.35s forwards;
}
.tiles .tile:nth-child(3) {
  animation: animate-tile 0.35s 0.5s forwards;
}
.tiles .tile:nth-child(4) {
  animation: animate-tile 0.35s 1.5s forwards;
}
.tiles .tile:nth-child(5) {
  animation: animate-tile 0.35s 2s forwards;
}
.tiles .tile:nth-child(6) {
  animation: animate-tile 0.35s 2.5s forwards;
}
.tiles .tile:nth-child(7) {
  animation: animate-tile 0.35s 3s forwards;
}
.tiles .tile:nth-child(8) {
  animation: animate-tile 0.35s 3.5s forwards;
}
.tiles .tile:nth-child(9) {
  animation: animate-tile 0.35s 4s forwards;
}

@keyframes animate-tile {
  0% {
    opacity: 0;
    transform: translateY(-60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
