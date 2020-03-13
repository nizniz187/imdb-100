<template>
  <div>
    <movie-item v-for="(movie, index) in data.movies" 
      v-bind:key="movie.id" v-bind:movie="movie" v-bind:rank="index + 1">
    </movie-item>
    <v-btn block color="secondary" outlined v-if="!isListLoaded" v-on:click="showMoreMovies">Show More</v-btn>
  </div>
</template>

<script>
import MovieItem from 'components/MovieItem.vue';
export default {
  props: ['data'],
  computed: {
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

</style>
