<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { NTree } from 'naive-ui';
import type { FileHierarchyMap, TreeNode } from '../../pages/type';
import type { TreeRenderProps } from 'naive-ui/es/tree/src/interface';

const props = defineProps<{
    fileHierarchy: FileHierarchyMap | undefined;
}>();

const defaultExpandedKeys = ref<string[]>([]);

const treeData = computed<TreeNode[]>(() => {
    if (!props.fileHierarchy || Object.keys(props.fileHierarchy).length === 0) {
        return [];
    }

    const nodes: TreeNode[] = [];

    Object.values(props.fileHierarchy).forEach((hierarchy) => {
        const parentNode: TreeNode = {
            key: `parent-${hierarchy.parentFile.id}`,
            label: hierarchy.parentFile.fileName,
            fileData: hierarchy.parentFile,
            children: [],
        };

        hierarchy.children.forEach((child) => {
            const childNode: TreeNode = {
                key: `child-${child.childFile.id}`,
                label: child.childFile.fileName,
                fileData: child.childFile,
                relationshipType: child.relationshipType,
                isLeaf: true,
            };
            parentNode.children?.push(childNode);
        });

        nodes.push(parentNode);
        defaultExpandedKeys.value.push(parentNode.key);
    });

    return nodes;
});

const renderLabel = ({ option }: TreeRenderProps) => {
    const node = option as TreeNode;
    const file = node.fileData;
    if (!file) return node.label;

    return h(
        'div',
        { style: 'display: flex; align-items: center; gap: 8px;' },
        [
            h('span', { style: 'font-weight: bold;' }, file.fileName),
            h('span', { style: 'color: #888; font-size: 0.9em;' }, file.filePath),
            h('span', { style: 'color: #666; font-size: 0.8em;' }, `${(file.fileSize / 1024).toFixed(2)} KB`),
            h('span', {
                style: `color: ${file.status === 'active' ? 'green' :
                    file.status === 'archived' ? 'orange' : 'red'
                    }; font-size: 0.8em;`
            }, file.status),
        ]
    );
};
</script>
<template>
    <n-tree block-line :data="treeData" :default-expanded-keys="defaultExpandedKeys" :selectable="false"
        :render-label="renderLabel" />
</template>