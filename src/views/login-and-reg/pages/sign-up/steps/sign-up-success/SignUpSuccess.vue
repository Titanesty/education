<script setup lang="ts">
import IconCheck from "@/components/icons/icons-all/IconCheck.vue";
import { useRouter } from "vue-router";
import { RouterName } from "@/router/router-name";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import IconClose from "@/components/icons/icons-all/IconClose.vue";

const { t } = useI18n({ useScope: "global" });
const router = useRouter();

const goLogin = async (): Promise<any> => {
  await router.push({ name: RouterName.SIGN_IN });
};

const listenerEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    goLogin();
  }
};

onMounted(async () => {
  setTimeout(() => {
    window.addEventListener("keydown", listenerEnter, { once: true });
  }, 0);
});
</script>

<template>
  <div class="sign-up-success">
    <div class="sign-up-success__header">
      <div class="sign-up-success__header-title">{{ t("registration") }}</div>
      <router-link class="sign-up-success__header-cancel" :to="{ name: RouterName.SIGN_IN }">
        <IconClose />
      </router-link>
    </div>
    <div class="sign-up-success__icon" @click="goLogin">
      <IconCheck />
    </div>

    <div class="sign-up-success__title">{{ t("join.success") }}</div>

    <div class="sign-up-success__btn btn-primary" @click="goLogin">{{ t("password-recovery.success.good") }}</div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
