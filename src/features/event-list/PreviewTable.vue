<script setup lang="ts">
defineProps<{
    selectedFields: { key: string; label: string }[]
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