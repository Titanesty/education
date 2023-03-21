import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n, useI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import { languages } from "@/i18n/locales";
import { useLocaleStore } from "@/stores/locale";
import "./assets/styles/main.scss";

const messages = Object.assign(languages);
const app = createApp(App, {
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
app.use(createPinia());
const localeStore = useLocaleStore();

const i18n = createI18n({
  legacy: false,
  locale: localeStore.isLocale,
  fallbackLocale: "ru",
  messages,
});

app.use(i18n);
app.use(router);
app.mount("#app");
