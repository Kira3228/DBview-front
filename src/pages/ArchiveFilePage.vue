<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ActiveFileHeader from '../components/ActiveFileHeader.vue';
import Table from '../components/Table.vue';
import { useArchivedFileTableStore } from '../store/achivedFileTableStore';
import type { ActiveFile, ActiveFileRes } from '../utils/Types/ActiveFile';
import { fetchData } from '../utils/fetchData';
import { archiveFileColumns } from '../Helpers/ArchivedFileTableColumns';
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { activeFileColumns } from '../Helpers/ActiveFilesTableColumns';
import { useArchivedFileSearchStore } from '../store/archivedFileSearchStore';
import ArchivedFileHeader from '../components/ArchivedFileHeader.vue';

const error = ref(false)
const isLoading = ref(false)
const archivedFileTableStore = useArchivedFileTableStore()
const archivedFileSearchStore = useArchivedFileSearchStore()
const fetchFiles = async () => {
    try {
        isLoading.value = true
        const result: ActiveFileRes = await fetchData(
            `http://localhost:3000/active-files/archive`
        )
        archivedFileTableStore.setFiles(result.files)
        console.log(`архивированные файлы`, result.files)
        archivedFileTableStore.setPagination({
            page: result.page,
            totalCount: result.limit,
            totalPages: result.totalPages,
        })
    }
    catch {
        error.value = true
    } finally {
        isLoading.value = false
    }
}

const handlePageChange = (newPage: number) => {
    archivedFileTableStore.setPagination({ page: newPage })
    fetchFiles()
}
onMounted(fetchFiles)
</script>
<template>
    <div class="flex w-full flex-col p-4">
        <ArchivedFileHeader />
        <Table :data="archivedFileTableStore.state.files" :current-page="archivedFileTableStore.state.page"
            :total="archivedFileTableStore.state.totalCount" :page-size="archivedFileTableStore.state.limit"
            :total-pages="archivedFileTableStore.state.totalPages" :columns="archiveFileColumns as TableColumn[]"
            @update:page="handlePageChange" />
    </div>
</template>
