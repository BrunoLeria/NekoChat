import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import About from "../views/About.vue";
import NetworkError from "../views/NetworkError.vue";
import NProgress from "nprogress";
import Login from "../views/Login.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/about-us",
        name: "About",
        component: About,
        alias: "/about"
    },
    {
        path: "/404/:resource",
        name: "404Resource",
        component: NotFound,
        props: true
    },
    {
        path: "/network-error",
        name: "NetworkError",
        component: NetworkError
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition ? savedPosition : { top: 0 };
    }
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async (to, from, next) => {
    NProgress.start();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("Você precisa estar logado para acessar esta página");
            next({
                path: "/",
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    NProgress.done();
});

export default router;
