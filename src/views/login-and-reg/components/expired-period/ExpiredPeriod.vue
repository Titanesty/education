<script setup lang="ts">
import { onMounted } from "vue";
import IconCancel from "@/components/icons/icons-all/IconCancel.vue";
import { useRouter } from "vue-router";
import { RouterName } from "@/router/router-name";

const router = useRouter();

interface IEmailMobInputEmits {
  (e: "update:step", newValue: number): void;
}

const emits = defineEmits<IEmailMobInputEmits>();

const sendLink = (): void => {
  router.push({ name: RouterName.SIGN_UP });
  emits("update:step", 1);
};

const listenerEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    sendLink();
  }
};

onMounted(() => {
  setTimeout(() => {
    window.addEventListener("keydown", listenerEnter, { once: true });
  }, 0);
});
</script>

<template>
  <div class="success-form-data">
    <div class="success-form-data__icon">
      <IconCancel />
    </div>

    <div class="success-form-data__title">Истек срок подтверждения</div>

    <div class="success-form-data__btn btn-primary" @click="sendLink">Отправить ссылку повторно</div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
