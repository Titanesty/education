<script lang="ts" setup>
import IconUser from "@/components/icons/icons-all/IconUser.vue";
import IconUsers from "@/components/icons/icons-all/IconUsers.vue";
import IconBookmark from "@/components/icons/icons-all/IconBookmark.vue";
import IconBook from "@/components/icons/icons-all/IconBook.vue";
import IconLogout from "@/components/icons/icons-all/IconLogout.vue";
import IconFilePlus from "@/components/icons/icons-all/IconFilePlus.vue";
import IconSettings from "@/components/icons/icons-all/IconSettings.vue";
import { DropDownList } from "@/components/common/header/components/drop-down-lists/drod-down-user/types";

const dropDownList: DropDownList[] = [
  { id: 0, title: "Мой профиль", icon: IconUser },
  { id: 1, title: "Подписчики", icon: IconUsers },
  { id: 2, title: "Избранное", icon: IconBookmark },
  { id: 3, title: "Подписки", icon: IconFilePlus },
  { id: 4, title: "Настройки", icon: IconSettings },
  { id: 5, title: "AHUB Account", icon: IconBook },
  { id: 6, title: "Выйти", icon: IconLogout },
];
</script>

<template>
  <div class="drop-down-user">
    <div class="drop-down-user__list">
      <div class="drop-down-user__item" v-for="item of dropDownList" :key="item.id">
        <component :is="item.icon"></component>
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div class="drop-down-user__rectangle"></div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
