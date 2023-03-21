<script setup lang="ts">
import VInput from "@/components/UI/v-input/VInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { IEmailOrPhone } from "@/views/login-and-reg/pages/recovery-pass/steps/types";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
interface IEmailMobInputProps {
  step: number;
  emailOrPhone: IEmailOrPhone;
}

const props = defineProps<IEmailMobInputProps>();

interface IEmailMobInputEmits {
  (e: "update:step", newValue: number): void;
}

const emits = defineEmits<IEmailMobInputEmits>();

const codeConfirmation = ref<number | null>(null);

const rules = {
  codeConfirmation: { required, minLength: minLength(4), maxLength: maxLength(4) },
};

const v$ = useVuelidate(rules, { codeConfirmation });

const sendConfirmCode = (): void => {
  v$.value.$validate();
  if (v$.value.$error) return;
  emits("update:step", 2);
};

const sendConfirmEmail = (): void => {
  emits("update:step", 2);
};

const isVerify = computed(() => {
  return !v$.value.codeConfirmation.$error && !v$.value.codeConfirmation.$invalid;
});

const textError = computed(() => {
  if (v$.value.codeConfirmation.required.$invalid) return t("errors.required");
  return t("errors.data_error");
});

const isTimer = ref<number>(25);

const reductionTime = (): void => {
  isTimer.value--;
};

const intervalTime = setInterval(reductionTime, 1000);

const goInterval = () => {
  return intervalTime;
};

const goStepBack = () => {
  emits("update:step", 0);
};

onMounted(() => {
  goInterval();
});

const messageEmailOrPhone = computed(() => {
  if (props.emailOrPhone.type === "phone") return `+${props.emailOrPhone.value}`;
  return props.emailOrPhone.value;
});

const isPhone = computed(() => {
  return props.emailOrPhone.type === "phone";
});

watch(isTimer, (value) => {
  if (value === 0) {
    clearInterval(intervalTime);
  }
});
</script>

<template>
  <div class="confirm-form-data">
    <div class="confirm-form-data__content">
      <div class="confirm-form-data__title">
        <h1 v-if="isPhone">{{ t("password-recovery.confirm.check_mail") }}</h1>
        <h1 v-else>{{ t("password-recovery.confirm.thanks") }}</h1>
      </div>

      <div v-if="isPhone" class="confirm-form-data__desc">
        {{ t("password-recovery.confirm.desc-phone-before") }}
        {{ messageEmailOrPhone }}. {{ t("password-recovery.confirm.desc-phone-after") }}
      </div>

      <div v-else class="confirm-form-data__desc">
        {{ t("password-recovery.confirm.desc-email-before") }}
        <span class="confirm-form-data__desc-email">
          {{ messageEmailOrPhone }}
        </span>
        {{ t("password-recovery.confirm.desc-email-after") }}
      </div>

      <VInput
        v-if="isPhone"
        autofocus
        class="confirm-form-data__input"
        type-props="text"
        :error="v$.codeConfirmation.$error"
        :error-text="textError"
        :custom-placeholder="t('password-recovery.confirm.confirmation_code')"
        v-model="codeConfirmation"
        :verify="isVerify"
        @keydown.enter="sendConfirmCode"
      />

      <div v-if="isPhone" class="confirm-form-data__again" :class="{ 'confirm-form-data__again--active': !isTimer }">
        {{ t("password-recovery.confirm.code_again") }}
        <span v-if="isTimer">({{ isTimer }} {{ t("password-recovery.confirm.second") }})</span>
      </div>
    </div>
    <div class="confirm-form-data__footer">
      <div class="confirm-form-data__back" @click="goStepBack">{{ t("password-recovery.back") }}</div>
      <div v-if="isPhone" class="confirm-form-data__btn btn-primary" @click="sendConfirmCode">
        {{ t("password-recovery.continue") }}
      </div>
      <div v-else class="confirm-form-data__btn btn-primary" @click="sendConfirmEmail">
        {{ t("password-recovery.confirm.check_mail") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
