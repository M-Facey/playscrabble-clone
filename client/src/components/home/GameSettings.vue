<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useSettingsStore } from "@/stores/settings";

import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import ActionButton from "@/components/inputs/ActionButton.vue";
import Dropdown from "@/components/inputs/Dropdown.vue";

let settingsStore = useSettingsStore();

const isPlayerMode = computed(() => {
  return settingsStore.gameMode === "player";
});

onMounted(() => {
  // reset the dropdown options
  settingsStore.selectedTimeOption = 0;
  if (settingsStore.gameMode === "player") {
    settingsStore.playerOptions.selectedNumberOfPlayers = 0;
    settingsStore.playerOptions.selectedPlayerMode = 0;
  } else if (settingsStore.gameMode === "computer") {
    settingsStore.computerOptions.selectedCompterMode = 0;
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
      :selected-option="settingsStore.selectedTimeOption"
      :options="settingsStore.timeOptions"
      :show-all-options="false"
      @set-selected-option="
        (index) => settingsStore.setOptions('duration', index)
      "
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select player mode"
      :selected-option="settingsStore.playerOptions.selectedPlayerMode"
      :options="settingsStore.playerOptions.playerMode"
      :show-all-options="true"
      @set-selected-option="
        (index) => settingsStore.setOptions('player-mode', index)
      "
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select number of players"
      :selected-option="settingsStore.playerOptions.selectedNumberOfPlayers"
      :options="settingsStore.playerOptions.numberOfPlayers"
      :show-all-options="true"
      @set-selected-option="
        (index) => settingsStore.setOptions('num-of-players', index)
      "
    />

    <Dropdown
      v-if="!isPlayerMode"
      dropdown-label="Select the computer modes"
      :selected-option="settingsStore.computerOptions.selectedCompterMode"
      :options="settingsStore.computerOptions.computerMode"
      :show-all-options="true"
      @set-selected-option="
        (index) => settingsStore.setOptions('computer-mode', index)
      "
    />

    <RouterLink :to="{ name: 'player-game' }" class="mt-auto">
      <ActionButton display-name="Continue" size="w-full h-14" />
    </RouterLink>
  </section>
</template>
