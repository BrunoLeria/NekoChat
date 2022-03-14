import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import About from "../views/About.vue";
import NetworkError from "../views/NetworkError.vue";
import NProgress from "nprogress";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about-us",
    name: "About",
    component: About,
    alias: "/about",
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 };
  },
});

router.beforeEach(() => {
  NProgress.start();

  //   const notAuthorized = true;
  //   if (to.meta.requireAuth & notAuthorized) {
  //     GStore.flashMessage = "You must be logged in to view this page";

  //     setTimeout(() => {
  //       GStore.flashMessage = "";
  //     }, 3000);

  //     if (from.href) {
  //       return false;
  //     }

  //     return { path: "/" };
  //   }
});

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  NProgress.done();
});

export default router;
