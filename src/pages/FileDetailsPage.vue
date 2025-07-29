<script setup lang="ts">
import { onMounted } from 'vue';
import { fetchDetails } from '../shared/api/fetchData';
import { useFileDetailsSearchStore, useFileDetailsTreeStore } from '../store';
import { FileDeatails, FileDeatailsHeader } from '../features/FileDetails';

const graphStore = useFileDetailsTreeStore()
const searchStore = useFileDetailsSearchStore()
const fetchGraph = async () => {
    const data = await fetchDetails(
        searchStore.state.filePath,
        searchStore.state.inode,
        localStorage.getItem(`filePath`) as string
    )
    graphStore.updateStore(data)
}
onMounted(() => {
    fetchGraph()
})
</script>
<template>
    <FileDeatailsHeader />
    <FileDeatails :file-hierarchy="graphStore.state" />
</template>
