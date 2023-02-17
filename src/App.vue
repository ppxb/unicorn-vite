<script lang="ts" setup>
  const styles = [
    'color: white',
    'background: #333',
    'font-size: 12px',
    'font-weight:500',
    'border: 1px solid #fff',
    'text-shadow: 2px 2px black',
    'padding: 5px'
  ].join(';')

  console.log(`%c构建时间：${__APP_INFO__.lastBuildTime}`, styles)
</script>

<template>
  <router-view />
</template>
