<template>
    <div v-if="loading" class="loading-spinner">
        <n-spin size="large" />
    </div>

    <n-alert v-else-if="error" type="error" title="Ошибка">
        {{ error }}
    </n-alert>

    <div v-else>
        <n-table :bordered="true" :single-line="false">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>File Name</th>
                    <th>File System ID</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data?.data" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.fileName }}</td>
                    <td>{{ item.fileSystemId }}</td>
                    <td>
                        <n-tag :type="getStatusTagType(item.status)">
                            {{ item.status }}
                        </n-tag>
                    </td>
                    <td>{{ formatDate(item.createdAt) }}</td>
                    <td>
                        <n-button size="small" @click="showDetails(item)">
                            Details
                        </n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>

        <n-pagination v-if="data" v-model:page="currentPage" :page-count="data.totalPages" @update:page="fetchData" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {
    NTable,
    NButton,
    NTag,
    NSpin,
    NAlert,
    NPagination,
    useNotification
} from 'naive-ui';

interface IMonitoredFile {
    id: number;
    fileSystemId: string;
    inode: number;
    filePath: string;
    fileName: string;
    fileSize: number;
    createdAt: string;
    modifiedAt: string;
    isOriginalMarked: boolean;
    maxChainDepth: number;
    minChainDepth: number;
    status: string;
    extendedAttributes: string;
}

interface IMonitoredFilesResponse {
    data: IMonitoredFile[];
    count: number;
    page: number;
    totalPages: number;
}

const data = ref<IMonitoredFilesResponse>();
const loading = ref(true);
const error = ref('');
const currentPage = ref(1);
//const notification = useNotification();

const fetchData = async (page = 1) => {
    try {
        loading.value = true;
        //  error.value = '';
        const response = await axios.get(`http://localhost:3000/monitored-files/filters`, {
            params: { page }
        });
        data.value = response.data;
        //  currentPage.value = data.value.page;
    } catch (err) {
        console.error(err);
        error.value = 'Failed to load data';
        // notification.error({
        //     title: 'Error',
        //     content: 'Could not fetch monitored files',
        //     duration: 3000
        // });
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};

const getStatusTagType = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active': return 'success';
        case 'pending': return 'warning';
        case 'error': return 'error';
        default: return 'default';
    }
};

const showDetails = (item: IMonitoredFile) => {
    // notification.info({
    //     title: 'File Details',
    //     content: `Path: ${item.filePath}`,
    //     duration: 5000
    // });
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.loading-spinner {
    display: flex;
    justify-content: center;
    padding: 50px;
}

.n-table {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>