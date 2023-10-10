import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/login/Register.vue";
import ForgotPassword from "../views/login/ForgotPassword.vue";
import About from "../views/About.vue";
import TaskForm from "../views/tasks/TaskForm.vue";
import ClientForm from "../views/clients/ClientForm.vue";
import NProgress from "nprogress";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
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
        path: "/home/team",
        name: "Team",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/chat",
        name: "Chat",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/analytics",
        name: "Analytics",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/settings/:id?",
        name: "Settings",
        component: Home,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/tasks",
        name: "Tasks",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/clients",
        name: "Clients",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requiresAuth: false }
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
        meta: { requiresAuth: false }
    },
    {
        path: "/about-us",
        name: "About",
        component: About,
        meta: { requiresAuth: false }
    },
    {
        path: "/home/task/:id?",
        name: "TaskForm",
        component: TaskForm,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/task/client/:client_id/chat/:message_id",
        name: "ChatTaskForm",
        component: TaskForm,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/task/info/:id",
        name: "InfoTaskForm",
        component: TaskForm,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: "/task/feedback",
        name: "FeedbackTaskForm",
        component: TaskForm,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/client/:id?",
        name: "ClientForm",
        component: ClientForm,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: "/home/client/task/:phone_number?",
        name: "ClientFormWithPhoneNumber",
        component: ClientForm,
        props: true,
        meta: { requiresAuth: true }
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
