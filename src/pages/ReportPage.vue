<script setup lang="ts">
import { ref, computed } from 'vue';
import { data } from './mock';
import type { TreeOption } from 'naive-ui';
import PreviewTable from '../features/event-list/PreviewTable.vue';
import Filters from '../features/event-list/Filters/Filters.vue';

const checkedKeys = ref<string[]>([]);
const selectedFields = computed<{ key: string; label: string }[]>(() => {
    const fields: { key: string; label: string }[] = [];
    const findLabel = (tree: TreeOption[], targetKey: string, parentLabel = ''): string | null => {
        for (const node of tree) {
            const fullLabel = parentLabel ? `${node.label}` : (node.label as string);
            if (node.key === targetKey) {
                return fullLabel;
            }
            if (node.children) {
                const childLabel = findLabel(node.children, targetKey, fullLabel);
                if (childLabel) return childLabel;
            }
        }
        return null;
    };
    checkedKeys.value.forEach(key => {
        if (key !== 'relatedProcessId' && key !== 'relatedFileId') {
            const label = findLabel(data, key);
            if (label) {
                fields.push({ key, label });
            }
        }
    });
    return fields;
});

</script>

<template>
    <div class="flex gap-5">
        <Filters />
        <PreviewTable :selected-fields="selectedFields"></PreviewTable>
    </div>
</template>

<style></style>
