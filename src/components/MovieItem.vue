<template>
  <div class="movie-item" v-on:click="showDetails({ movieId: movie.id })">
    <div class="movie-title">{{ rank }}. {{ movie.title }} - {{ movie.popularity }}</div>
    <div>{{ movie.overview }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['rank', 'movie'],
  methods: {
    ...mapActions([
      'showDetails'
    ]),
  }
}
</script>

<style scoped>
  .movie-item {
    margin-bottom: 10px;
  }
  .movie-item .movie-title {
    font-weight: bold;
  }
</style>