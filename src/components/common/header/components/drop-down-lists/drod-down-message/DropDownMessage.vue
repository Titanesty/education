<script lang="ts" setup>
import IconSettings from "@/components/icons/icons-all/IconSettings.vue";
import User from "@/assets/images/user.webp";
import IconMoreHorizontal from "@/components/icons/icons-all/IconMoreHorizontal.vue";
import { MessageList } from "@/components/common/header/components/drop-down-lists/drod-down-message/types";

const messageList: MessageList[] = [
  { id: 0, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
  { id: 1, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
  { id: 2, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
  { id: 3, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
  { id: 4, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
  { id: 5, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
  { id: 6, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
  { id: 7, name: "Pat Flores", lastMessage: "Последнее что я писал когда-то тебе" },
];
</script>

<template>
  <div class="drop-down-message">
    <div class="drop-down-message__list">
      <div class="drop-down-message__item" v-for="item of messageList" :key="item.id">
        <div class="drop-down-message__userpick">
          <img :src="User" alt="user" class="drop-down-message__userpick-img" />
        </div>
        <div class="drop-down-message__wrapper">
          <div class="drop-down-message__name">{{ item.name }}</div>
          <div class="drop-down-message__message">{{ item.lastMessage }}</div>
        </div>
        <div class="drop-down-message__inner">
          <div class="drop-down-message__badge">
            <span>1</span>
          </div>
          <IconMoreHorizontal class="drop-down-message__more" />
        </div>
      </div>
    </div>
    <div class="drop-down-message__footer">
      <div class="drop-down-message__footer-title">Открыть мессенджер</div>
      <IconSettings class="drop-down-message__footer-icon" />
    </div>
    <div class="drop-down-message__rectangle"></div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
