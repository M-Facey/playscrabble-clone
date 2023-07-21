<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { createBoard } from "@/utils";
import { useBoardStore } from "@/stores/board";
import { useResizeObserver } from "@vueuse/core";

import IconStar from "@/components/icons/IconStar.vue";

const boardEl = ref<HTMLDivElement>();
const boardWidth = ref(-1);
const cellSize = ref(40);
const textSize = ref(14);

const isDragging = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);

useResizeObserver(boardEl, (entries) => {
  const entry = entries[0];
  const { width } = entry.contentRect;
  boardWidth.value = width;

  cellSize.value = width * 0.05847953216;
  textSize.value = width * 0.020467836;
});

const boardStore = useBoardStore();

// drag events
function handleBoardDrag() {}

function handleBoardDragStart(e: DragEvent, index: number) {
  isDragging.value = true;
  boardStore.game.dragTileType = "board";

  const elem = e.target as HTMLElement;
  offsetX.value = e.x - elem.getBoundingClientRect().left;
  offsetY.value = e.y - elem.getBoundingClientRect().top;

  boardStore.game.dragIndex = index;
}
function handleBoardDragEnter(event: DragEvent) {
  event.preventDefault();
}
function handleBoardDragOver(event: DragEvent) {
  event.preventDefault();
}
function handleBoardDrop(e: DragEvent, index: number) {
  if (boardStore.game.dragTileType === "player") {
    boardStore.board[index].playerTile =
      boardStore.players[boardStore.game.selectedPlayer].tiles[
        boardStore.game.dragIndex
      ];
    boardStore.players[boardStore.game.selectedPlayer].tiles[
      boardStore.game.dragIndex
    ] = {
      ...boardStore.players[boardStore.game.selectedPlayer].tiles[
        boardStore.game.dragIndex
      ],
      playerName: "",
      letter: "",
      value: -1,
    };
    const { letter, value } = boardStore.board[index].playerTile;
    boardStore.insertContextTile({ letter, value }, index);
  } else {
    boardStore.board[index].playerTile =
      boardStore.board[boardStore.game.dragIndex].playerTile;

    boardStore.board[boardStore.game.dragIndex].playerTile = {
      playerName: "",
      value: 0,
      letter: "",
      originalPosition: -1,
    };

    const { letter, value } = boardStore.board[index].playerTile;
    boardStore.insertContextTile({ letter, value }, index);
  }
}

onMounted(() => {
  boardStore.setBoardTiles(createBoard(boardStore.numberOfCells));
});
</script>

<template>
  <p class="break-words">{{ boardWidth }}</p>
  <div
    ref="boardEl"
    class="grid grid-cols-[repeat(15,minmax(0,1fr))] grid-row-[repeat(15,minmax(0,1fr))] gap-1.5 bg-neutral-900 p-6"
  >
    <div
      v-for="(tile, index) in boardStore.board"
      class="relative"
      @drag="handleBoardDrag"
      @dragenter="handleBoardDragEnter"
      @dragover="handleBoardDragOver"
      @drop="handleBoardDrop($event, index)"
    >
      <div
        class="flex items-center justify-center uppercase text-white font-black rounded-md select-none"
        :class="{
          'bg-dark-tile': tile.isSpecialTile === '',
          'bg-tw-tile': tile.isSpecialTile === 'tw',
          'bg-dw-tile': tile.isSpecialTile === 'dw',
          'bg-dl-tile': tile.isSpecialTile === 'dl',
          'bg-tl-tile': tile.isSpecialTile === 'tl',
          'center-tile border-[2px] border-white': tile.isSpecialTile === 'ct',
        }"
        :style="`width: ${cellSize}px; height: ${cellSize}px; font-size: ${textSize}px; line-height: ${textSize}px`"
      >
        <IconStar v-if="tile.isSpecialTile === 'ct'" class="w-7 h-7" />
        <p v-else>
          {{ tile.isSpecialTile }}
        </p>

        <div
          v-if="tile.playerTile.playerName"
          class="w-full h-full absolute bg-tile flex items-center justify-center scale-[1.15] rounded"
          draggable="true"
          @drag="handleBoardDrag"
          @dragstart="handleBoardDragStart($event, index)"
          @dragenter="handleBoardDragEnter"
          @dragover="handleBoardDragOver"
        >
          <p class="text-sm font-bold">{{ tile.playerTile.letter }}</p>
          <p class="absolute bottom-0 right-0.5 text-[8px] font-bold">
            {{ tile.playerTile.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center-tile {
  background: conic-gradient(
    from 180deg at 50% 50%,
    #f00c18 0deg,
    #ed7517 120.00000357627869deg,
    #8308f8 243.74999284744263deg,
    #5c00b3 360deg
  );
}
</style>
