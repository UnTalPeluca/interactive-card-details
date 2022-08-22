<template>
  <div class="flex flex-col items-center gap-10">
    <div>
      <img src="@/assets/images/icon-complete.svg" alt="">
    </div>
    <div class="text-center">
      <p class="tracking-widest text-3xl text-deep-violet">THANK YOU!</p>
      <p class="text-purplish-grey">We’ve added your card details</p>
    </div>
    <PrimaryButton>Continue</PrimaryButton>
  </div>
</template>

<script setup>
import PrimaryButton from '../base/primaryButton.vue';

</script>