<script setup lang="ts">
import { NConfigProvider, darkTheme, } from 'naive-ui'
import { computed } from 'vue'
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