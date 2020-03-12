<template>
  <div style="margin-bottom: 10px">
    <div style="font-weight:bold">{{ rank }}. {{ movie.title }} - {{ movie.popularity }}</div>
    <div>{{ movie.overview }}</div>
  </div>
</template>

<script>
export default {
  props: ['rank', 'movie']
}
</script>

<style scoped>

</style>