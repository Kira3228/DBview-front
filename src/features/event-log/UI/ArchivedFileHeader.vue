<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui';
import { useArchivedFileSearchStore, useArchivedFileTableStore } from '../../../store';
import { fetchArchiveFile } from '../../../shared/api/fetchData';
import { useDebounce } from '../../../shared/lib/debounce';
import { SearchInput } from '../../../shared/ui';

const archivedFileSearchStore = useArchivedFileSearchStore()
const archivedFileTableStore = useArchivedFileTableStore()
const { debounce } = useDebounce()

const fetchData = async () => {
    try {
        const data = await fetchArchiveFile(
            archivedFileSearchStore.state.filePath,
            archivedFileSearchStore.state.inode
        )
        archivedFileTableStore.updateStore(data)
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}

const updateFieldAndFetch = (field: 'filePath' | 'inode', value: string | number) => {
    archivedFileSearchStore.updateField(field, value)
    debounce(fetchData)
}
</script>

<template>
    <div class="w-full">
        <NButtonGroup class="">
            <NButton size="small"> Детали </NButton>
            <NButton size="small"> Экспортировать </NButton>
            <NButton size="small"> Архивировать </NButton>
        </NButtonGroup>
        <div class="flex gap-8">
            <SearchInput label="Путь" placeholder="Путь" :model-value="archivedFileSearchStore.state.filePath"
                @update:modelValue="(val) => updateFieldAndFetch('filePath', val)" id='filePath' />
            <SearchInput label="Inode" placeholder="Inode" :model-value="archivedFileSearchStore.state.inode.toString()"
                @update:modelValue="(val) => updateFieldAndFetch('inode', val)" id='inode' />
        </div>
    </div>
</template>