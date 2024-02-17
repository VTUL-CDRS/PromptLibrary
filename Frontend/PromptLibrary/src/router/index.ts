import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../Views/HomeView.vue";
import LoginView from "../Views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            alias:["/home", "/index.html"],
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            alias:["/login", "/login.html", "/Login"],
        },
    ],
});

export default router;