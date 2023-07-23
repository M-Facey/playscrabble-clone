import { tiles } from "@/utils/tile";
import { useBoardStore } from "@/stores/board";
// types
import type { BaseTile, BoardTile } from "@/types";

// create board tiles
export function createBoard(numberOfTiles: number) {
  const boardStore = useBoardStore();
  const board: BoardTile[] = [];

  for (let i = 0; i < Math.pow(numberOfTiles, 2); i++) {
    const tileLabel = boardStore.isSpecialTile(i);
    board.push({
      playerTile: {
        playerName: "",
        value: 0,
        letter: "",
        originalPosition: -1,
      },
      isSpecialTile: tileLabel,
      isOccupied: false,
      borders: [],
    });
  }

  return board;
}

// create tile bag
export const createTilebag = () => {
  let tileBag: BaseTile[] = [];
  const entries = Object.entries(tiles);

  entries.map((item) => {
    for (let i = 0; i < item[1].amount; i++) {
      tileBag.push({
        letter: item[0],
        value: item[1].value,
      });
    }
  });

  return tileBag;
};
