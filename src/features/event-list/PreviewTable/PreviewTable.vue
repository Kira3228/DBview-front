<script setup lang="ts">
import type { Column } from '../../../store/checkedFieldsStore';

defineProps<{
    selectedFields: Column[]
}>()
</script>
<template>
    <div>
        <h4>Выбранные поля</h4>
        <table class="selected-fields-table">
            <thead>
                <tr>
                    <th class="border-1 border-black p-2.5" v-for="field in selectedFields" :key="field.key">{{
                        field.label }}
                    </th>
                </tr>
            </thead>
        </table>
    </div>
</template>