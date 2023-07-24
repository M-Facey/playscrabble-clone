import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({
    timeOptions: [
      { value: "3-mins", label: "3 minutes" },
      { value: "15-mins", label: "15 minutes" },
      { value: "25-mins", label: "25 minutes" },
      { value: "45-mins", label: "45 minutes" },
    ],
    selectedTimeOption: 0,
    gameMode: "",
    playerOptions: {
      playerMode: [
        { value: "online", label: "Online" },
        { value: "device", label: "On Device" },
      ],
      numberOfPlayers: [
        { value: "2", label: "2 Players" },
        { value: "4", label: "4 Players" },
      ],
      selectedPlayerMode: 0,
      selectedNumberOfPlayers: 0,
    },
    computerOptions: {
      computerMode: [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
      ],
      selectedCompterMode: 0,
    },
  }),
  actions: {
    setOptions(type: string, index: number) {
      if (type === "computer-mode") {
        this.computerOptions.selectedCompterMode = index;
      } else if (type === "player-mode") {
        this.playerOptions.selectedPlayerMode = index;
      } else if (type === "num-of-players") {
        this.playerOptions.selectedNumberOfPlayers = index;
      } else if (type === "duration") {
        this.selectedTimeOption = index;
      }
    },
    setGameMode(mode: string) {
      this.gameMode = mode;
    },
  },
});
