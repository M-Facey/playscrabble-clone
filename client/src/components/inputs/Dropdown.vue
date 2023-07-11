<script lang="ts" setup>
import { computed, ref } from "vue";
import IconArrowRight from "../icons/IconArrowRight.vue";

type Option = {
  value: string;
  label: string;
};

type Dropdown = {
  dropdownLabel: string;
  description?: string;
  showAllOptions?: boolean;
  selectedOption: number;
  options: Option[];
};

const props = defineProps<Dropdown>();
defineEmits<{
  (e: "set-selected-option", val: number): void;
}>();

const isMenuOpened = ref(false);
const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value;
};

const availableOptions = computed(() => {
  if (props.showAllOptions) {
    return props.options;
  }
  return props.options.filter((_, index) => {
    if (props.selectedOption === index) return true;
    return false;
  });
});
</script>

<template>
  <div>
    <p class="mt-3">{{ dropdownLabel }}</p>
    <div class="relative mt-1">
      <button
        v-if="options[selectedOption]"
        class="w-full p-3 bg-gray-500 hover:bg-gray-600 flex items-center justify-between border border-gray-300 rounded"
        @click="toggleMenu"
      >
        <p class="flex flex-col items-start">
          {{ options[selectedOption].label }}
          <span v-if="description" class="text-left text-xs">{{
            description
          }}</span>
        </p>
        <IconArrowRight
          class="w-6 h-6"
          :class="[isMenuOpened ? '-rotate-90' : 'rotate-90']"
        />
      </button>
      <div
        v-if="isMenuOpened"
        class="w-full absolute top-full left-0 translate-y-3 bg-gray-400 flex flex-col divide-y divide-neutral-700 rounded z-10"
      >
        <button
          v-for="(option, index) in availableOptions"
          :key="`${option.label}-${index}`"
          class="hover:bg-black/20 px-5 py-3 text-left"
          :class="{
            'bg-black/40 pointer-events-none':
              options[selectedOption].value === option.value,
          }"
          @click="$emit('set-selected-option', index)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>
