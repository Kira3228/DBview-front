<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui';
import SearchInput from './UI/SearchInput.vue';
import { useArchivedFileSearchStore } from '../store/archivedFileSearchStore';
import { onUnmounted, ref } from 'vue';
import { useArchivedFileTableStore } from '../store/achivedFileTableStore';
import { fetchActiveFile, fetchArchiveFile } from '../utils/fetchData';
const archivedFileSearchStore = useArchivedFileSearchStore()
const archivedFileTableStore = useArchivedFileTableStore()
const debounceTimer = ref();
const fetchData = async () => {

    try {
        const data = await fetchArchiveFile(
            archivedFileSearchStore.state.filePath,
            archivedFileSearchStore.state.inode
        )
        archivedFileTableStore.updateStore(data)
        console.log(archivedFileTableStore.state)
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
const updateFieldAndFetch = (field: 'filePath' | 'inode', value: string | number) => {
    archivedFileSearchStore.updateField(field, value)
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
                    <SearchInput placeholder="Путь" :model-value="archivedFileSearchStore.state.filePath"
                        @update:modelValue="(val) => updateFieldAndFetch('filePath', val)" id='filePath' />
                </div>
                <div>
                    <label class="text-xs text-gray-400" for="inode">Inode</label>
                    <SearchInput placeholder="Inode" :model-value="archivedFileSearchStore.state.inode.toString()"
                        @update:modelValue="(val) => updateFieldAndFetch('inode', val)" id='inode' />
                </div>
            </div>
        </div>
    </div>
</template>