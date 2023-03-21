<script setup lang="ts">
import VInput from "@/components/UI/v-input/VInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { IEmailOrPhone } from "@/views/login-and-reg/pages/recovery-pass/steps/types";
import { useI18n } from "vue-i18n";
import IconClose from "@/components/icons/icons-all/IconClose.vue";

const { t } = useI18n({ useScope: "global" });

interface IEmailMobInputProps {
  step: number;
  emailOrPhone: IEmailOrPhone;
}

const props = defineProps<IEmailMobInputProps>();

interface IEmailMobInputEmits {
  (e: "update:step", newValue: number): void;
}

const emits = defineEmits<IEmailMobInputEmits>();

const codeConfirmation = ref<string | null>(null);

const rules = {
  codeConfirmation: { required, minLength: minLength(4), maxLength: maxLength(4) },
};

const v$ = useVuelidate(rules, { codeConfirmation });

const sendConfirmCode = (): void => {
  if (props.emailOrPhone.type === "phone") {
    v$.value.$validate();
    if (v$.value.$error) return;
  }
  if (codeConfirmation.value === "5555") {
    emits("update:step", 3);
  } else {
    emits("update:step", 2);
  }
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

const timeDifference = computed(() => {
  return Math.ceil(
    (new Date().valueOf() - new Date(JSON.parse(window.sessionStorage.getItem("timing") || "{}")).valueOf()) / 1000
  );
});

const isTimer = ref<number>(
  window.sessionStorage.getItem("timing") ? (26 - timeDifference.value > 0 ? 26 - timeDifference.value : 0) : 26
);

const reductionTime = (): void => {
  isTimer.value--;
};

const intervalTime = setInterval(reductionTime, 1000);

const goInterval = () => {
  return intervalTime;
};

const goStepBack = () => {
  window.sessionStorage.removeItem("reg-data");
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
  if (value <= 0) {
    clearInterval(intervalTime);
    isTimer.value = 0;
  }
});
</script>

<template>
  <div class="sign-up-confirm">
    <div class="sign-up-confirm__header">
      <div class="sign-up-confirm__header-title">{{ t("registration") }}</div>
      <div class="sign-up-confirm__header-cancel" @click="goStepBack">
        <IconClose />
      </div>
    </div>
    <div class="sign-up-confirm__content">
      <div class="sign-up-confirm__title">
        <h1 v-if="isPhone">{{ t("join.phone-verification-title") }}</h1>
        <h1 v-else>{{ t("join.email-verification-title") }}</h1>
      </div>

      <div v-if="isPhone" class="sign-up-confirm__desc">
        {{ t("join.phone-verification-before") }}
        {{ messageEmailOrPhone }}.
        {{ t("join.phone-verification-after") }}
      </div>

      <div v-else class="sign-up-confirm__desc">
        {{ t("join.email-verification-before") }}
        <span class="sign-up-confirm__desc-email">
          {{ messageEmailOrPhone }}
        </span>
        {{ t("join.email-verification-after") }}
      </div>

      <VInput
        v-if="isPhone"
        autofocus
        class="sign-up-confirm__input"
        type-props="text"
        :error="v$.codeConfirmation.$error"
        :error-text="textError"
        :custom-placeholder="t('password-recovery.confirm.confirmation_code')"
        v-model="codeConfirmation"
        :verify="isVerify"
        @keydown.enter="sendConfirmCode"
      />

      <div v-if="isPhone" class="sign-up-confirm__again" :class="{ 'sign-up-confirm__again--active': !isTimer }">
        {{ t("password-recovery.confirm.code_again") }}
        <span v-if="isTimer">({{ isTimer }} {{ t("password-recovery.confirm.second") }})</span>
      </div>
    </div>
    <div class="sign-up-confirm__footer">
      <div class="sign-up-confirm__back" @click="goStepBack">{{ t("password-recovery.back") }}</div>
      <div v-if="isPhone" class="sign-up-confirm__btn btn-primary" @click="sendConfirmCode">
        {{ t("password-recovery.continue") }}
      </div>
      <div v-else class="sign-up-confirm__btn btn-primary" @click="sendConfirmEmail">
        {{ t("password-recovery.confirm.check_mail") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
