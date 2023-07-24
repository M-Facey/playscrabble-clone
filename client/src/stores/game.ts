import { ref } from "vue";
import { defineStore } from "pinia";
import { useBoardStore } from "@/stores/board";

export const useGameStore = defineStore("game", () => {
  const gameInfo = ref();
  const remainingTime = ref([0, 0]);
  const startGame = ref(true);

  const boardStore = useBoardStore();

  function nextPlayer() {
    const remainingSpace = boardStore.players[
      boardStore.game.selectedPlayer
    ].tiles.filter((tile) => tile.letter !== "").length;

    if (
      remainingSpace === 7 ||
      (startGame.value && !boardStore.isTileOnCenter)
    ) {
      console.log(startGame.value && boardStore.isTileOnCenter);
      return; 
    }

    if (startGame.value) {
      startGame.value = false;
    }

    if (boardStore.game.selectedPlayer === 0) {
      boardStore.game.selectedPlayer = 1;
      if (boardStore.players[1].tiles.length === 0) {
        boardStore.fillPlayerTiles(1);
      } else {
        boardStore.renewPlayerTiles(1);
      }
    } else {
      boardStore.game.selectedPlayer = 0;
      boardStore.renewPlayerTiles(0);
    }
  }

  return {
    gameInfo,
    remainingTime,
    startGame,
    nextPlayer,
  };
});
