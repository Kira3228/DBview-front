<script setup lang="ts">
import type { TableColumn } from "naive-ui/es/data-table/src/interface";
import ActiveFileHeader from "../components/ActiveFileHeader.vue";
import Table from "../components/Table.vue";
import { activeFileColumns } from "../Helpers/ActiveFilesTableColumns";
import type { Event } from "../utils/Types/EventLog";
import type { ActiveFile, ActiveFileRes } from "../utils/Types/ActiveFile";
import { fetchData } from "../utils/fetchData";
import { ref } from "vue";
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

const data = ref<ActiveFileRes>({
  files: [],
  limit: 30,
  page: 1,
  totalCount: 1,
  totalPage: 1,
});
const testData = ref<ActiveFile[]>([]);

testData.value = testActiveFiles;
const fetchFiles = async () => {
    try{

    }
    catch{

    }
    finally{
        
    }
};

// data.value = fetchFiles
</script>

<template>
  <div class="flex w-full flex-col p-4">
    <ActiveFileHeader />
    <Table
      :data="testData"
      :columns="activeFileColumns as TableColumn<Event | ActiveFile >[]"
    />
  </div>
</template>
