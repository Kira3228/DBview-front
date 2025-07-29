<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { ActiveFileRes } from '../shared/lib/types/ActiveFile';
import { fetchData } from '../shared/api/fetchData';
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { useArchivedFileTableStore } from '../store';
import Table from '../shared/ui/Table/Table.vue';
import { endpoints } from '../features/event-log/api/endpoints'
import { ArchivedFileTableColumns } from '../shared/Helpers';
import { ArchivedFileHeader } from '../features/file-management';

const archivedFileTableStore = useArchivedFileTableStore()
const error = ref(false)
const isLoading = ref(false)

const fetchFiles = async () => {
    try {
        isLoading.value = true
        const result: ActiveFileRes = await fetchData(
            `${endpoints.getArchive}/?filePathException=${localStorage.getItem(`filePath`)}`
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
    <ArchivedFileHeader />
    <Table :data="archivedFileTableStore.state.files" :current-page="archivedFileTableStore.state.page"
        :total="archivedFileTableStore.state.totalCount" :page-size="archivedFileTableStore.state.limit"
        :total-pages="archivedFileTableStore.state.totalPages" :columns="ArchivedFileTableColumns as TableColumn[]"
        @update:page="handlePageChange" />
</template>
