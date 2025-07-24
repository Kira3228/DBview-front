<script setup lang="ts">
import { NDatePicker } from 'naive-ui';
import { computed, defineEmits, defineProps } from 'vue';

const emit = defineEmits<{
    (e: 'update:value', value: Date | null | [number, number]): void;
}>();
const props = defineProps<{
    label: string;
    value: Date | null | [number, number];
    type?: string;
}>();

const effectiveType = props.type || 'date';

const timestampValue = computed<number | null | [number, number] | null>
    (() => {
        if (props.value === null) {
            return null;
        }
        if (props.value instanceof Date) {
            return props.value.getTime();
        }
        if (Array.isArray(props.value) && props.value.length === 2) {
            return props.value;
        }
        return null;
    });

const handleUpdate = (value: number | null) => {
    const date = value ? new Date(value) : null;
    emit('update:value', date);
};

const handleUpdateRange = (value: [number, number] | null) => {
    emit('update:value', value);
};
</script>

<template>
    <div>
        <label class="text-xs text-gray-400" for="date">{{ label }}</label>
        <NDatePicker v-if="effectiveType === 'date'" id="date" :value="timestampValue" @update:value="handleUpdate" />
        <NDatePicker v-else-if="effectiveType === 'daterange'" type="daterange" clearable :value="timestampValue"
            @update:value="handleUpdateRange" />
    </div>
</template>
