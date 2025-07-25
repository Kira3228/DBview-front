<script setup lang="ts">
import { NButton, NConfigProvider, darkTheme, type GlobalThemeOverrides, } from 'naive-ui'
import { ref, watch } from 'vue'

const currentTheme = ref(darkTheme) // null = светлая, darkTheme = тёмная


// Следим за сменой темы и обновляем фон страницы
watch(currentTheme, (newTheme) => {
  document.body.style.backgroundColor = newTheme === darkTheme
    ? '#101014'  // Тёмный фон (можно заменить на любой)
    : '#ffffff'  // Светлый фон
})
</script>
<template>
  <NConfigProvider :theme="currentTheme">

    <router-view />
  </NConfigProvider>
</template>

<style>
body {
  /* background-color: #101016; */
}
</style>
