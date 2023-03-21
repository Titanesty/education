<script setup lang="ts">
import { RouterName } from "@/router/router-name";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { t } = useI18n({ useScope: "global" });

const isRouter = computed(() => {
  if (route.name === RouterName.SIGN_IN) return { link: RouterName.SIGN_UP, title: t("sign_up") };
  return { link: RouterName.SIGN_IN, title: t("sign_in") };
});
</script>

<template>
  <div class="header-auth">
    <router-link class="header-auth__sign-in-link" :to="{ name: isRouter.link }">
      <div class="header-auth__sign-in">
        {{ isRouter.title }}
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" src="./styles.scss" scoped />
