<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Tile from "./Tile.vue";
import ActionButton from "../inputs/ActionButton.vue";
import IconUndo from "@/components/icons/IconUndo.vue";
import IconShuffle from "@/components/icons/IconShuffle.vue";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();

const tile = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);

// drag events
function handlePlayerDrag(e: DragEvent, dragEnd: boolean) {
  if (dragEnd) {
    isDragging.value = false;
  }
  if (tile.value === null) return;
  tile.value.style.top = `${e.y - offsetY.value}px`;
  tile.value.style.left = `${e.x - offsetX.value}px`;
}

function handlePlayerDragStart(e: DragEvent, index: number) {
  isDragging.value = true;
  boardStore.game.dragTileType = "player";

  const elem = e.target as HTMLElement;
  offsetX.value = e.x - elem.getBoundingClientRect().left;
  offsetY.value = e.y - elem.getBoundingClientRect().top;

  boardStore.game.dragIndex = index;
}

function handlePlayerDragEnter(event: DragEvent) {
  let indexStr = (event.target as HTMLElement).dataset.index;
  if (indexStr === undefined || boardStore.game.dragIndex === Number(indexStr))
    return;

  const index = Number(indexStr);
  if (boardStore.game.dragTileType === "player") {
    const tempTile =
      boardStore.players[boardStore.game.selectedPlayer].tiles[index];
    boardStore.players[boardStore.game.selectedPlayer].tiles[index] =
      boardStore.players[boardStore.game.selectedPlayer].tiles[
        boardStore.game.dragIndex
      ];
    boardStore.players[boardStore.game.selectedPlayer].tiles[
      boardStore.game.dragIndex
    ] = tempTile;

    boardStore.game.dragIndex = index;
  } else {
    if (
      boardStore.players[boardStore.game.selectedPlayer].tiles[index]
        .playerName !== ""
    ) {
      const emptyTileIndex = boardStore.players[
        boardStore.game.selectedPlayer
      ].tiles.findIndex((tile) => tile.playerName === "");

      const tempTile =
        boardStore.players[boardStore.game.selectedPlayer].tiles[index];

      boardStore.players[boardStore.game.selectedPlayer].tiles[index] =
        boardStore.players[boardStore.game.selectedPlayer].tiles[
          emptyTileIndex
        ];
      boardStore.players[boardStore.game.selectedPlayer].tiles[emptyTileIndex] =
        tempTile;
    }
  }
}

function handlePlayerDragOver(event: DragEvent) {
  event.preventDefault();
}
function handlePlayerDrop(e: DragEvent, index: number) {
  boardStore.players[boardStore.game.selectedPlayer].tiles[index] =
    boardStore.board[boardStore.game.dragIndex].playerTile;
  boardStore.board[boardStore.game.dragIndex].playerTile = {
    playerName: "",
    value: 0,
    letter: "",
    originalPosition: -1,
  };
}

// mounte
onMounted(() => {
  boardStore.fillPlayerTiles(1);
});
</script>

<template>
  <div
    class="w-max bg-gray-700 flex items-center gap-2 p-3 mt-4 mx-auto rounded-lg"
  >
    <ActionButton :icon="IconShuffle" size="shuffle-icon w-14 h-14" />
    <div
      v-for="(tile, index) in boardStore.players[boardStore.game.selectedPlayer]
        .tiles"
      class="select-none"
    >
      <Tile
        v-if="tile?.playerName"
        :value="tile.value"
        :letter="tile.letter"
        :data-index="index"
        draggable="true"
        @drag="handlePlayerDrag($event, false)"
        @dragend="handlePlayerDrag($event, true)"
        @dragstart="handlePlayerDragStart($event, index)"
        @dragenter="handlePlayerDragEnter"
        @dragover="handlePlayerDragOver"
        @drop="handlePlayerDrop($event, index)"
        :class="{
          'opacity-0': isDragging && boardStore.game.dragIndex === index,
        }"
      />
      <div
        v-else
        class="w-[53px] h-[52px]"
        :data-index="index"
        @dragenter="handlePlayerDragEnter"
        @dragover="handlePlayerDragOver"
        @drop="handlePlayerDrop($event, index)"
      ></div>
    </div>
    <ActionButton :icon="IconUndo" size="undo-icon w-14 h-14" />

    <div
      v-if="
        boardStore.players[boardStore.game.selectedPlayer].tiles.length > 0 &&
        boardStore.game.dragTileType === 'player'
      "
      ref="tile"
      class="absolute pointer-events-none"
      :class="[isDragging ? 'opacity-100 shadow-xl' : 'opacity-0']"
    >
      <Tile
        :letter="
          boardStore.players[boardStore.game.selectedPlayer].tiles[
            boardStore.game.dragIndex
          ].letter
        "
        :value="
          boardStore.players[boardStore.game.selectedPlayer].tiles[
            boardStore.game.dragIndex
          ].value
        "
      />
    </div>
  </div>
</template>

<style>
.shuffle-icon * {
  stroke-width: 3px;
}

.undo-icon * {
  stroke-width: 6px;
}
</style>
