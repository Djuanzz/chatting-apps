import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import CreateChannel from "../views/CreateChannel.vue";
import Channels from "../views/Channels.vue";
import NotFound from "../views/Page404.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signin", name: "Signin", component: Signin },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/create-channel", name: "CreateChannel", component: CreateChannel },
  { path: "/channels/:id", name: "Channels", component: Channels },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
