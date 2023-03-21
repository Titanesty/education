<script lang="ts" setup>
import IconSearch from "@/components/icons/icons-all/IconSearch.vue";

interface SearchProps {
  modelValue: string;
}

const props = defineProps<SearchProps>();
</script>

<template>
  <div class="search">
    <label class="search__label">
      <IconSearch class="search__icon" />
      <input class="search__input" type="text" placeholder="Поиск..." :value="modelValue" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.search {
  background: $gray50;
  border-radius: 5px;
  overflow: hidden;

  &__label {
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }

  &__icon {
    margin-right: 16px;
    cursor: pointer;
  }

  &__input {
    width: 100%;
    background-color: transparent;

    &::placeholder {
      line-height: 16px;
      color: $gray500;
      font: {
        family: "SF Pro Display", sans-serif;
        size: 14px;
        style: normal;
        weight: 300;
      }
    }

    &:focus::placeholder {
      color: transparent;
    }
  }
}
</style>
