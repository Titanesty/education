import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isKeep = ref<boolean>(false);

  const isAuth = ref<boolean>(true);

  return { isAuth, isKeep };
});
