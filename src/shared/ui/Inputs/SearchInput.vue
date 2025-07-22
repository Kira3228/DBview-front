<script setup lang="ts">
import { NInput, NInputGroup } from "naive-ui";


const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  label?: string
  type?: string
}>();

const defaultType = props.type || "text"
const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();


</script>
<template>
  <div>
    <label class="text-xs text-gray-400" for="search">{{ label }}</label>
    <div v-if="defaultType === `text`">
      <NInput type="text" id="search" :value="modelValue" @update:value="
        (value) => {
          emits('update:modelValue', value);
          ;
        }" :placeholder="props.placeholder" size="tiny" autosize class="w-44" />
    </div>
    <div v-else>
      <NInput type="textarea" :value="modelValue" @update:value="(value) => {
        emits(`update:modelValue`, value)
      }" :placeholder="props.placeholder" />
    </div>
  </div>
</template>
