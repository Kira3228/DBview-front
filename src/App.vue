<script setup lang="ts">
import { NButton, NMenu, NSelect, NCard, NDatePicker, NDataTable, type DataTableColumn } from 'naive-ui';
import { NButtonGroup } from 'naive-ui';
import { NInputGroup } from 'naive-ui';
import { NInput } from 'naive-ui';
import SearchIcon from './components/Icons/SearchIcon.vue';
import { computed, ref } from 'vue';
import Layout from './Layout/Layout.vue';
import EventLogPage from './pages/EventLogPage.vue';

const accordionRef = ref(false)




</script>
<template>
  <EventLogPage />

</template>

<style style scoped></style>
