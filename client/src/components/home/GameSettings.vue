<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useGameStore } from "@/stores/game";

import ActionButton from "../inputs/ActionButton.vue";
import IconArrowLeft from "../icons/IconArrowLeft.vue";
import Dropdown from "../inputs/Dropdown.vue";

let gameStore = useGameStore();

const isPlayerMode = computed(() => {
  return gameStore.gameMode === "player";
});

onMounted(() => {
  // reset the dropdown options
  gameStore.selectedTimeOption = 0;
  if (gameStore.gameMode === "player") {
    gameStore.playerOptions.selectedNumberOfPlayers = 0;
    gameStore.playerOptions.selectedPlayerMode = 0;
  } else if (gameStore.gameMode === "computer") {
    gameStore.computerOptions.selectedCompterMode = 0;
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
      :selected-option="gameStore.selectedTimeOption"
      :options="gameStore.timeOptions"
      :show-all-options="false"
      @set-selected-option="(index) => gameStore.setOptions('duration', index)"
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select player mode"
      :selected-option="gameStore.playerOptions.selectedPlayerMode"
      :options="gameStore.playerOptions.playerMode"
      :show-all-options="true"
      @set-selected-option="
        (index) => gameStore.setOptions('player-mode', index)
      "
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select number of players"
      :selected-option="gameStore.playerOptions.selectedNumberOfPlayers"
      :options="gameStore.playerOptions.numberOfPlayers"
      :show-all-options="true"
      @set-selected-option="
        (index) => gameStore.setOptions('num-of-players', index)
      "
    />

    <Dropdown
      v-if="!isPlayerMode"
      dropdown-label="Select the computer modes"
      :selected-option="gameStore.computerOptions.selectedCompterMode"
      :options="gameStore.computerOptions.computerMode"
      :show-all-options="true"
      @set-selected-option="
        (index) => gameStore.setOptions('computer-mode', index)
      "
    />

    <ActionButton display-name="Continue" size="w-full h-14 mt-auto" />
  </section>
</template>
