<script lang="ts" setup>
type Button = {
  icon?: any;
  displayName?: string;
  size: string;
};

defineProps<Button>();
</script>

<template>
  <button class="rounded-xl border border-gray-300 p-1" :class="[size]">
    <div class="h-full flex items-center justify-center bg-gray-300 rounded-md">
      <Component v-if="icon" :is="icon" class="w-7 h-7 text-black" />
      <p v-if="displayName" class="text-lg text-black">{{ displayName }}</p>
    </div>
  </button>
</template>
