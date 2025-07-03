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

<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui';
import SearchInput from './UI/SearchInput.vue';

import { fetchActiveFile } from '../utils/fetchData';
import { useActiveFileSearchStore } from '../store/activeFileSearchStore';
import { useActiveFileTableStore } from '../store/activeFileTableStore';
import { onUnmounted, ref } from 'vue';

const debounceTimer = ref();
const activeFileSearchStore = useActiveFileSearchStore()
const activeFileTableStore = useActiveFileTableStore()
const fetchData = async () => {

    try {
        const data = await fetchActiveFile(
            activeFileSearchStore.state.filePath,
            activeFileSearchStore.state.inode
        )
        activeFileTableStore.updateStore(data)
        console.log(activeFileTableStore.state)
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }

}

const updateFieldAndFetch = (field: 'filePath' | 'inode', value: string | number) => {
    activeFileSearchStore.updateField(field, value)
    triggerDebouncedFetch()
}
const triggerDebouncedFetch = () => {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
        fetchData();
        console.log(`12321313131313131313`)
    }, 750);
};
onUnmounted(() => {
    clearTimeout(debounceTimer.value);
});
</script>