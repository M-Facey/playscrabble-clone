<script lang="ts" setup>
import Board from "@/components/game/Board.vue";
import Timer from "@/components/game/Timer.vue";
import Tilebag from "@/components/game/Tilebag.vue";
import PlayerTiles from "@/components/game/PlayerTiles.vue";
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <!-- board -->
    <div>
      <Board />
      <PlayerTiles />
    </div>
    <!-- game aside -->
    <div>
      <!-- timer -->
      <Timer />

      <!-- tilebag -->
      <Tilebag />
    </div>
  </div>
</template>
