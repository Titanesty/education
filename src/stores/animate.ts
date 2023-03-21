import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnimateStore = defineStore("animate", () => {
  const isAnimate = ref<boolean>(false);

  return { isAnimate };
});
