<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useGameStore } from "@/stores/game";

import ActionButton from "../inputs/ActionButton.vue";
import IconArrowLeft from "../icons/IconArrowLeft.vue";
import Dropdown from "../inputs/Dropdown.vue";

const route = useRoute();
let {
  setOptions,
  selectedTimeOption,
  timeOptions,
  playerOptions,
  computerOptions,
  gameMode,
} = useGameStore();

const isPlayerMode = computed(() => {
  return gameMode === "player";
});

onMounted(() => {
  if (route.name == "computer-mode") {
    gameMode = "player";
  } else {
    gameMode = "computer";
  }
});
</script>

<template>
  <section
    class="w-[500px] h-[550px] bg-slate-700 flex flex-col p-4 rounded-lg"
  >
    <header class="flex items-center border-b border-white pb-4">
      <RouterLink to="/">
        <ActionButton :icon="IconArrowLeft" size="w-12 h-12" />
      </RouterLink>
      <p class="mx-auto text-3xl font-bold">
        {{ isPlayerMode ? "Play a Friend" : "Play the Computer" }}
      </p>
    </header>
    <Dropdown
      dropdown-label="Select time limit per player"
      description="When the timer runs out, the game is over"
      :selected-option="selectedTimeOption"
      :options="timeOptions"
      :show-all-options="false"
      @set-selected-option="(index) => setOptions('duration', index)"
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select player mode"
      :selected-option="playerOptions.selectedPlayerMode"
      :options="playerOptions.playerMode"
      :show-all-options="true"
      @set-selected-option="(index) => setOptions('player-mode', index)"
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select number of players"
      :selected-option="playerOptions.selectedNumberOfPlayer"
      :options="playerOptions.numberOfPlayer"
      :show-all-options="true"
      @set-selected-option="(index) => setOptions('num-of-players', index)"
    />

    <Dropdown
      v-if="!isPlayerMode"
      dropdown-label="Select the computer modes"
      :selected-option="computerOptions.selectedCompterMode"
      :options="computerOptions.computerMode"
      :show-all-options="true"
      @set-selected-option="(index) => setOptions('computer-mode', index)"
    />

    <ActionButton display-name="Continue" size="w-full h-14 mt-auto" />
  </section>
</template>
