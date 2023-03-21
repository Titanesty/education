import { createRouter, createWebHistory } from "vue-router";
import { RouterName } from "@/router/router-name";
import SignUp from "@/views/login-and-reg/pages/sign-up/SignUp.vue";
import SingIn from "@/views/login-and-reg/pages/sing-in/SingIn.vue";
import { useAuthStore } from "@/stores/auth";
import RecoveryPass from "@/views/login-and-reg/pages/recovery-pass/RecoveryPass.vue";
import SelectLanguages from "@/components/select-languages/SelectLanguages.vue";
import LayoutAuth from "@/layout/auth/LayoutAuth.vue";
import LayoutDefault from "@/layout/default/LayoutDefault.vue";
import VHome from "@/views/home/VHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: RouterName.AUTH,
      path: "/sign_up",
      component: LayoutAuth,
      redirect: RouterName.SIGN_IN,
      children: [
        {
          path: "/sign_up",
          name: RouterName.SIGN_UP,
          component: SignUp,
        },
        {
          path: "/sign_in",
          name: RouterName.SIGN_IN,
          component: SingIn,
        },
        {
          path: "/recovery_pass",
          name: RouterName.RECOVERY,
          component: RecoveryPass,
        },
        {
          path: "/languages",
          name: RouterName.LANGUAGES,
          component: SelectLanguages,
        },
      ],
    },
    {
      name: RouterName.DEFAULT,
      path: "",
      component: LayoutDefault,
      children: [
        {
          path: "/",
          name: RouterName.HOME,
          component: VHome,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (
    !authStore.isAuth &&
    to.name !== RouterName.SIGN_IN &&
    to.name !== RouterName.SIGN_UP &&
    to.name !== RouterName.RECOVERY &&
    to.name !== RouterName.LANGUAGES
  ) {
    next({ name: RouterName.SIGN_IN });
  } else {
    next();
  }
});

export default router;
