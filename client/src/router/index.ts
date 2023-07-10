import { createRouter, createWebHistory } from "vue-router";

// pages
import Home from "@/pages/Home.vue";
import NotFound from "@/pages/NotFound.vue";

// components
import GameSettings from "@/components/home/GameSettings.vue";
import GameMode from "@/components/home/GameMode.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "",
          name: "no-mode",
          component: GameMode,
        },
        {
          path: "/play/friend",
          name: "friend-mode",
          component: GameSettings,
        },
        {
          path: "/play/computer",
          name: "computer-mode",
          component: GameSettings,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});
