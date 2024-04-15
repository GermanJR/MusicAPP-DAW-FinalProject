import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import SpotifyCallback from "@/views/SpotifyCallback.vue";
import ForbiddenPage from "@/views/ForbiddenPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/callback',
      name: 'callback',
      component: SpotifyCallback,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('access_token')) {
      next();
    } else {
      next({ name: 'forbidden' });
    }
  } else {
    next();
  }
});

export default router
