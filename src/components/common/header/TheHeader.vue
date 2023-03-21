<script setup lang="ts">
import IconLogoShort from "@/components/icons/icons-all/IconLogoShort.vue";
import VSearch from "@/components/UI/v-search/VSearch.vue";
import { computed, ref } from "vue";
import IconCarret from "@/components/icons/icons-all/IconCarret.vue";
import { useAuthStore } from "@/stores/auth";
import User from "@/assets/images/user.webp";
import IconBell from "@/components/icons/icons-all/IconBell.vue";
import IconMessage from "@/components/icons/icons-all/IconMessage.vue";
import { vOnClickOutside as vOnClickOutside } from "@vueuse/components";
import DropDownUser from "@/components/common/header/components/drop-down-lists/drod-down-user/DropDownUser.vue";
import DropDownNotice from "@/components/common/header/components/drop-down-lists/drod-down-notice/DropDownNotice.vue";
import DropDownMessage from "@/components/common/header/components/drop-down-lists/drod-down-message/DropDownMessage.vue";
import DropDownFeed from "@/components/common/header/components/drop-down-lists/drod-down-feed/DropDownFeed.vue";

const authStore = useAuthStore();

const searchQuery = ref("");

const burgerActive = ref(false);

const openNewsLine = () => {
  burgerActive.value = !burgerActive.value;
};

const createOpen = ref(false);

const openCreate = (): void => {
  createOpen.value = !createOpen.value;
};

const feed = ref<HTMLElement | null>(null);

const feedWidth = computed(() => {
  if (feed.value) return `${feed.value.offsetWidth}px`;
  return "";
});

const createList = [
  { id: 0, title: "Пост" },
  { id: 1, title: "Компанию" },
  { id: 2, title: "Событие" },
];

const closeModalCreate = (): void => {
  createOpen.value = false;
};

const closeModalFeed = (): void => {
  burgerActive.value = false;
};

const isDropDownUser = ref(false);

const openUser = (): void => {
  isDropDownUser.value = !isDropDownUser.value;
};

const closeModalProfile = (): void => {
  isDropDownUser.value = false;
};

const showDropDownNotice = ref(false);

const closeNotice = (): void => {
  showDropDownNotice.value = false;
};

const openNotice = (): void => {
  showDropDownNotice.value = !showDropDownNotice.value;
};

const activeIcon = computed(() => {
  if (showDropDownNotice.value || isOpenMessage.value) return { fill: "#0B6D3B" };
  return { fill: "#2C323A" };
});

const isOpenMessage = ref(false);

const openListMessage = (): void => {
  isOpenMessage.value = !isOpenMessage.value;
};

const closeMessage = (): void => {
  isOpenMessage.value = false;
};
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <IconLogoShort />
      </div>
      <div class="header__title">
        <span>Network</span>
      </div>
      <VSearch class="header__search" v-model="searchQuery" />
      <div class="header__auth" v-if="!authStore.isAuth">
        <span>Вход | регистрация</span>
      </div>
      <div v-else class="header__wrapper">
        <div class="header__create" @click="openCreate" v-on-click-outside="closeModalCreate">
          <span class="header__create-title">Создать</span>
          <span class="header__create-icon" :class="{ 'icon--active': createOpen }">
            <IconCarret />
          </span>

          <div v-show="createOpen" class="header__create-list" @click.stop>
            <div class="header__create-item" v-for="item of createList" :key="item.id">
              {{ item.title }}
            </div>
            <div class="header__create-rectangle"></div>
          </div>
        </div>

        <div class="header__profile" @click="openUser" v-on-click-outside="closeModalProfile">
          <div class="header__profile-avatar">
            <img class="header__profile-avatar-img" :src="User" alt="avatar" />
          </div>
          <IconCarret class="header__profile-icon" :class="{ 'icon--active': isDropDownUser }" />
          <DropDownUser v-show="isDropDownUser" @click.stop class="header__profile-drop-down-list" />
        </div>
        <div class="header__notice" @click="openNotice" v-on-click-outside="closeNotice">
          <IconBell :style="activeIcon" class="header__notice-icon" />
          <DropDownNotice v-show="showDropDownNotice" class="header__notice-drop-down-list" @click.stop />
        </div>
        <div class="header__message" @click="openListMessage" v-on-click-outside="closeMessage">
          <IconMessage :style="activeIcon" class="header__message-icon" />
          <div class="header__message-count">
            <span>1</span>
          </div>
          <DropDownMessage v-show="isOpenMessage" class="header__message-drop-down-list" />
        </div>
      </div>

      <div
        class="header__feed"
        :class="{ 'header__feed--open': burgerActive }"
        v-on-click-outside="closeModalFeed"
        @click="openNewsLine"
        ref="feed"
      >
        <div class="header__feed-burger" :class="{ 'header__feed-burger--active': burgerActive }">
          <div></div>
        </div>
        <span class="header__feed-title">Лента</span>
        <DropDownFeed v-show="burgerActive" class="header__feed-drop-down-list" :style="{ width: feedWidth }" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped src="./styles.scss" />
