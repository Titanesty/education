<script lang="ts" setup>
import IconPlusCircle from "@/components/icons/icons-all/IconPlusCircle.vue";
import IconDot from "@/components/icons/icons-all/IconDot.vue";
import { useRouter, useRoute } from "vue-router";
import { RouterName } from "@/router/router-name";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "@/stores/locale";
import { IFooterItem } from "@/views/login-and-reg/components/footer-mob/types";

const { t } = useI18n({ useScope: "global" });
const localeStore = useLocaleStore();

const router = useRouter();
const route = useRoute();

const footerItem: IFooterItem[] = [
  { id: 0, locale: "en", name: "English" },
  { id: 1, locale: "esp", name: "Español" },
  { id: 2, locale: "ru", name: "Русский" },
  { id: 3, name: IconPlusCircle },
  { id: 4, name: IconDot },
  { id: 5, name: t("footer.about_us") },
  { id: 6, name: t("footer.reference") },
  { id: 7, name: t("footer.news_line") },
  { id: 8, name: t("footer.people") },
  { id: 9, name: t("footer.job") },
  { id: 10, name: t("footer.events") },
  { id: 11, name: t("footer.groups") },
];

const isComponent = (item: IFooterItem): boolean => {
  return item.name === IconPlusCircle || item.name === IconDot;
};

const isCurrentPage = computed(() => {
  return String(route.name);
});

const selectLanguage = (item: string): void => {
  if (item === IconDot) return;
  router.push({ name: RouterName.LANGUAGES, query: { page: isCurrentPage.value } });
};

const isActive = (item: IFooterItem): boolean => {
  return item.locale === localeStore.isLocale;
};
</script>

<template>
  <div class="footer-auth">
    <div class="footer-auth__list">
      <div
        class="footer-auth__item"
        :class="{ 'footer-mob__item-icon': isComponent(item), 'footer-mob__item--active': isActive(item) }"
        v-for="item of footerItem"
        :key="item.id"
      >
        <Component v-if="isComponent(item)" :is="item.name" @click="selectLanguage(item.name)" />
        <span v-else>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./styles.scss" />
