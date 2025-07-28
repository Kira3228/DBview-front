<script lang="ts" setup>
import { NSwitch } from 'naive-ui';
import {  ref, watch } from 'vue';
import { useTheme } from '../../../store';

const themeStore = useTheme()

</script>
<template>
    <div class="flex justify-center p-3">
        <NSwitch :value="themeStore.state" @update-value="themeStore.updateState">
            <template #checked>
                Тёмная тема
            </template>
            <template #unchecked>
                Светлая тема
            </template>
        </NSwitch>
    </div>
</template>