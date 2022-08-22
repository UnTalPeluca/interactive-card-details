<template>
  <div class="relative w-full">
    <label v-if="title" :for="inputName"
      class="flex items-start gap-2 cursor-pointer pb-2 capitalize text-xs text-deep-violet tracking-widest">
      {{ title }}
    </label>
    <div
      class="flex items-center p-[1px] rounded-[9px] focus-within:bg-gradient-to-br focus-within:from-gra-light-blue focus-within:to-gra-violet"
      :class="error ? 'bg-light-red' : 'bg-light-grey'">
      <input :id="inputName" onpaste="return false" ondrop="return false" :maxlength="length"
        class="cursor-pointer placeholder:text-deep-violet/25 placeholder:font-bold p-2 px-3.5 w-full focus:outline-0 rounded-lg"
        :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
    <small v-if="error && showError" class="text-light-red absolute text-xs top-0 right-0
    sm:top-full sm:pt-2 sm:left-0">
      {{ error }}
    </small>
  </div>
</template>

<script setup>
const props = defineProps({
  error: String,
  modelValue: String,
  placeholder: String,
  inputName: String,
  title: String,
  showError: {
    type: Boolean,
    default: true
  },
  length: {
    type: String,
    default: "524288"
  }
})
</script>