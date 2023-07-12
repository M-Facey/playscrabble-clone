<script lang="ts" setup>
import IconArrowRight from "../icons/IconArrowRight.vue";
type ButtonType = {
  icon: any;
  displayName: string;
  value?: string;
  colorStyles?: string;
};

defineProps<ButtonType>();
</script>

<template>
  <button
    class="group w-full bg-neutral-800 hover:bg-white/10 px-5 py-4 flex items-center gap-x-3 border border-neutral-700 rounded-lg"
  >
    <div
      class="ring-4 rounded-xl"
      :class="[colorStyles ? colorStyles : 'bg-red-600 ring-red-600/40']"
    >
      <Component :is="icon" class="w-7 h-7 m-1.5" />
    </div>
    <p class="text-lg">{{ displayName }}</p>

    <IconArrowRight
      class="w-7 h-7 -translate-x-5 group-hover:translate-x-0 opacity-0 transition-all group-hover:opacity-100 ml-auto"
    />
  </button>
</template>
