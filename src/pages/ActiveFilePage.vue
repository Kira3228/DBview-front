<script setup lang="ts">
import type { TableColumn } from "naive-ui/es/data-table/src/interface";
import ActiveFileHeader from "../components/ActiveFileHeader.vue";
import Table from "../components/Table.vue";
import { activeFileColumns } from "../Helpers/ActiveFilesTableColumns";
import type { Event } from "../utils/Types/EventLog";
import type { ActiveFile, ActiveFileRes } from "../utils/Types/ActiveFile";
import { onMounted, ref } from "vue";
import { useActiveFileStore } from "../store/activeFileStore";
import { fetchData } from "../utils/fetchData";
const testActiveFiles: ActiveFile[] = [
  {
    id: 1,
    filePath: "/var/log/syslog",
    inode: 10001,
    fileSize: 2048,
    maxChainDepth: 5,
    minChainDepth: 1,
    status: "active",
  },
  {
    id: 2,
    filePath: "/etc/passwd",
    inode: 10002,
    fileSize: 1024,
    maxChainDepth: 3,
    minChainDepth: 1,
    status: "archived",
  },
  {
    id: 3,
    filePath: "/home/user/data.txt",
    inode: 10003,
    fileSize: 4096,
    maxChainDepth: 6,
    minChainDepth: 2,
    status: "active",
  },
  {
    id: 4,
    filePath: "/tmp/debug.log",
    inode: 10004,
    fileSize: 512,
    maxChainDepth: 2,
    minChainDepth: 1,
    status: "deleted",
  },
  {
    id: 5,
    filePath: "/opt/app/config.yaml",
    inode: 10005,
    fileSize: 1536,
    maxChainDepth: 4,
    minChainDepth: 1,
    status: "active",
  },
];
const activeFileTableStore = useActiveFileStore()
const error = ref(false)
const isLoading = ref(false)
const testData = ref<ActiveFile[]>([]);

testData.value = testActiveFiles;
const fetchFiles = async () => {
  try {
    isLoading.value = true
    const result: ActiveFileRes = await fetchData(`http://localhost:3000/active-files/`)
    activeFileTableStore.setFiles(result.files)
    console.log(result.files)
    activeFileTableStore.setPagination({
      page: result.page,
      totalCount: result.limit,
      totalPages: result.totalPages
    })
  }
  catch {
    error.value = true
  }
  finally {
    isLoading.value = false
  }
};
onMounted(fetchFiles);

const handlePageChange = (newPage: number) => {
  activeFileTableStore.setPagination({ page: newPage })
  fetchFiles()
}

// data.value = fetchFiles
</script>

<template>
  <div class="flex w-full flex-col p-4">
    <ActiveFileHeader />
    <Table :data="activeFileTableStore.state.files" :columns="activeFileColumns as TableColumn<Event | ActiveFile>[]"
      :current-page="activeFileTableStore.state.page" :total="activeFileTableStore.state.totalCount"
      :page-size="activeFileTableStore.state.limit" :total-pages="activeFileTableStore.state.totalPages"
      @update:page="handlePageChange" />




  </div>
</template>
