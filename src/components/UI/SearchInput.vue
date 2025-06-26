<script setup lang="ts">
import { NButton, NInput, NInputGroup } from 'naive-ui';
import SearchIcon from '../Icons/SearchIcon.vue';

const props = defineProps<{
    modelValue: string;
    placeholder?: string
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
    <NInputGroup>
        <NInput :placeholder="props.placeholder" :value="modelValue" @update:value="emits('update:modelValue', $event)"
            size="tiny" autosize class="w-36" />
        <NButton size="tiny">
            <template #icon>
                <SearchIcon />
            </template>
        </NButton>
    </NInputGroup>
</template>