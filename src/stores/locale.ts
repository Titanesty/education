import { defineStore } from "pinia";
import { ref } from "vue";
import { defaultLocale } from "@/i18n/locales";

export const useLocaleStore = defineStore("locale", () => {
  const isLocale = ref<string>(localStorage.getItem("locale") || defaultLocale);

  return { isLocale };
});
