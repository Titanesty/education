<script setup lang="ts">
import IconCheck from "@/components/icons/icons-all/IconCheck.vue";
import { useRouter } from "vue-router";
import { RouterName } from "@/router/router-name";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
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
  <div class="expired-code">
    <div class="expired-code__icon">
      <IconCheck />
    </div>

    <div class="expired-code__title">{{ t("password-recovery.success.title") }}</div>

    <div class="expired-code__btn btn-primary" @click="goLogin">{{ t("password-recovery.success.good") }}</div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
