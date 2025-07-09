<script setup lang="ts">
import { NDatePicker } from 'naive-ui';
import { computed } from 'vue';
const emit = defineEmits<{
    (e: `update:value`, value: Date | null): void
}>()
const props = defineProps<{
    label: string
    value: Date | null

}>()
const timestampValue = computed(() => {
    return props.value ? props.value.getTime() : null
})
const handleUpdate = (value: number | null) => {
    // Преобразуем timestamp обратно в Date
    const date = value ? new Date(value) : null
    emit('update:value', date)
}
</script>

<template>
    <div>
        <label class="text-xs text-gray-400" for="start-date">{{ label }}</label>
        <NDatePicker id="start-date" :value="timestampValue" @update:value="handleUpdate" />
    </div>
</template>