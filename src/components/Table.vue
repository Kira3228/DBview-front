<template>
    <div class="mt-4">
        <NDataTable ref="table" :columns="columns" :data="data" :bordered="true"
            :row-key="(row: TSystemEvent) => row.id" class="shadow-sm" />
        <div class="mt-6 flex justify-center">
            <NPagination :page="currentPage" :item-count="props.total" :page-size="pageSize" :page-count="totalPages"
                @update:page="handlePageChange" show-quick-jumper>
                <template #prev>
                    <NButton>Previous</NButton>
                </template>
                <template #next>
                    <NButton>Next</NButton>
                </template>
            </NPagination>
        </div>
    </div>
</template>
<script setup lang="ts">
import { NButton, NDataTable, NPagination, type DataTableColumn } from 'naive-ui';
import type { TSystemEvent } from '../utils/Types/SystemEvent.types';


const props = defineProps<
    {
        data: TSystemEvent[]
        currentPage: number
        total: number
        pageSize: number
        totalPages: number
    }
>()
const emit = defineEmits<{
    (e: `update:page`, page: number): void
}>()

const handlePageChange = (page: number) => {
    emit('update:page', page);
};
const columns: DataTableColumn<TSystemEvent>[] = [
    { title: 'ID', key: 'id', width: 80 },
    { title: 'Timestamp', key: 'timestamp' },
    { title: 'Type', key: 'eventType' },
    { title: 'Severity', key: 'severity' },
    { title: 'Source', key: 'source', resizable: true, },
    { title: 'Data', key: 'eventData', ellipsis: { tooltip: true } }
];
</script>