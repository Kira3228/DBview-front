<script lang="ts" setup>
import { NSwitch } from 'naive-ui';
import { useTheme } from '../../../../store';

const themeStore = useTheme()

</script>
<template>
    <div class="flex justify-center p-3">
        <NSwitch size="large" :value="themeStore.state" @update-value="themeStore.updateState">
            <template style="color: #000" #checked>
                Тёмная тема
            </template>
            <template #unchecked>
                Светлая тема
            </template>
        </NSwitch>
    </div>
</template>