<script setup lang="ts">
import {  NInput, NInputGroup } from "naive-ui";


const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  label?: string
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();


</script>
<template>
  <label class="text-xs text-gray-400" for="search">{{ label }}</label>
  <NInputGroup>
    <NInput id="search" :value="modelValue" @update:value="
      (value) => {
        emits('update:modelValue', value);
        ;
      }" :placeholder="props.placeholder" size="tiny" autosize class="w-36" />

  </NInputGroup>
</template>
