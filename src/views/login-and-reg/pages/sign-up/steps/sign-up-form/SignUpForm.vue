<script setup lang="ts">
import IconLogoMob from "@/components/icons/icons-all/IconLogoMob.vue";
import VInput from "@/components/UI/v-input/VInput.vue";
import SocialList from "@/views/login-and-reg/components/social-list/SocialList.vue";
import { useI18n } from "vue-i18n";
import { computed, reactive } from "vue";
import { IRegData } from "@/views/login-and-reg/pages/sign-up/types";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ValidateForm } from "@/views/login-and-reg/helpers/validateForm";
import { IEmailOrPhone } from "@/views/login-and-reg/pages/recovery-pass/steps/types";

interface SignUpFormProps {
  step: number;
  emailOrPhone: IEmailOrPhone;
}

defineProps<SignUpFormProps>();

interface SignUpFormEmits {
  (e: "update:step", newValue: number): void;
  (e: "update:emailOrPhone", newValue: IEmailOrPhone): void;
}

const emits = defineEmits<SignUpFormEmits>();

const { t } = useI18n({ useScope: "global" });

const regData = reactive<IRegData>({
  name: "",
  lastName: "",
  mobile: "",
  password: "",
});

const rules = {
  name: { required },
  lastName: { required },
  mobile: { required, validPhoneEmail: ValidateForm.validPhoneEmail },
  password: { required },
};

const v$ = useVuelidate(rules, regData);

const handleSubmit = (): void => {
  const date = new Date();
  v$.value.$validate();
  if (v$.value.$error) return;
  const valueReg: IEmailOrPhone = {
    value: regData.mobile,
    type: "phone", // получить от бека
  };
  emits("update:emailOrPhone", valueReg);
  window.sessionStorage.setItem("reg-data", JSON.stringify(valueReg));
  window.sessionStorage.setItem("timing", JSON.stringify(date));
  emits("update:step", 1);
};

const textMessagePhoneEmail = computed(() => {
  if (v$.value.mobile.$errors.length > 1) return t("errors.required");
  return t("errors.data_error");
});
</script>

<template>
  <div class="sign-up-form">
    <div class="sign-up-form__logo">
      <IconLogoMob class="sign-up-form__logo-icon" />
    </div>

    <div class="sign-up-form__title">{{ t("title") }}</div>
    <div class="sign-up-form__desc">{{ t("desc") }}</div>

    <SocialList class="sign-up-form__social" />

    <div class="sign-up-form__form">
      <div class="sign-up-form__form-wrapper">
        <VInput
          class="sign-up-form__form-input"
          :typeProps="'text'"
          :custom-placeholder="t('join.name')"
          :error="v$.name.$error"
          :error-text="t('errors.required')"
          v-model="regData.name"
        />
        <VInput
          class="sign-up-form__form-input"
          :typeProps="'text'"
          :custom-placeholder="t('join.last_name')"
          :error="v$.lastName.$error"
          :error-text="t('errors.required')"
          v-model="regData.lastName"
        />
      </div>

      <VInput
        class="sign-up-form__form-input"
        :typeProps="'text'"
        :custom-placeholder="t('tel_email')"
        :error="v$.mobile.$error"
        :error-text="textMessagePhoneEmail"
        v-model.telemail="regData.mobile"
      />

      <VInput
        class="sign-up-form__form-input"
        :typeProps="'password'"
        :error="v$.password.$error"
        :error-text="t('errors.required')"
        :custom-placeholder="t('password')"
        v-model="regData.password"
      />

      <div class="sign-up-form__privacy">
        <div class="sign-up-form__privacy-politic">
          {{ t("join.privacy") }}
          <span class="sign-up-form__privacy-politic-link">{{ t("join.politic") }}</span>
        </div>
        <div class="sign-up-form__privacy-btn btn-primary" @click="handleSubmit">{{ t("join.continue") }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
