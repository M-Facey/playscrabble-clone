<script lang="ts" setup>
import { useSettingsStore } from "@/stores/settings";
import ModeButton from "@/components/inputs/ModeButton.vue";
import IconRocket from "@/components/icons/IconRocket.vue";
import IconUsers from "@/components/icons/IconUsers.vue";

const word = "scrabble";
const { setGameMode } = useSettingsStore();
</script>

<template>
  <section class="w-[500px]">
    <div class="flex flex-col justify-center">
      <p
        class="uppercase tracking-[0.5rem] text-neutral-400 text-2xl text-center font-extrabold"
      >
        Play
      </p>
      <p class="flex gap-x-1.5 mx-auto mb-4">
        <span
          v-for="(char, index) in word"
          :key="`lbl-${index}`"
          class="bg-tile shadow-inner px-4 py-2 uppercase text-neutral-900 text-xl font-black rounded"
          >{{ char }}</span
        >
      </p>
    </div>

    <div class="flex flex-col gap-y-3">
      <RouterLink to="/play/friend" @click="setGameMode('player')">
        <ModeButton
          :icon="IconUsers"
          display-name="Play a friend"
          color-styles="bg-rose-600 ring-rose-600/30"
        />
      </RouterLink>
      <RouterLink to="/play/computer" @click="setGameMode('computer')">
        <ModeButton
          :icon="IconRocket"
          display-name="Play the computer"
          color-styles="bg-cyan-600 ring-cyan-600/30"
        />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.tile {
  background: #cf6464;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25) inset;
}
</style>
@/stores/settings
