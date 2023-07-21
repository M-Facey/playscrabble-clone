<script lang="ts" setup>
import IconBrief from "../icons/IconBrief.vue";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
</script>

<template>
  <div class="w-[550px] bg-slate-100 p-3 rounded-xl">
    <div class="flex items-center border-b border-gray-500 pb-1.5 mb-1.5">
      <IconBrief class="w-5 h-5" />
      <p class="ml-2 mr-auto text-lg">
        Tile Bag
        <span class="ml-0.5 font-bold">{{ boardStore.getTotalTiles }}</span>
      </p>
      <div class="flex gap-x-2 text-sm">
        <p class="text-gray-400">
          Vowel :
          <span class="text-black">{{ boardStore.getVowelsTotal }}</span>
        </p>
        <p class="text-gray-400">
          Constants :
          <span class="text-black">{{ boardStore.getConstantsTotal }}</span>
        </p>
      </div>
    </div>

    <div v-if="boardStore.tileBag.length !== 0" class="flex flex-wrap gap-x-3">
      <div v-for="tile in boardStore.tileBag">
        <!-- the element below is work-around -->
        <p v-if="tile[1].amount > 0">
          <span v-for="_ in tile[1].amount" class="px-[1px]">{{
            tile[0] === "Blank" ? "??" : tile[0]
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
