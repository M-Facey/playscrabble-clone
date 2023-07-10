<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useGameStore } from "@/stores/game";

import ActionButton from "../inputs/ActionButton.vue";
import IconArrowLeft from "../icons/IconArrowLeft.vue";
import Dropdown from "../inputs/Dropdown.vue";

const route = useRoute();
const gameStore = useGameStore();
const isPlayerMode = ref(false);

const selectedOption = ref(gameStore.timeOptions[0]);
const setSelectedOption = (option: { label: string; value: string }) => {
  selectedOption.value = option;
};

const selectedPlayerMode = ref(gameStore.playerOptions.playerMode[0]);
const setSelectedPlayerMode = (option: { label: string; value: string }) => {
  selectedPlayerMode.value = option;
};

const selectedNumOfPlayers = ref(gameStore.playerOptions.numberOfPlayer[0]);
const setSelectedNumOfPlayers = (option: { label: string; value: string }) => {
  selectedNumOfPlayers.value = option;
};

const selectedComputerMode = ref(gameStore.computerOptions.computerMode[0]);
const setSelectedComputerMode = (option: { label: string; value: string }) => {
  selectedComputerMode.value = option;
};

onMounted(() => {
  if (route.name == "computer-mode") {
    isPlayerMode.value = false;
  } else {
    isPlayerMode.value = true;
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
      :selected-option="selectedOption"
      :options="gameStore.timeOptions"
      :show-all-options="false"
      @set-selected-option="setSelectedOption"
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select player mode"
      :selected-option="selectedPlayerMode"
      :options="gameStore.playerOptions.playerMode"
      :show-all-options="true"
      @set-selected-option="setSelectedPlayerMode"
    />

    <Dropdown
      v-if="isPlayerMode"
      dropdown-label="Select number of players"
      :selected-option="selectedNumOfPlayers"
      :options="gameStore.playerOptions.numberOfPlayer"
      :show-all-options="true"
      @set-selected-option="setSelectedNumOfPlayers"
    />

    <Dropdown
      v-if="!isPlayerMode"
      dropdown-label="Select the computer modes"
      :selected-option="selectedComputerMode"
      :options="gameStore.computerOptions.computerMode"
      :show-all-options="true"
      @set-selected-option="setSelectedComputerMode"
    />

    <ActionButton display-name="Continue" size="w-full h-14 mt-auto" />
  </section>
</template>
