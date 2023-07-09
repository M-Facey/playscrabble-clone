import { createRouter, createWebHistory } from "vue-router";

// components
import Home from "@/pages/Home.vue";
import NotFound from "@/pages/NotFound.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});
