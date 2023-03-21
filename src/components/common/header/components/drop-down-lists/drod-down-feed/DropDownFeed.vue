<script setup lang="ts">
import { FeedList } from "@/components/common/header/components/drop-down-lists/drod-down-feed/types";
import IconMenu from "@/components/icons/icons-all/IconMenu.vue";
import IconRu from "@/components/icons/icons-all/IconRu.vue";
import { ref } from "vue";
import IconLogoShort from "@/components/icons/icons-all/IconLogoShort.vue";
import { vOnClickOutside as vOnClickOutside } from "@vueuse/components";

const feedList: FeedList[] = [
  { id: 0, title: "Компании" },
  { id: 1, title: "Люди" },
  { id: 2, title: "События" },
  {
    id: 3,
    title: "Сервисы",
    icon: IconMenu,
    sublist: [
      { id: 0, title: "Job", icon: IconLogoShort },
      { id: 1, title: "Payment", icon: IconLogoShort },
      { id: 2, title: "Logistics", icon: IconLogoShort },
      { id: 3, title: "Analytics", icon: IconLogoShort },
      { id: 4, title: "Virtual Office", icon: IconLogoShort },
      { id: 5, title: "Все сервисы" },
    ],
  },
  {
    id: 4,
    title: "Язык",
    icon: IconRu,
    sublist: [
      { id: 0, title: "Русский" },
      { id: 1, title: "English" },
      { id: 2, title: "Espanol" },
      { id: 3, title: "Другие" },
    ],
  },
];

const showSubListService = ref(false);
const showSubListLang = ref(false);

const openSubList = (id: number): void => {
  if (id === 3) {
    showSubListLang.value = false;
    showSubListService.value = !showSubListService.value;
  }
  if (id === 4) {
    showSubListService.value = false;
    showSubListLang.value = !showSubListLang.value;
  }
};

const showSubList = (id: number): boolean => {
  if (showSubListService.value && id === 3) return true;
  return showSubListLang.value && id === 4;
};

const closeSubList = (): void => {
  showSubListService.value = false;
  showSubListLang.value = false;
};
</script>
<template>
  <div class="drop-down-feed">
    <div class="drop-down-feed__list" @click.stop>
      <div
        class="drop-down-feed__item"
        :class="{ 'drop-down-feed__item--active': showSubList(item.id) }"
        v-for="item of feedList"
        :key="item.id"
        @click="openSubList(item.id)"
      >
        <component :is="item.icon" />
        {{ item.title }}

        <div v-if="showSubList(item.id)" class="drop-down-feed__sublist" v-on-click-outside="closeSubList">
          <div class="drop-down-feed__sublist-item" @click.stop v-for="subItem of item.sublist" :key="subItem.id">
            <component :is="subItem.icon" />
            {{ subItem.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./styles.scss" />
