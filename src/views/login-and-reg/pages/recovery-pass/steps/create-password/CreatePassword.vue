<script setup lang="ts">
import VInput from "@/components/UI/v-input/VInput.vue";
import { computed, reactive } from "vue";
import { IPasswordData } from "@/views/login-and-reg/pages/recovery-pass/steps/create-password/types";
import { RouterName } from "@/router/router-name";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import { IEmailOrPhone } from "@/views/login-and-reg/pages/recovery-pass/steps/types";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

interface ICreatePasswordProps {
  step: number;
  emailOrPhone: IEmailOrPhone;
}

const props = defineProps<ICreatePasswordProps>();

interface ICreatePasswordEmits {
  (e: "update:step", newValue: number): void;
}

const emits = defineEmits<ICreatePasswordEmits>();

const passwordData = reactive<IPasswordData>({
  password: "",
  confirmPassword: "",
});

const rules = computed(() => ({
  password: { required },
  confirmPassword: { required, sameAsPassword: sameAs(passwordData.password) },
}));

const v$ = useVuelidate(rules, passwordData);

const changePassword = (): void => {
  v$.value.$validate();
  if (v$.value.$error) return;
  emits("update:step", 3);
};

const textPasswordError = computed(() => {
  if (v$.value.password.required.$invalid) return t("errors.required");
  return "";
});

const textConfirmPasswordError = computed(() => {
  if (v$.value.confirmPassword.required.$invalid) return t("errors.required");
  return t("errors.password_mismatch");
});

const btnEffect = computed(() => {
  if (v$.value.$error) return "btn-primary--disabled";
  return "btn-primary";
});

const getComplexityPassword = (value: string): number => {
  const characterLength: boolean = value.length >= 8;
  const characterSpecial = !!value.match(/~|!|@|#|\$|%|\^|&|\*|_|-|\+|=|'|\||\(|\)|\{|}|\[|]|:|;|"|<|>|,|\.|\?|\//g);
  const characterCapital = !!value.match(/[A-Z]/g);
  const characterNumber = !!value.match(/\d/g);
  const characterLowercase = !!value.match(/[a-z]/g);
  const equalsConfirmPass = value === passwordData.confirmPassword;

  const countOverlap: boolean[] = [
    characterLength,
    characterSpecial,
    characterCapital,
    characterNumber,
    characterLowercase,
    equalsConfirmPass,
  ];

  return countOverlap.filter((item) => item).length;
};

const messageEmailOrPhone = computed(() => {
  if (props.emailOrPhone.type === "phone") return `+${props.emailOrPhone.value}`;
  return props.emailOrPhone.value;
});
</script>

<template>
  <div class="create-form-data">
    <div class="create-form-data__content">
      <div class="create-form-data__title">
        {{ t("password-recovery.create-password.create_password") }}
      </div>
      <div class="create-form-data__desc">
        {{ t("password-recovery.create-password.desc_after") }}
        {{ messageEmailOrPhone }}.
        {{ t("password-recovery.create-password.desc_before") }}
      </div>
      <VInput
        class="create-form-data__input"
        type-props="password"
        :custom-placeholder="t('password')"
        v-model="passwordData.password"
        :error="v$.password.$error"
        :safety="getComplexityPassword(passwordData.password)"
        :error-text="textPasswordError"
        @keydown.enter="changePassword"
      />
      <VInput
        class="create-form-data__input"
        type-props="password"
        :custom-placeholder="t('password-recovery.create-password.confirm_password')"
        v-model="passwordData.confirmPassword"
        :error="v$.confirmPassword.$error"
        :error-text="textConfirmPasswordError"
        :safety="getComplexityPassword(passwordData.password)"
        @keydown.enter="changePassword"
      />
    </div>

    <div class="create-form-data__footer">
      <div class="create-form-data__back">
        <router-link class="create-form-data__back-link" :to="{ name: RouterName.SIGN_IN }">
          {{ t("password-recovery.cancel") }}
        </router-link>
      </div>
      <div class="create-form-data__btn" :class="btnEffect" @click="changePassword">
        {{ t("password-recovery.continue") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
