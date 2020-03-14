<template>
  <div class="movie-list">
    <movie-item v-for="(movie, index) in data.movies" 
      v-bind:key="movie.id" v-bind:movie="movie" v-bind:rank="index + 1">
    </movie-item>
    <div v-if="isListEmpty">
      <h1 min-width="100%" class="text-center">No Result</h1>
    </div>
    <v-btn block color="secondary" outlined v-else-if="!isListLoaded" v-on:click="showMoreMovies">Show More</v-btn>
  </div>
</template>

<script>
import MovieItem from 'components/MovieItem.vue';
export default {
  props: ['data'],
  computed: {
    isListEmpty() {
      return this.data.movies.length === 0;
    },
    isListLoaded() {
      return this.data.limit > 0 && this.data.movies.length >= this.data.limit;
    }
  },
  components: { MovieItem },
  methods: {
    showMoreMovies() {
      this.$store.dispatch('showMoreMovies', { type: this.data.type });
    }
  }
}
</script>

<style scoped>
  .movie-list { width: 100%; }
</style>