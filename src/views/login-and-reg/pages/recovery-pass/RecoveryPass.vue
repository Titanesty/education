<script setup lang="ts">
import IconClose from "@/components/icons/icons-all/IconClose.vue";
import EmailMobInput from "@/views/login-and-reg/pages/recovery-pass/steps/email-mob-input/EmailMobInput.vue";
import { RouterName } from "@/router/router-name";
import { ref } from "vue";
import ConfirmationCode from "@/views/login-and-reg/pages/recovery-pass/steps/confirmation-code/ConfirmationCode.vue";
import SuccessChange from "@/views/login-and-reg/pages/recovery-pass/steps/success-change/SuccessChange.vue";
import CreatePassword from "@/views/login-and-reg/pages/recovery-pass/steps/create-password/CreatePassword.vue";
import { IEmailOrPhone } from "@/views/login-and-reg/pages/recovery-pass/steps/types";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
const stepForm = ref<number>(0);
const emailOrPhone = ref<IEmailOrPhone | null>(null);

const stepArray: string[] = [EmailMobInput, ConfirmationCode, CreatePassword, SuccessChange];
</script>

<template>
  <div class="recovery">
    <div class="recovery__container">
      <div class="recovery__wrapper">
        <div class="recovery__inner">
          <div class="recovery__header">
            <div class="recovery__header-title">{{ t("password-recovery.password_recovery") }}</div>
            <router-link class="recovery__header-icon" :to="{ name: RouterName.SIGN_IN }">
              <IconClose />
            </router-link>
          </div>
          <div class="recovery__content">
            <component :is="stepArray[stepForm]" v-model:step="stepForm" v-model:emailOrPhone="emailOrPhone" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
