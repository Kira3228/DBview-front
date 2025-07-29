<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui';
import { useActiveFileSearchStore, useActiveFileTableStore } from '../../../store';
import { useDebounce } from '../../../shared/lib/debounce';
import { SearchInput } from '../../../shared/ui';
import { fetchActiveFile } from '../../event-log/api/fetchActiveFile';

const activeFileSearchStore = useActiveFileSearchStore()
const activeFileTableStore = useActiveFileTableStore()
const { debounce } = useDebounce()

const fetchData = async () => {
    try {
        const data = await fetchActiveFile(
            activeFileSearchStore.state.filePath,
            activeFileSearchStore.state.inode
        )
        activeFileTableStore.updateStore(data)
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}

const updateFieldAndFetch = (field: 'filePath' | 'inode', value: string | number) => {
    activeFileSearchStore.updateField(field, value)
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
            <SearchInput label="Путь" placeholder="Путь" :model-value="activeFileSearchStore.state.filePath"
                @update:modelValue="(val) => updateFieldAndFetch('filePath', val)" id='filePath' />
            <SearchInput label="Inode" placeholder="Inode" :model-value="activeFileSearchStore.state.inode.toString()"
                @update:modelValue="(val) => updateFieldAndFetch('inode', val)" id='inode' />
        </div>
    </div>
</template>
