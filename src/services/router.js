import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/login/Register.vue";
import ForgotPassword from "../views/login/ForgotPassword.vue";
import About from "../views/About.vue";
import NProgress from "nprogress";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/registro",
        name: "Register",
        component: Register,
        meta: { requiresAuth: false }
    },
    {
        path: "/esqueceu-senha",
        name: "ForgotPassword",
        component: ForgotPassword,
        meta: { requiresAuth: false }
    },
    {
        path: "/about-us",
        name: "About",
        component: About,
        alias: "/about"
    },
    {
        path: "/:catchAll(.*)*",
        name: "NotFound",
        component: NotFound,
        meta: { requiresAuth: false }
    },
    {
        path: "/404/:resource",
        name: "404Resource",
        component: NotFound,
        meta: { requiresAuth: false },
        props: true
    },
    {
        path: "/network-error",
        name: "NetworkError",
        component: Login,
        meta: { requiresAuth: false }
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
        console.log(to.meta.requiresAuth);
        alert("Você precisa estar logado para acessar esta página");
        return { name: "Login" };
    }
    NProgress.done();
});
router.onError((error) => {
    if (error.response && error.response.status != 404) {
        this.$router.push({ name: "NetworkError" });
    }
});

export default router;
