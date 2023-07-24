<script lang="ts" setup>
import IconClock from "@/components/icons/IconClock.vue";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
</script>

<template>
  <div class="relative w-[550px] flex">
    <!-- player 1 section -->
    <div
      class="w-1/2 p-3 border border-gray-400 rounded-l-xl"
      :class="{ 'bg-gray-200': boardStore.game.selectedPlayer === 0 }"
    >
      <div class="flex items-center border-b border-gray-400 pb-3">
        <div
          class="w-12 h-12 p-1 bg-gray-300 border border-gray-400 rounded-2xl"
        >
          <div
            class="w-full h-full bg-neutral-800 flex items-center justify-center text-white rounded-xl"
          >
            P1
          </div>
          <!-- image here -->
        </div>
        <p class="text-xl ml-2">Player 1</p>
      </div>
      <div class="w-full flex items-center justify-between pt-2 pl-2 pr-5">
        <p class="text-4xl">0</p>
        <p class="text-lg">00:00</p>
      </div>
    </div>
    <!-- player 2 section -->
    <div
      class="w-1/2 p-3 border border-gray-400 rounded-r-xl"
      :class="{ 'bg-gray-200': boardStore.game.selectedPlayer === 1 }"
    >
      <div class="flex items-center border-b border-gray-400 pb-3">
        <div
          class="w-12 h-12 p-1 bg-gray-300 border border-gray-400 rounded-2xl"
        >
          <div
            class="w-full h-full bg-neutral-800 flex items-center justify-center text-white rounded-xl"
          >
            P2
          </div>
          <!-- image here -->
        </div>
        <p class="text-xl ml-2">Player 2</p>
      </div>
      <div
        class="w-full flex flex-row-reverse items-center justify-between pt-2 pr-2 pl-5"
      >
        <p class="text-4xl">0</p>
        <p class="text-lg">00:00</p>
      </div>
    </div>

    <div
      class="absolute bottom-3 left-1/2 -translate-x-1/2 h-max bg-gray-100 p-1 rounded-full"
    >
      <div
        class="w-9 h-9 flex items-center justify-center border-2 border-gray-500 rounded-full"
      >
        <IconClock class="w-6 h-6 text-rose-500" />
      </div>
    </div>
  </div>
</template>
