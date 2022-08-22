<template>
  <div>
    <form v-if="!submitSuccess" @submit.prevent="onSubmit" class="flex flex-wrap gap-4 sm:gap-8">
      <BaseInput title="CARDHOLDER NAME" inputName="name" v-model="nameValue" :error="nameError"
        placeholder="e.g. Jane Appleseed" />
      <BaseInput length="16" @focusin="onFocusInCard" @focusout="onFocusOutCard" title="CARD NUMBER"
        inputName="cardNumber" v-model="cardValue" :error="cardError" placeholder="e.g. 1234 5678 9123 0000" />
      <div class="flex items-center gap-2.5">
        <div class="flex flex-col w-6/12">
          <label for="expMonth" class="cursor-pointer pb-2 capitalize text-xs tracking-widest">EXP. DATE (MM/YY)</label>
          <div class="flex gap-2 relative">
            <BaseInput @focusout="formatMonth" length="2" inputName="expMonth" v-model="expMonthValue"
              :error="expMonthError" placeholder="MM" :showError="false" />
            <BaseInput length="2" inputName="expYear" v-model="expYearValue" :error="expYearError" placeholder="YY"
              :showError="false" />
            <small v-if="expMonthError || expYearError" class="text-light-red text-xs pt-2 absolute
              top-full">
              {{ expMonthError ? expMonthError : expYearError }}
            </small>
          </div>
        </div>
        <BaseInput length="3" class="w-6/12" type="number" title="CVC" placeholder="e.g. 123" v-model="cvcValue"
          :error="cvcError" />
      </div>
      <PrimaryButton class="mt-4">Confirm</PrimaryButton>
    </form>
    <CardSubmit v-else />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useField, useForm } from 'vee-validate';
import { number, object, string } from 'yup';
import { useCardFormStore } from '@/store/cardForm';
import PrimaryButton from '../base/primaryButton.vue';
import BaseInput from '../base/baseInput.vue';
import CardSubmit from './cardSubmit.vue';
const formStore = useCardFormStore()

const cardFocus = ref(true)
const submitSuccess = ref(false)

// Error Messages
const errorMsg = {
  required: "Can't be empty",
  invalidNumber: "Wrong format, numbers only",
  invalidString: "Wrong format, numbers not allowed",
  cvcLength: "Must have 3 digits",
  invalidMonth: "Must be a valid month",
  invalidYear: "Must be a valid year",
  cardMinLength: "Must be 16 digit card"
}
// Form Schema
const schema = computed(() => {
  return object({
    name: string().matches(/^([^0-9]*)$/, errorMsg.invalidString).required(errorMsg.required),
    expMonth: number().integer(errorMsg.invalidNumber).typeError(errorMsg.invalidNumber).min(1, errorMsg.invalidMonth).max(12, errorMsg.invalidMonth).nullable().transform((value, originalValue) => originalValue.trim() === "" ? null : value).required(errorMsg.required),
    expYear: number().integer(errorMsg.invalidNumber).typeError(errorMsg.invalidNumber).min(22, errorMsg.invalidYear).nullable().transform((value, originalValue) => originalValue.trim() === "" ? null : value).required(errorMsg.required),
    cvc: string().min(3, errorMsg.cvcLength).matches(/^[0-9]+$/, errorMsg.invalidNumber).required(errorMsg.required),
    card: cardFocus.value ? cardNumberValidation.focus : cardNumberValidation.notFocus
  })
})

const cardNumberValidation = {
  focus: string().min(16, errorMsg.cardMinLength).matches(/^[0-9]+$/, errorMsg.invalidNumber).required(errorMsg.required),
  notFocus: string().min(19, errorMsg.cardMinLength).matches(/([0-9]+( [0-9]+)+)/, errorMsg.invalidNumber).required(errorMsg.required)
}
// Register form
const { handleSubmit, values } = useForm({
  validationSchema: schema
})
// Input fields
const { value: nameValue, errorMessage: nameError } = useField('name')
const { value: cardValue, errorMessage: cardError } = useField('card')
const { value: expMonthValue, errorMessage: expMonthError } = useField('expMonth')
const { value: expYearValue, errorMessage: expYearError } = useField('expYear')
const { value: cvcValue, errorMessage: cvcError } = useField('cvc')

// Successful validation
const onSubmit = handleSubmit((values) => {
  submitSuccess.value = true
})

watch(values, (newFormData) => {
  formStore.$patch({ userData: newFormData });
});

const onFocusInCard = () => {
  cardFocus.value = true
  if (cardValue.value) {
    cardValue.value = cardValue.value.replace(/\s/g, '')
  }
}
const onFocusOutCard = () => {
  if (!(cardError.value === errorMsg.invalidNumber)) {
    cardFocus.value = false
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
    const onlyNumbers = cardValue?.value?.replace(/[^\d]/g, '')
    cardValue.value = onlyNumbers?.replace(regex, (regex, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter(group => !!group).join(' ')
    )
  }
}
const formatMonth = () => {
  if (!expMonthError.value && expMonthValue?.value?.length === 1) {
    expMonthValue.value = "0" + expMonthValue.value
  }
}
</script>