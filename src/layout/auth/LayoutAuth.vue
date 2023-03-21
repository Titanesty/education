<script setup lang="ts">
import FooterAuth from "@/components/common/footer-auth/FooterAuth.vue";
import HeaderAuth from "@/components/common/header-auth/HeaderAuth.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouterName } from "@/router/router-name";
import { useAnimateStore } from "@/stores/animate";

const animateStore = useAnimateStore();

const route = useRoute();
const router = useRouter();

const showHeader = computed(() => {
  return route.name === RouterName.SIGN_UP || route.name === RouterName.SIGN_IN;
});

const showFooter = computed(() => {
  return window.innerWidth > 481 || route.name === RouterName.SIGN_UP || route.name === RouterName.SIGN_IN;
});

const item = ref<HTMLElement | null>(null);

router.beforeEach((to, from, next) => {
  if (
    ((to.name === RouterName.SIGN_IN && from.name === RouterName.SIGN_UP) ||
      (to.name === RouterName.SIGN_UP && from.name === RouterName.SIGN_IN)) &&
    window.innerWidth > 481
  ) {
    animateStore.isAnimate = true;
    next();
  } else {
    animateStore.isAnimate = false;
    next();
  }
});
</script>

<template>
  <div class="layout-auth">
    <div class="layout-auth__container">
      <HeaderAuth v-if="showHeader" class="layout-auth__header" />
      <main ref="item" class="layout-auth__main">
        <RouterView />
      </main>
      <FooterAuth v-if="showFooter" class="layout-auth__footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
