<script lang="ts" setup>
import type { BaseTile } from "@/types";
defineProps<BaseTile>();
</script>

<template>
  <div
    class="w-max relative bg-tile px-5 py-3 text-white rounded-lg select-none"
  >
    <p class="text-lg font-black">{{ letter === "Blank" ? "_" : letter }}</p>
    <p class="absolute bottom-1 right-1 text-xs font-bold select-none">
      {{ value }}
    </p>
  </div>
</template>
