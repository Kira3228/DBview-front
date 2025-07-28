<script setup lang="ts">
import { NButton, NConfigProvider, darkTheme, } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useTheme } from './store'
const themeStore = useTheme()

const currentTheme = computed(() => {
  return themeStore.state ? darkTheme : null
})

</script>
<template>
  <NConfigProvider :theme="currentTheme">
    <router-view />
  </NConfigProvider>
</template>