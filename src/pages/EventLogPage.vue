<script setup lang="ts">
import {
    NDataTable,
    NPagination,
    NButton,
    NEmpty,
    NConfigProvider,
    type DataTableColumn,
    type DataTableInst
} from 'naive-ui';
import Layout from '../Layout/Layout.vue';
import { onMounted, ref, watch } from 'vue';
import EventLogHeader from '../components/EventLogHeader.vue';
import { fetchData } from '../utils/fetchData';

type TSystemEvent = {
    id: number;
    eventType: string;
    eventData: string;
    severity: string;
    source: string;
    timestamp: string;
}

type TSystemEventResponse = {
    data: TSystemEvent[];
    total: number;
    page: number;
    totalPages: number;
}

const responseData = ref<TSystemEventResponse>({
    data: [],
    page: 1,
    total: 0,
    totalPages: 1
});

const currentPage = ref(1);
const pageSize = ref(30);
const error = ref(false);
const isLoading = ref(false);

const fetchEvents = async () => {
    try {
        isLoading.value = true;
        const result: TSystemEventResponse = await fetchData(
            `http://localhost:3000/system-event/?page=${currentPage.value}&limit=${pageSize.value}`
        );

        responseData.value = {
            data: result.data || [],
            total: result.total || 0,
            page: result.page || 1,
            totalPages: result.totalPages || 1
        };
    } catch (err) {
        error.value = true;
        console.error('Fetch error:', err);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchEvents);

// Реагируем на изменение страницы
watch(currentPage, fetchEvents);

const columns: DataTableColumn<TSystemEvent>[] = [
    { title: 'ID', key: 'id', width: 80 },
    { title: 'Timestamp', key: 'timestamp' },
    { title: 'Type', key: 'eventType' },
    { title: 'Severity', key: 'severity' },
    { title: 'Source', key: 'source', resizable: true, },
    { title: 'Data', key: 'eventData', ellipsis: { tooltip: true } }
];
const data = responseData.value.data

const table = ref<DataTableInst | null>(null);

const handlePageChange = (page: number) => {
    currentPage.value = page;
};
console.log(`Скрипт всё`);

</script>

<template>
    <NConfigProvider>
        <Layout>
            <div class="flex w-full flex-col p-4">
                <EventLogHeader />

                <!-- <div v-if="isLoading" class="p-4 text-center">
                    Loading...
                </div>

                <div v-else-if="error" class="p-4 text-red-500 text-center">
                    Error loading data
                </div>

                <div v-else-if="responseData.events.length === 0" class="p-4 text-center">
                    <NEmpty description="No events found">
                        <template #extra>
                            <NButton size="small" @click="fetchEvents">
                                Try Again
                            </NButton>
                        </template>
</NEmpty>
</div> -->

                <div class="mt-4">
                    <NDataTable ref="table" :columns="columns" :data="responseData.data" :bordered="true"
                        :row-key="row => row.id" class="shadow-sm" />

                    <div class="mt-6 flex justify-center">
                        <NPagination v-model:page="currentPage" :item-count="responseData.total" :page-size="pageSize"
                            :page-count="responseData.totalPages" @update:page="handlePageChange" show-quick-jumper>
                            <template #prev>
                                <NButton>Previous</NButton>
                            </template>
                            <template #next>
                                <NButton>Next</NButton>
                            </template>
                        </NPagination>
                    </div>
                </div>
            </div>
        </Layout>
    </NConfigProvider>
</template>