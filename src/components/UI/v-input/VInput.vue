<script lang="ts" setup>
import { computed, ref } from "vue";
import IconEyeOff from "@/components/icons/icons-all/IconEyeOff.vue";
import IconEyeOn from "@/components/icons/icons-all/IconEyeOn.vue";
import { regexPhone } from "@/views/login-and-reg/helpers/regex.intex";
import IconVerify from "@/components/icons/icons-all/IconVerify.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

interface IModelModifiers {
  telemail: boolean;
}

interface IInputProps {
  modelValue: string | number | null;
  typeProps: string;
  error?: boolean;
  errorText?: string;
  modelModifiers?: IModelModifiers;
  customPlaceholder?: string;
  verify?: boolean;
  safety?: number;
}

const props = defineProps<IInputProps>();

interface IInputEmits {
  (e: "update:modelValue", newValue: string | number): void;
}

const emits = defineEmits<IInputEmits>();

const valueMaskMobile = computed(() => {
  if (props.modelModifiers?.telemail && props.modelValue) {
    if (String(props.modelValue).match(regexPhone)) {
      return `+ 7 (${String(props.modelValue).substring(1, 4)}) ${String(props.modelValue).substring(4, 7)}-${String(
        props.modelValue
      ).substring(7, 9)}-${String(props.modelValue).substring(9, 12)}`;
    }
  }

  return props.modelValue;
});

const onInput = (event: Event): void => {
  let value: string | number = (event.target as HTMLInputElement).value;
  const numberValue = value.replace(/^\D$/g, "");
  if (props.modelModifiers?.telemail) {
    if (value.match(regexPhone) || numberValue.match(regexPhone)) {
      value = Number(`7${value.replace(/\D/g, "").substring(1, 11)}`);
    } else {
      value = `${value.replace(/[^a-z\d.@]/g, "")}`;
    }
  }
  emits("update:modelValue", value);
};

const isPassword = computed(() => {
  return props.typeProps === "password";
});

const isIconEyeOn = computed(() => {
  return isPassword.value && isShow.value;
});

const isIconEyeOff = computed(() => {
  return isPassword.value && !isShow.value;
});

const isShow = ref<boolean>(false);

const showPassword = (): void => {
  isShow.value = !isShow.value;
};

const isVerify = computed(() => {
  return props.verify;
});

const typeInput = computed(() => {
  if (props.typeProps === "password" && isShow.value) return "text";
  if (props.typeProps === "password" && !isShow.value) return "password";
  return "text";
});

const safetyBar = computed(() => {
  return props.safety && props.modelValue;
});

const classBar = computed(() => ({
  "text-field__bar-item--vweak": props.safety === 1,
  "text-field__bar-item--weak": props.safety === 2,
  "text-field__bar-item--medium": props.safety === 3,
  "text-field__bar-item--moderate": props.safety === 4,
  "text-field__bar-item--good": props.safety === 5,
  "text-field__bar-item--strong": props.safety === 6,
}));

const textBar = computed(() => {
  if (props.safety === 4) return t("safety-bar.medium_password");
  if (props.safety === 5 || props.safety === 6) return t("safety-bar.strong_password");
  return t("safety-bar.weak_password");
});
</script>

<template>
  <div class="text-field">
    <div class="text-field__wrapper" :class="{ 'text-field--error': error }">
      <input
        class="text-field__input"
        v-bind="$attrs"
        :type="typeInput"
        placeholder=" "
        :value="valueMaskMobile"
        @input="onInput"
      />
      <IconEyeOff v-if="isIconEyeOn" class="text-field__icon" @click="showPassword" />
      <IconEyeOn v-if="isIconEyeOff" class="text-field__icon" @click="showPassword" />
      <IconVerify v-if="isVerify" class="text-field__icon" />
      <div v-if="safetyBar" class="text-field__bar">
        <span class="text-field__bar-item" :class="classBar" v-for="n of 6" :key="n"></span>
      </div>
      <span class="text-field__float">{{ customPlaceholder }}</span>
    </div>
    <div v-if="error || safetyBar" class="text-field__text">
      <div v-if="error" class="text-field__text--error">{{ errorText }}</div>
      <div v-if="safetyBar" class="text-field__text--safety">{{ textBar }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
