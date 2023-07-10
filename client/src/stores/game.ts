import { defineStore } from "pinia";

export const useGameStore = defineStore({
  id: "game",
  state: () => ({
    timeOptions: [
      { value: "3-mins", label: "3 minutes" },
      { value: "15-mins", label: "15 minutes" },
      { value: "25-mins", label: "25 minutes" },
      { value: "45-mins", label: "45 minutes" },
    ],
    gameMode: "",
    playerOptions: {
      playerMode: [
        { value: "online", label: "Online" },
        { value: "device", label: "On Device" },
      ],
      numberOfPlayer: [
        { value: "2", label: "2 Players" },
        { value: "4", label: "4 Players" },
      ],
    },
    computerOptions: {
      computerMode: [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
      ],
    },
  }),
});
