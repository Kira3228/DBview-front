<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import ActiveFileHeader from '../components/ActiveFileHeader.vue'
import Table from '../components/Table.vue'
import { activeFileColumns } from '../Helpers/ActiveFilesTableColumns'
import type { Event } from '../utils/Types/EventLog'
import type { ActiveFile, ActiveFileRes } from '../utils/Types/ActiveFile'
import { onMounted, ref } from 'vue'
import { useActiveFileStore } from '../store/activeFileStore'
import { fetchData } from '../utils/fetchData'

const activeFileTableStore = useActiveFileStore()
const error = ref(false)
const isLoading = ref(false)

const fetchFiles = async () => {
	try {
		isLoading.value = true
		const result: ActiveFileRes = await fetchData(
			`http://localhost:3000/active-files/active`
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
onMounted(fetchFiles)

const handlePageChange = (newPage: number) => {
	activeFileTableStore.setPagination({ page: newPage })
	fetchFiles()
}

// data.value = fetchFiles
</script>

<template>
	<div class="flex w-full flex-col p-4">
		<ActiveFileHeader />
		<Table
			:data="activeFileTableStore.state.files"
			:columns="activeFileColumns as TableColumn<Event | ActiveFile>[]"
			:current-page="activeFileTableStore.state.page"
			:total="activeFileTableStore.state.totalCount"
			:page-size="activeFileTableStore.state.limit"
			:total-pages="activeFileTableStore.state.totalPages"
			@update:page="handlePageChange"
		/>
	</div>
</template>
