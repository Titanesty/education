<script setup lang="ts">
import IconSettings from "@/components/icons/icons-all/IconSettings.vue";
import User from "@/assets/images/user.webp";
import IconMoreHorizontal from "@/components/icons/icons-all/IconMoreHorizontal.vue";
import { NoticeList } from "@/components/common/header/components/drop-down-lists/drod-down-notice/types";

const noticeList: NoticeList[] = [
  {
    id: 0,
    title: "Алексей Алексеев",
    description: "хочет добавить вас в друзья",
    date: "28 ноября, 20:40",
    type: "friend",
  },
  {
    id: 1,
    title: "Алексей Алексеев",
    description: "хочет добавить вас в друзья",
    date: "28 ноября, 20:40",
    type: "mention",
  },
  {
    id: 2,
    title: "Алексей Алексеев",
    description: "хочет добавить вас в друзья",
    date: "28 ноября, 20:40",
    type: "friend",
  },
  {
    id: 3,
    title: "Алексей Алексеев",
    description: "хочет добавить вас в друзья",
    date: "28 ноября, 20:40",
    type: "friend",
  },
  {
    id: 4,
    title: "Алексей Алексеев",
    description: "хочет добавить вас в друзья",
    date: "28 ноября, 20:40",
    type: "friend",
  },
];
</script>

<template>
  <div class="drop-down-notice">
    <div class="drop-down-notice__list">
      <div class="drop-down-notice__item" v-for="item of noticeList" :key="item.id">
        <div class="drop-down-notice__userpick">
          <img class="drop-down-notice__userpick-img" :src="User" alt="user" />
        </div>
        <div class="drop-down-notice__right-side">
          <div class="drop-down-notice__item-title">
            <span>{{ item.title }}</span>
            <span>{{ item.description }}</span>
          </div>
          <div class="drop-down-notice__item-date">{{ item.date }}</div>
          <div class="drop-down-notice__wrapper">
            <div class="drop-down-notice__btn">
              <span>Отклонить</span>
            </div>
            <div class="drop-down-notice__btn">
              <span>Добавить</span>
            </div>
          </div>
        </div>
        <div class="drop-down-notice__more">
          <IconMoreHorizontal class="drop-down-notice__more-icon" />
        </div>
      </div>
    </div>
    <div class="drop-down-notice__footer">
      <div class="drop-down-notice__footer-title">Все уведомления</div>
      <IconSettings class="drop-down-notice__footer-icon" />
    </div>
    <div class="drop-down-notice__rectangle"></div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
