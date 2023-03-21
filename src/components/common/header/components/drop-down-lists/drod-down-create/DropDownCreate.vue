<script setup lang="ts"></script>
<template>
  <div v-show="createOpen" class="header__create-list" @click.stop>
    <div class="header__create-item" v-for="item of createList" :key="item.id">
      {{ item.title }}
    </div>
    <div class="header__create-rectangle"></div>
  </div>
</template>
<style lang="scss" scoped src="./styles.scss" />
