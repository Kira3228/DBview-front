<script setup lang="ts">
import { Filters, PreviewTable } from '../features/event-list';
import { useCheckedFieldStore, useReportTypeStore } from '../store';

const checkedFieldStore = useCheckedFieldStore()
const reportTypeStore = useReportTypeStore()
</script>
<template>
    <div class="flex gap-5">
        <Filters />
        <PreviewTable v-if="reportTypeStore.state === `event`" :selected-fields="checkedFieldStore.state" />
    </div>
</template>

<style></style>
