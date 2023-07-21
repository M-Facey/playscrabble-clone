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
}

export interface ContextTile extends BaseTile {
  aligned: boolean;
  start: boolean;
  position: number;
}
