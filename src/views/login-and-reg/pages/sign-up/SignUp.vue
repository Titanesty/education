<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RouterName } from "@/router/router-name";
import SignUpForm from "@/views/login-and-reg/pages/sign-up/steps/sign-up-form/SignUpForm.vue";
import { IEmailOrPhone } from "@/views/login-and-reg/pages/recovery-pass/steps/types";
import SignUpConfirm from "@/views/login-and-reg/pages/sign-up/steps/sign-up-confirm/SignUpConfirm.vue";
import SignUpSuccess from "@/views/login-and-reg/pages/sign-up/steps/sign-up-success/SignUpSuccess.vue";
import ExpiredPeriod from "@/views/login-and-reg/components/expired-period/ExpiredPeriod.vue";
import { onBeforeRouteLeave } from "vue-router";
import { gsap } from "gsap";
import { useAnimateStore } from "@/stores/animate";

const animateStore = useAnimateStore();

const signForm: string[] = [SignUpForm, SignUpConfirm, SignUpSuccess, ExpiredPeriod];

const activeStep = ref<number>(window.sessionStorage.getItem("reg-data") ? 1 : 0);

const item = ref<HTMLElement | null>(null);

const frontFlip = async () => {
  await gsap.fromTo(
    item.value,
    { rotateY: 0, perspective: 600, duration: 0.6 },
    { rotateY: 90, perspective: 600, duration: 0.6 }
  );
};

onBeforeRouteLeave(async (to, from, next) => {
  if (to.name === RouterName.SIGN_IN && window.innerWidth > 481) {
    document.body.style.overflow = "hidden";
    await frontFlip();
  }
  next();
});

const backFlip = async () => {
  await gsap.fromTo(
    item.value,
    { rotateY: -90, perspective: 600, duration: 0.6 },
    { rotateY: 0, perspective: 600, duration: 0.6 }
  );
};

const emailOrPhone = ref<IEmailOrPhone | null>(JSON.parse(window.sessionStorage.getItem("reg-data")) || null);

onMounted(async () => {
  if (animateStore.isAnimate) {
    await backFlip();
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <div ref="item" class="sign-up">
    <div class="sign-up__wrapper">
      <div class="sign-up__content">
        <component :is="signForm[activeStep]" v-model:step="activeStep" v-model:emailOrPhone="emailOrPhone" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
