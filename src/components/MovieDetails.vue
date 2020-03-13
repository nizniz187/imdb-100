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
    width: 80vw; height: 80vh;
    position: absolute; top: 10%; left: 10%;
  }
</style>