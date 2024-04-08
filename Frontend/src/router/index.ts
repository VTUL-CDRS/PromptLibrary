import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../Views/HomeView.vue";
import LoginView from "../Views/LoginView.vue";
import DatabaseView from "../Views/DatabaseView.vue";
import PromptSubmissionView from "../Views/PromptSubmissionView.vue";
import PromptDetail from "../Views/PromptDetail.vue";
import NotFoundView from "../Views/NotFoundView.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: ["/home", "/index.html"],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      alias: ["/login", "/login.html", "/Login"],
    },
    {
      path: "/database",
      name: "database",
      component: DatabaseView,
    },
    {
      path: "/submit",
      name: "submit",
      component: PromptSubmissionView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/database/prompt/:id',
      name: 'PromptDetail',
      component: PromptDetail,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    }
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged (
        getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
        reject
    );
  });
};
router.beforeEach(async (to, from, next) =>{
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Error: Please sign in");
    }
  } else {
    next();
  }
});
export default router;
