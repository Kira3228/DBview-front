import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { TreeOption } from 'naive-ui';
import { data } from "../pages/mock";


export type Column = {
    key: string;
    label: string;
};

const useCheckedFieldStore = defineStore('checked-store', () => {
    const checkedKeys = ref<string[]>([]);
    const state = ref<Column[]>([]);

    const selectedFields = computed<Column[]>(() => {
        const fields: Column[] = [];
        const findLabel = (tree: TreeOption[], targetKey: string, parentLabel = ''): string | null => {
            for (const node of tree) {
                const fullLabel = parentLabel ? `${parentLabel} > ${node.label}` : String(node.label);
                if (node.key === targetKey) return fullLabel;
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

    const updateSelectedFields = () => {
        state.value = [...selectedFields.value];
    };
    const setCheckedKeys = (newKeys: string[]) => {
        checkedKeys.value = newKeys;
        updateSelectedFields();
    };
    return {
        state,
        checkedKeys,
        selectedFields,
        updateSelectedFields,
        setCheckedKeys,
    };
});
export default useCheckedFieldStore