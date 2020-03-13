<template>
  <div class="movie-details">{{ movieDetails }}</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    movieDetails() {
      return this.$store.state.movieDetails;
    }
  }
}
</script>

<style scoped>
  .movie-details {
    background-color: white;
    border: 1px solid black;
    width: 90vw; height: 90vh;
    position: absolute; top: 5%; left: 5%;
  }
</style>