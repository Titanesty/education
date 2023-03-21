<script setup lang="ts">
interface IconBaseProps {
  iconName: string;
  width: number | string;
  height: number | string;
  iconColor: string;
  viewBox: string;
}
const props = withDefaults(defineProps<IconBaseProps>(), {
  viewBox: "0 0 24 24",
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    :viewBox="props.viewBox"
    :aria-labelledby="iconName"
    role="img"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<style scoped lang="scss" src="./styles.scss" />
