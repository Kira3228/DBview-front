<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { activeFileColumns } from '../Helpers/ActiveFilesTableColumns'
import type { Event } from '../shared/lib/types/EventLog'
import type { ActiveFile, ActiveFileRes } from '../shared/lib/types/ActiveFile'
import { onMounted, ref } from 'vue'
import { fetchData } from '../shared/api/fetchData'
import { useActiveFileSearchStore, useActiveFileTableStore } from '../store'
import Table from '../shared/ui/Table/Table.vue'
import ActiveFileHeader from '../features/event-log/UI/ActiveFileHeader.vue'

import { endpoints } from '../features/event-log/api/endpoints'

const activeFileTableStore = useActiveFileTableStore()
const activeFileSearchStore = useActiveFileSearchStore()
const error = ref(false)
const isLoading = ref(false)

const fetchFiles = async () => {
	try {
		isLoading.value = true
		const result: ActiveFileRes = await fetchData(
			`${endpoints.getActive}${activeFileSearchStore.state.filePath}&filePathException=${localStorage.getItem(`filePath`)}`
		)
		activeFileTableStore.setFiles(result.files)
		console.log(`активные файлы`, result.files)
		activeFileTableStore.setPagination({
			page: result.page,
			totalCount: result.limit,
			totalPages: result.totalPages,
		})
	} catch {
		error.value = true
	} finally {
		isLoading.value = false
	}
}


const handlePageChange = (newPage: number) => {
	activeFileTableStore.setPagination({ page: newPage })
	fetchFiles()
}
onMounted(fetchFiles)
// data.value = fetchFiles
</script>

<template>
	<ActiveFileHeader />
	<Table :data="activeFileTableStore.state.files" :columns="activeFileColumns as TableColumn<Event | ActiveFile>[]"
		:current-page="activeFileTableStore.state.page" :total="activeFileTableStore.state.totalCount"
		:page-size="activeFileTableStore.state.limit" :total-pages="activeFileTableStore.state.totalPages"
		@update:page="handlePageChange" />
</template>
