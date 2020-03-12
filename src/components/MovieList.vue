<template>
  <div>
    <movie-item v-for="(movie, index) in movies" 
      v-bind:key="movie.id" v-bind:movie="movie" v-bind:rank="index + 1">
    </movie-item>
  </div>
</template>

<script>
import MovieItem from 'components/MovieItem.vue';
export default {
  components: { MovieItem },
  props: ['movies']
}
</script>

<style scoped>

</style>
