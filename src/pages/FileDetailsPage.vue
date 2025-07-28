<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FileDetailsHeader from '../features/event-log/UI/FileDetailsHeader.vue';
import { fetchData, fetchDetails } from '../shared/api/fetchData';
import FileDetails from './FileDetails.vue';
import type { FileHierarchyMap } from './type';
import { useFileDetailsSearchStore, useFileDetailsTreeStore } from '../store';

const fileHierarchyData: FileHierarchyMap = {
    "1": {
        "parentFile": {
            "id": 1,
            "fileSystemId": "fs1",
            "inode": 1001,
            "filePath": "/data/source/config.json",
            "fileName": "config.json",
            "fileSize": 2048,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-14T09:21:42.000Z",
            "isOriginalMarked": true,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"type\":\"config\"}"
        },
        "children": [
            {
                "relationshipType": "cached",
                "childFile": {
                    "id": 4,
                    "fileSystemId": "fs1",
                    "inode": 2001,
                    "filePath": "/tmp/config.cache",
                    "fileName": "config.cache",
                    "fileSize": 1024,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"source\":\"config.json\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            },
            {
                "relationshipType": "backup",
                "childFile": {
                    "id": 5,
                    "fileSystemId": "fs1",
                    "inode": 2002,
                    "filePath": "/backups/config.json.bak",
                    "fileName": "config.json.bak",
                    "fileSize": 2048,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"backup\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            },
            {
                "relationshipType": "inherited",
                "childFile": {
                    "id": 8,
                    "fileSystemId": "fs1",
                    "inode": 3001,
                    "filePath": "/home/devuser/custom_config.json",
                    "fileName": "custom_config.json",
                    "fileSize": 3072,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"custom\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            },
            {
                "relationshipType": "config",
                "childFile": {
                    "id": 12,
                    "fileSystemId": "fs1",
                    "inode": 4002,
                    "filePath": "/etc/app_settings.json",
                    "fileName": "app_settings.json",
                    "fileSize": 4096,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"settings\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "2": {
        "parentFile": {
            "id": 2,
            "fileSystemId": "fs1",
            "inode": 1002,
            "filePath": "/data/source/main.exe",
            "fileName": "main.exe",
            "fileSize": 102400,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:39:50.000Z",
            "isOriginalMarked": true,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "archived",
            "extendedAttributes": "{\"type\":\"binary\"}"
        },
        "children": [
            {
                "relationshipType": "running",
                "childFile": {
                    "id": 6,
                    "fileSystemId": "fs1",
                    "inode": 2003,
                    "filePath": "/proc/main_running",
                    "fileName": "main_running",
                    "fileSize": 0,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"runtime\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            },
            {
                "relationshipType": "patched",
                "childFile": {
                    "id": 9,
                    "fileSystemId": "fs1",
                    "inode": 3002,
                    "filePath": "/tmp/main_patched",
                    "fileName": "main_patched",
                    "fileSize": 51200,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"patched\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            },
            {
                "relationshipType": "bundled",
                "childFile": {
                    "id": 11,
                    "fileSystemId": "fs1",
                    "inode": 4001,
                    "filePath": "/dist/final_app",
                    "fileName": "final_app",
                    "fileSize": 204800,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T12:11:00.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "archived",
                    "extendedAttributes": "{\"final\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "3": {
        "parentFile": {
            "id": 3,
            "fileSystemId": "fs1",
            "inode": 1003,
            "filePath": "/data/source/lib.so",
            "fileName": "lib.so",
            "fileSize": 51200,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": true,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"type\":\"library\"}"
        },
        "children": [
            {
                "relationshipType": "modified",
                "childFile": {
                    "id": 7,
                    "fileSystemId": "fs1",
                    "inode": 2004,
                    "filePath": "/var/lib/lib_modified.so",
                    "fileName": "lib_modified.so",
                    "fileSize": 25600,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"modified\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            },
            {
                "relationshipType": "linked",
                "childFile": {
                    "id": 10,
                    "fileSystemId": "fs1",
                    "inode": 3003,
                    "filePath": "/cache/lib_optimized.so",
                    "fileName": "lib_optimized.so",
                    "fileSize": 12800,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T12:11:06.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "deleted",
                    "extendedAttributes": "{\"optimized\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            },
            {
                "relationshipType": "embedded",
                "childFile": {
                    "id": 11,
                    "fileSystemId": "fs1",
                    "inode": 4001,
                    "filePath": "/dist/final_app",
                    "fileName": "final_app",
                    "fileSize": 204800,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T12:11:00.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "archived",
                    "extendedAttributes": "{\"final\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "4": {
        "parentFile": {
            "id": 4,
            "fileSystemId": "fs1",
            "inode": 2001,
            "filePath": "/tmp/config.cache",
            "fileName": "config.cache",
            "fileSize": 1024,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"source\":\"config.json\"}"
        },
        "children": [
            {
                "relationshipType": "transformed",
                "childFile": {
                    "id": 8,
                    "fileSystemId": "fs1",
                    "inode": 3001,
                    "filePath": "/home/devuser/custom_config.json",
                    "fileName": "custom_config.json",
                    "fileSize": 3072,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"custom\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "5": {
        "parentFile": {
            "id": 5,
            "fileSystemId": "fs1",
            "inode": 2002,
            "filePath": "/backups/config.json.bak",
            "fileName": "config.json.bak",
            "fileSize": 2048,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"backup\":\"true\"}"
        },
        "children": [
            {
                "relationshipType": "restored",
                "childFile": {
                    "id": 8,
                    "fileSystemId": "fs1",
                    "inode": 3001,
                    "filePath": "/home/devuser/custom_config.json",
                    "fileName": "custom_config.json",
                    "fileSize": 3072,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"custom\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "6": {
        "parentFile": {
            "id": 6,
            "fileSystemId": "fs1",
            "inode": 2003,
            "filePath": "/proc/main_running",
            "fileName": "main_running",
            "fileSize": 0,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"runtime\":\"true\"}"
        },
        "children": [
            {
                "relationshipType": "debug",
                "childFile": {
                    "id": 9,
                    "fileSystemId": "fs1",
                    "inode": 3002,
                    "filePath": "/tmp/main_patched",
                    "fileName": "main_patched",
                    "fileSize": 51200,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"patched\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "7": {
        "parentFile": {
            "id": 7,
            "fileSystemId": "fs1",
            "inode": 2004,
            "filePath": "/var/lib/lib_modified.so",
            "fileName": "lib_modified.so",
            "fileSize": 25600,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"modified\":\"true\"}"
        },
        "children": [
            {
                "relationshipType": "optimized",
                "childFile": {
                    "id": 9,
                    "fileSystemId": "fs1",
                    "inode": 3002,
                    "filePath": "/tmp/main_patched",
                    "fileName": "main_patched",
                    "fileSize": 51200,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"patched\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "8": {
        "parentFile": {
            "id": 8,
            "fileSystemId": "fs1",
            "inode": 3001,
            "filePath": "/home/devuser/custom_config.json",
            "fileName": "custom_config.json",
            "fileSize": 3072,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"custom\":\"true\"}"
        },
        "children": [
            {
                "relationshipType": "resolved",
                "childFile": {
                    "id": 12,
                    "fileSystemId": "fs1",
                    "inode": 4002,
                    "filePath": "/etc/app_settings.json",
                    "fileName": "app_settings.json",
                    "fileSize": 4096,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T11:27:24.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "active",
                    "extendedAttributes": "{\"settings\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    },
    "9": {
        "parentFile": {
            "id": 9,
            "fileSystemId": "fs1",
            "inode": 3002,
            "filePath": "/tmp/main_patched",
            "fileName": "main_patched",
            "fileSize": 51200,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"patched\":\"true\"}"
        },
        "children": [
            {
                "relationshipType": "compiled",
                "childFile": {
                    "id": 11,
                    "fileSystemId": "fs1",
                    "inode": 4001,
                    "filePath": "/dist/final_app",
                    "fileName": "final_app",
                    "fileSize": 204800,
                    "createdAt": "2025-07-04T11:27:24.000Z",
                    "modifiedAt": "2025-07-04T12:11:00.000Z",
                    "isOriginalMarked": false,
                    "maxChainDepth": 0,
                    "minChainDepth": 0,
                    "status": "archived",
                    "extendedAttributes": "{\"final\":\"true\"}"
                },
                "createdAt": "2025-07-04T11:27:24.000Z"
            }
        ]
    }
};
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
    <FileDetailsHeader />
    <FileDetails :file-hierarchy="graphStore.state" />
</template>
