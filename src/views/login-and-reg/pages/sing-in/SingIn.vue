<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import User from "@/assets/images/user.webp";
import IconLogoMob from "@/components/icons/icons-all/IconLogoMob.vue";
import VInput from "@/components/UI/v-input/VInput.vue";
import { RouterName } from "@/router/router-name";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ISignInData } from "@/views/login-and-reg/pages/sing-in/types";
import SocialList from "@/views/login-and-reg/components/social-list/SocialList.vue";
import { ValidateForm } from "@/views/login-and-reg/helpers/validateForm";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { onBeforeRouteLeave } from "vue-router";
import { useAnimateStore } from "@/stores/animate";

const { t } = useI18n({ useScope: "global" });
const signInData = reactive<ISignInData>({
  emailOrPhone: "",
  password: "",
});

const animateStore = useAnimateStore();

const rules = {
  emailOrPhone: { required, validPhoneEmail: ValidateForm.validPhoneEmail },
  password: { required },
};

const v$ = useVuelidate(rules, signInData);

const handleSubmit = (): void => {
  v$.value.$validate();
};

const item = ref<HTMLElement | null>(null);

const isComeBack = ref<boolean>(true);

const loginAnother = (): void => {
  isComeBack.value = false;
};

const textMessagePhoneEmail = computed(() => {
  if (v$.value.emailOrPhone.$errors.length > 1) return t("errors.required");
  return t("errors.data_error");
});

const frontFlip = async () => {
  await gsap.fromTo(
    item.value,
    { rotateY: 0, perspective: 600, duration: 0.6 },
    { rotateY: 90, perspective: 600, duration: 0.6 }
  );
};

const backFlip = async () => {
  await gsap.fromTo(
    item.value,
    { rotateY: -90, perspective: 600, duration: 0.6 },
    { rotateY: 0, perspective: 600, duration: 0.6 }
  );
};

onBeforeRouteLeave(async (to, from, next) => {
  if (to.name === RouterName.SIGN_UP && window.innerWidth > 481) {
    document.body.style.overflow = "hidden";
    await frontFlip();
  }
  next();
});

onMounted(async () => {
  if (animateStore.isAnimate) {
    await backFlip();
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <div ref="item" class="sign-in">
    <div class="sign-in__wrapper">
      <div class="sign-in__content">
        <div class="sign-in__logo">
          <IconLogoMob class="sign-in__logo-icon" />
        </div>

        <div class="sign-in__title">
          <h1 v-if="isComeBack">{{ t("sign-in.welcome_back") }}, Вася!</h1>
          <h1 v-else>{{ t("title") }}</h1>
        </div>

        <div v-if="!isComeBack" class="sign-in__desc">{{ t("desc") }}</div>

        <SocialList v-if="!isComeBack" class="sign-in__social" />

        <div v-if="isComeBack" class="sign-in__avatar">
          <img class="sign-in__avatar-img" :src="User" alt="пользователь" />
        </div>

        <div v-if="isComeBack" class="sign-in__email">vasya@mail.ru</div>

        <div class="sign-in__form">
          <div class="sign-in__form-fields">
            <VInput
              v-if="!isComeBack"
              class="sign-in__form-input"
              :typeProps="'text'"
              :error="v$.emailOrPhone.$error"
              :error-text="textMessagePhoneEmail"
              :custom-placeholder="t('tel_email')"
              v-model="signInData.emailOrPhone"
              @keydown.enter="handleSubmit"
            />

            <VInput
              class="sign-in__form-input"
              :typeProps="'password'"
              :error="v$.password.$error"
              :error-text="t('errors.required')"
              :custom-placeholder="t('password')"
              v-model="signInData.password"
              @keydown.enter="handleSubmit"
            />
          </div>

          <div class="sign-in__forgot">
            <router-link class="sign-in__forgot-link" :to="{ name: RouterName.RECOVERY }">
              {{ t("sign-in.forgot_password") }}
            </router-link>
          </div>

          <div class="sign-in__enter">
            <div v-if="isComeBack" class="sign-in__enter-another" @click="loginAnother">
              {{ t("sign-in.another_account") }}
            </div>
            <div class="sign-in__enter-btn btn-primary--disabled" @click="handleSubmit">{{ t("sign_in") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
