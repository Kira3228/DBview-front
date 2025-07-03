<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui';
import SearchInput from './UI/SearchInput.vue';

</script>

<template>
    <div class="w-full">
        <NButtonGroup class="">
            <NButton size="small"> Детали </NButton>
            <NButton size="small"> Экспортировать </NButton>
            <NButton size="small"> Архивировать </NButton>
        </NButtonGroup>
        <div class="flex gap-8">
            <div class="flex gap-3.5 my-3.5 items-center">
                <div>
                    <label class="text-xs text-gray-400" for="filePath">Путь</label>
                    <SearchInput placeholder="Путь" :model-value="activeFileSearchStore.state.filePath"
                        @update:modelValue="(val) => updateFieldAndFetch('filePath', val)" id='filePath' />
                </div>
                <div>
                    <label class="text-xs text-gray-400" for="inode">Inode</label>
                    <SearchInput placeholder="Inode" :model-value="activeFileSearchStore.state.inode.toString()"
                        @update:modelValue="(val) => updateFieldAndFetch('inode', val)" id='inode' />
                </div>
            </div>
        </div>
    </div>
</template>