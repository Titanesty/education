<script lang="ts" setup>
import TheHeader from "@/components/common/header/TheHeader.vue";
</script>

<template>
  <div class="layout-default">
    <TheHeader class="layout-default__header" />
    <div class="layout-default__main">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-default {
}
</style>
