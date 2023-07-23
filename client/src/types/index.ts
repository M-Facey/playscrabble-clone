export interface BaseTile {
  value: number;
  letter: string;
}

export interface PlayerTile extends BaseTile {
  playerName: string;
  originalPosition: number;
}

export interface BoardTile {
  playerTile: PlayerTile;
  isSpecialTile: string;
  isOccupied: boolean;
  borders: string[];
}

export interface ContextTile extends BaseTile {
  start: boolean;
  position: number;
}
