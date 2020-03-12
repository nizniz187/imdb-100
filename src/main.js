import Vue from 'vue';
import MovieList from 'components/MovieList.vue';
import MovieDetails from 'components/MovieDetails.vue';
import * as TMDBRequest from 'modules/TMDBRequest.js';

let vm = new Vue({
  el: '#app',
  data: {
    movies: [],
    isListLoadComplete: false
  },
  components: {
    MovieList, 
    MovieDetails
  },
  created: function() {
    this.getTopMovies();
  },
  methods: {
    getTopMovies() {
      if(this.loadComplete) { return; }

      TMDBRequest.getTopMovies({ 
        page: Math.floor(this.movies.length / 20 + 1),
        successHandler: ({ data: { results } = {} } = {}) => { 
          if(Array.isArray(results)) {
            results.forEach(movie => { this.movies.push(movie); });
            
            if(this.movies.length >= 100) { this.loadComplete = true; }
          } else {
            console.log('No result.');
          }
        } 
      });
    }
  }
});