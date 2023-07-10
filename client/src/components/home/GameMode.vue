<script lang="ts" setup>
import ModeButton from "../inputs/ModeButton.vue";
import IconRocket from "../icons/IconRocket.vue";
import IconUsers from "../icons/IconUsers.vue";

const word = "Scrabble";
</script>

<template>
  <section class="w-[500px]">
    <div class="flex flex-col">
      <p>Play</p>
      <p class="flex gap-x-1">
        <span v-for="(char, index) in word" :key="`lbl-${index}`">{{
          char
        }}</span>
      </p>
    </div>

    <div class="flex flex-col gap-y-3">
      <RouterLink to="/play/friend">
        <ModeButton :icon="IconUsers" display-name="Play a friend" />
      </RouterLink>
      <RouterLink to="/play/computer">
        <ModeButton :icon="IconRocket" display-name="Play the computer" />
      </RouterLink>
    </div>
  </section>
</template>
