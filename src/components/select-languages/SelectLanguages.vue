<script setup lang="ts">
import IconClose from "@/components/icons/icons-all/IconClose.vue";
import { ILanguagesList } from "@/components/select-languages/types";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "@/stores/locale";

const localeStore = useLocaleStore();

const { t, locale } = useI18n({ useScope: "global" });

const route = useRoute();
const router = useRouter();

const languagesList: ILanguagesList[] = [
  { id: 0, locale: "en", lang: "English" },
  { id: 1, locale: "esp", lang: "Español" },
  { id: 2, locale: "ru", lang: "Русский" },
  { id: 3, locale: "it", lang: "Italiano" },
  { id: 4, locale: "deu", lang: "Deutsch" },
  { id: 5, locale: "turk", lang: "Türk" },
  { id: 6, locale: "port", lang: "Português" },
  { id: 7, locale: "ch", lang: "中国人" },
  { id: 9, locale: "som", lang: "Af-Soomaali" },
  { id: 10, locale: "afr", lang: "Afrikaans" },
  { id: 11, locale: "az", lang: "Azərbaycan" },
  { id: 12, locale: "dili", lang: "dili" },
  { id: 13, locale: "baha", lang: "Bahasa" },
  { id: 14, locale: "ind", lang: "Indonesia" },
  { id: 15, locale: "bah", lang: "Bahasa" },
  { id: 16, locale: "mel", lang: "Melayu" },
  { id: 17, locale: "basa", lang: "Basa" },
  { id: 18, locale: "jawa", lang: "Jawa" },
];

const isActiveLang = (item: ILanguagesList): boolean => {
  return localeStore.isLocale === item.locale;
};

const changeActiveLang = (item: ILanguagesList): void => {
  locale.value = item.locale;
  localeStore.isLocale = item.locale;
  localStorage.setItem("locale", item.locale);
};

const goBack = (): void => {
  router.push({ name: String(route.query.page) });
};
</script>
<template>
  <div class="languages">
    <div class="languages__wrapper">
      <div class="languages__content">
        <div class="languages__header">
          <div class="languages__header-title">{{ t("lang.title") }}</div>
          <div class="languages__header-icon" @click="goBack">
            <IconClose />
          </div>
        </div>
        <div class="languages__desc">
          {{ t("lang.desc") }}
        </div>
      </div>

      <div class="languages__inner">
        <div class="languages__list">
          <div
            class="languages__item"
            :class="{ 'languages__item--active': isActiveLang(item) }"
            v-for="item of languagesList"
            :key="item.id"
            @click="changeActiveLang(item)"
          >
            {{ item.lang }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
