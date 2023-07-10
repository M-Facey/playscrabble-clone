<script lang="ts" setup>
import IconArrowRight from "../icons/IconArrowRight.vue";
type ButtonType = {
  icon: any;
  displayName: string;
  value?: string;
};

defineProps<ButtonType>();
</script>

<template>
  <button
    class="group w-full bg-transparent hover:bg-white/20 px-5 py-4 flex items-center gap-x-3 border border-gray-400 rounded-lg"
  >
    <div class="bg-red-600 rounded-xl border-red-300 border-4">
      <Component :is="icon" class="w-7 h-7 m-1.5" />
    </div>
    <p class="text-lg">{{ displayName }}</p>

    <IconArrowRight
      class="w-7 h-7 -translate-x-5 group-hover:translate-x-0 opacity-0 transition-all group-hover:opacity-100 ml-auto"
    />
  </button>
</template>
