<template>
  <div class="w-72 xl:w-112 xl:shadow-card rounded-xl">
    <div class="relative">
      <img class="w-full" src="@/assets/images/bg-card-front.png" alt="">
      <div class="tracking-widest h-full w-full absolute top-0 left-0 p-4 flex flex-col justify-between
      xl:p-8">
        <div>
          <img class="h-7 xl:h-12" src="@/assets/images/card-logo.svg" alt="">
        </div>
        <div class="flex flex-col gap-4 text-white xl:gap-6">
          <p class="text-lg xl:text-3xl tracking-widest">{{ eCardNumber }}</p>
          <div class="flex justify-between text-3xs xl:text-sm">
            <p class="uppercase truncate w-6/12">{{ eCardName }}</p>
            <p>{{ eMonth }}/{{ eYear }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  cardName: {
    type: String,
    default: "JANE APPLESSED",
  },
  cardNumber: {
    type: String,
    default: '0000 0000 0000 0000'
  },
  cardExpMonth: {
    type: String,
    default: '00'
  },
  cardExpYear: {
    type: String,
    default: '00'
  }
})
const eCardNumber = computed(() => {
  return (props.cardNumber?.trim().length === 0) ? '0000 0000 0000 0000' : formatCardNumber.value
})
const eCardName = computed(() => {
  return (props.cardName?.trim().length === 0) ? 'Jane Applessed' : props.cardName
})
const eMonth = computed(() => {
  return ('00' + props.cardExpMonth).slice(-2);
})
const eYear = computed(() => {
  return ('00' + props.cardExpYear).slice(-2);
})
const formatCardNumber = computed(() => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
  const noLetters = props.cardNumber?.replace(/^([^0-9]*)$/)
  const onlyNumbers = noLetters?.replace(/[^\d]/g, '')
  const leadingZeros = (onlyNumbers + '0'.repeat(16)).slice(0, 16)
  return leadingZeros?.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter(group => !!group).join(' ')
  )
})
</script>