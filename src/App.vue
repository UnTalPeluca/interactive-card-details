<template>
  <main>
    <div class="flex flex-col gap-22 min-h-screen xl:flex-row xl:justify-between xl:items-center xl:gap-40">
      <div class="cards-section h-60 xl:h-screen xl:w-5/12 xl:max-w-483">
        <div class="max-w-xs mx-auto relative h-full w-full sm:max-w-xl">
          <CardBack class="absolute top-8 -right-1 xl:-right-56 xl:top-1/2 xl:mt-4" :cvc="card.userData.cvc" />
          <CardFront class="absolute -bottom-10 -left-1 xl:left-auto xl:-right-1/4 xl:bottom-1/2 xl:mb-5"
            :cardName="card.userData.name" :cardNumber="card.userData.card" :cardExpMonth="card.userData.expMonth"
            :cardExpYear="card.userData.expYear" />
        </div>
      </div>
      <div class="mx-auto w-11/12 pb-8 sm:pb-12 max-w-xs sm:max-w-lg xl:pb-0 xl:max-w-sm xl:w-1/2">
        <CardForm />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useCardFormStore } from '@/store/cardForm';
import CardForm from '@/assets/components/form/cardForm.vue';
import CardFront from '@/assets/components/cardFront.vue';
import CardBack from '@/assets/components/cardBack.vue';

const card = useCardFormStore()
</script>

<style>
.cards-section {
  background-image: url(./assets/images/bg-main-mobile.png);
  background-size: auto;
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (min-width:1024px) {
  .cards-section {
    background-image: url(./assets/images/bg-main-desktop.png);
  }
}
</style>
