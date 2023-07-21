import { defineStore } from "pinia";
import type { BaseTile, BoardTile, ContextTile, PlayerTile } from "@/types";
import { tiles } from "@/utils/tile";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    numberOfCells: 15,
    specialTiles: {
      tw: [0, 7, 14, 105, 119, 210, 217, 224],
      dw: [16, 28, 32, 42, 48, 56, 64, 70, 154, 160, 168, 176, 182, 192, 208],
      tl: [20, 24, 76, 80, 84, 88, 136, 140, 144, 148, 200, 204],
      dl: [
        3, 11, 36, 38, 45, 52, 59, 92, 96, 98, 102, 108, 116, 122, 126, 128,
        132, 165, 172, 179, 186, 188, 213, 221,
      ],
    },
    board: [] as BoardTile[],
    tileBag: Object.entries(tiles),
    game: {
      dragIndex: 0,
      dragTileType: "player",
      selectedPlayer: 1,
      contextTiles: [] as ContextTile[],
    },
    players: [
      {
        tiles: [] as PlayerTile[],
        name: "Player 1",
        dragIndex: 0,
      },
      {
        tiles: [] as PlayerTile[],
        name: "Player 2",
        dragIndex: 0,
      },
    ],
  }),
  getters: {
    getTotalTiles(): number {
      return this.tileBag.reduce((a, b) => {
        return a + b[1].amount;
      }, 0);
    },
    getConstantsTotal(): number {
      const VOWELS = ["A", "E", "I", "O", "U"];
      return this.tileBag.reduce((a, b) => {
        if (!VOWELS.includes(b[0])) {
          return a + b[1].amount;
        }
        return a;
      }, 0);
    },
    getVowelsTotal(): number {
      const VOWELS = ["A", "E", "I", "O", "U"];
      return this.tileBag.reduce((a, b) => {
        if (VOWELS.includes(b[0])) {
          return a + b[1].amount;
        }
        return a;
      }, 0);
    },
  },
  actions: {
    isSpecialTile(index: number) {
      if (this.specialTiles.tw.includes(index)) {
        return "tw";
      } else if (this.specialTiles.dw.includes(index)) {
        return "dw";
      } else if (this.specialTiles.dl.includes(index)) {
        return "dl";
      } else if (this.specialTiles.tl.includes(index)) {
        return "tl";
      } else if (index === 112) {
        return "ct";
      }
      return "";
    },
    setBoardTiles(board: BoardTile[]) {
      this.board = board;
    },
    fillPlayerTiles(playerIndex: number) {
      for (let i = 0; i < 7; i++) {
        const index = Math.floor(Math.random() * 27);
        if (this.tileBag[index]) {
          this.tileBag[index][1].amount -= 1;
          this.players[playerIndex].tiles.push({
            letter: this.tileBag[index][0],
            value: this.tileBag[index][1].value,
            originalPosition: i,
            playerName: this.players[playerIndex].name,
          });
        }
      }
    },
    insertContextTile(tile: BaseTile, pos: number) {
      if (this.game.contextTiles.length === 0) {
        this.game.contextTiles.push({
          ...tile,
          aligned: true,
          start: true,
          position: pos,
        });
        return;
      }

      if (this.game.contextTiles[0].position > pos) {
        this.game.contextTiles[0].start = false;
        this.game.contextTiles[0].aligned = false;
      }

      this.game.contextTiles.push({
        ...tile,
        aligned: false,
        start: true,
        position: pos,
      });

      this.game.contextTiles.sort((a, b) => a.position - b.position);

      for (let i = 0; i < this.game.contextTiles.length; i++) {
        if (i === 0) {
          this.game.contextTiles[i].aligned = true;
        } else if (
          i + 1 <= this.game.contextTiles.length - 1 &&
          this.game.contextTiles.length > 2
        ) {
          this.game.contextTiles[i].aligned = this.checkAlignment(
            this.game.contextTiles[i].position,
            this.game.contextTiles[i + 1].position
          );
        } else if (
          i === this.game.contextTiles.length - 1 &&
          this.game.contextTiles.length > 1
        ) {
          this.game.contextTiles[i].aligned = this.checkAlignment(
            this.game.contextTiles[i - 1].position,
            this.game.contextTiles[i].position
          );
        }
      }
    },
    checkAlignment(posA: number, posB: number) {
      const posX = Math.abs(posB - posA);
      console.log(posX);
      if (posX === 1 || posX === 15) {
        return true;
      }

      return false;
    },
  },
});
