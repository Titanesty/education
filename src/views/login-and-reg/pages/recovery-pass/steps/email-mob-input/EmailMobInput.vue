<script setup lang="ts">
import VInput from "@/components/UI/v-input/VInput.vue";
import { computed, ref } from "vue";
import { required } from "@vuelidate/validators";
import { ValidateForm } from "@/views/login-and-reg/helpers/validateForm";
import { useVuelidate } from "@vuelidate/core";
import { RouterName } from "@/router/router-name";
import { IEmailOrPhone } from "@/views/login-and-reg/pages/recovery-pass/steps/types";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
interface IEmailMobInputProps {
  step: number;
}

const props = defineProps<IEmailMobInputProps>();

interface IEmailMobInputEmits {
  (e: "update:step", newValue: number): void;
  (e: "update:emailOrPhone", newValue: IEmailOrPhone): void;
}

const emits = defineEmits<IEmailMobInputEmits>();

const phoneOrEmail = ref<string | number>("");

const rules = {
  phoneOrEmail: { required, validPhoneEmail: ValidateForm.validPhoneEmail },
};

const v$ = useVuelidate(rules, { phoneOrEmail });

const sendEmailPhone = (): void => {
  v$.value.$validate();
  if (v$.value.$error) return;
  emits("update:emailOrPhone", { value: phoneOrEmail.value, type: "phone" });
  emits("update:step", 1);
};

const isVerify = computed(() => {
  return !v$.value.phoneOrEmail.$error && !v$.value.phoneOrEmail.$invalid;
});

const textError = computed(() => {
  if (v$.value.phoneOrEmail.$errors.length > 1) return t("errors.required");
  return t("errors.data_error");
});
</script>

<template>
  <div class="recovery-form-data">
    <div class="recovery-form-data__content">
      <div class="recovery-form-data__title">
        <h1>{{ t("password-recovery.password_recovery") }}</h1>
      </div>
      <div class="recovery-form-data__desc">
        {{ t("password-recovery.input.desc") }}
      </div>

      <VInput
        class="recovery-form-data__input"
        type-props="text"
        :error="v$.phoneOrEmail.$error"
        :error-text="textError"
        :custom-placeholder="t('tel_email')"
        v-model.telemail="phoneOrEmail"
        :verify="isVerify"
        @keydown.enter="sendEmailPhone"
      />
    </div>
    <div class="recovery-form-data__footer">
      <div class="recovery-form-data__back">
        <router-link class="recovery-form-data__back-link" :to="{ name: RouterName.SIGN_IN }">
          {{ t("password-recovery.back") }}
        </router-link>
      </div>
      <div class="recovery-form-data__btn btn-primary" @click="sendEmailPhone">
        {{ t("password-recovery.continue") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
