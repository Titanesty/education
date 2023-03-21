<script setup lang="ts">
import { IIconsSocial } from "@/views/login-and-reg/pages/sign-up/types";
import IconGoogle from "@/components/icons/icons-all/IconGoogle.vue";
import IconFacebook from "@/components/icons/icons-all/IconFacebook.vue";
import IconIn from "@/components/icons/icons-all/IconIn.vue";
import IconTwitter from "@/components/icons/icons-all/IconTwitter.vue";

const iconsSocial: IIconsSocial[] = [
  { id: 0, icon: IconGoogle, url: "#" },
  { id: 1, icon: IconFacebook, url: "#" },
  { id: 2, icon: IconIn, url: "#" },
  { id: 3, icon: IconTwitter, url: "#" },
];
</script>

<template>
  <div class="social">
    <div class="social-list">
      <div class="social-item" v-for="item of iconsSocial" :key="item.id">
        <a class="social-link" target="_blank" rel="noopener noreferrer" :href="item.url">
          <Component class="sign-up__social-icon" :is="item.icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
