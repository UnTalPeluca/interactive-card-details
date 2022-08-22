<template>
  <div class="w-72 xl:w-112 rounded-xl xl:shadow-card">
    <div class="relative">
      <img class="pointer-events-none w-full" src="@/assets/images/bg-card-back.png" alt="">
      <div class="absolute top-1/2 -translate-y-1/2 right-0 left-0 mx-auto w-9/12 text-right text-3xs text-white tracking-widest
        xl:text-sm">
        {{ eCvc }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  cvc: {
    type: String,
    default: "000",
    required: true
  }
})
const eCvc = computed(() => {
  return ('000' + props.cvc).slice(-3);
})
</script>