<template>
    <div class="flex ">
        <NMenu class="w-56" :options="MenuOptions" />
        <div class="p-2 w-full">
            <slot></slot>
        </div>
    </div>


</template>
<script setup lang='ts'>
import { NMenu } from 'naive-ui';
import { keep } from 'naive-ui/es/_utils';

import { computed } from 'vue';
const MenuOptions = computed(() => [
    {
        label: 'Меню',
        key: '1',
    },
    {
        label: `Управление файлами`,
        key: `2`,
        children: [
            {
                label: `Активные файлы`,
                key: `3`
            },
            {
                label: `Архив`,
                key: `4`
            },
            {
                label: `Детали файла`,
                key: `5`
            },
        ]
    }
])
</script>
<style scoped></style>
