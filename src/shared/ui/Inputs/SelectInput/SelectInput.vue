<script setup lang="ts">
import { NSelect } from 'naive-ui';
import type { TSelectInput } from './SelectInput.type';


const emits = defineEmits<{
    (e: "update:value", value: string): void
}>()
defineProps<TSelectInput>()
</script>

<template>
    <div>
        <label class="text-xs text-gray-400" for="event-type">{{ label }}</label>
        <NSelect id="event-type" size="tiny" style="max-width: 160px; min-width: 160px" :value="value" @update:value="(value) => {
            emits(`update:value`, value)
        }" :options="option" />
    </div>
</template>