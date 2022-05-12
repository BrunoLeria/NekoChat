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
        component: Home,
        meta: { requiresAuth: true }
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

router.beforeEach(async (to, from) => {
    NProgress.start();
    const user = await getCurrentUser();
    if (to.meta.requiresAuth && !user) {
        alert("Você precisa estar logado para acessar esta página");
        return { name: "Login" };
    }
    NProgress.done();
});

export default router;
