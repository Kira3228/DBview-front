<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui';
import { useDebounce } from '../../../shared/lib/debounce';
import { SearchInput } from '../../../shared/ui';
import { fetchDetails } from '../../../shared/api/fetchData';
import useFileDetailsSearchStore from '../../../store/fileDetailsSearchStore';
import { useFileDetailsTreeStore } from '../../../store/';

const fileDetailsSearchStore = useFileDetailsSearchStore()
const fileDetailsTreeStore = useFileDetailsTreeStore()
const { debounce } = useDebounce()

const fetchData = async () => {
    try {
        const data = await fetchDetails(
            fileDetailsSearchStore.state.filePath,
            fileDetailsSearchStore.state.inode
        )
        fileDetailsTreeStore.updateStore(data)
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}

const updateFieldAndFetch = (field: 'filePath' | 'inode', value: string | number) => {
    fileDetailsSearchStore.updateField(field, value)
    debounce(() => {
        fetchData()
    })
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
            <SearchInput label="Путь" placeholder="Путь" :model-value="fileDetailsSearchStore.state.filePath"
                @update:modelValue="(val) => updateFieldAndFetch('filePath', val)" id='filePath' />
            <SearchInput label="Inode" placeholder="Inode" :model-value="fileDetailsSearchStore.state.inode.toString()"
                @update:modelValue="(val) => updateFieldAndFetch('inode', val)" id='inode' />
        </div>
    </div>
</template>