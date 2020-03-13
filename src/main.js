import Vue from 'vue';
import Vuex from 'vuex';
import MovieList from 'components/MovieList.vue';
import MovieDetails from 'components/MovieDetails.vue';
import * as TMDBRequest from 'modules/TMDBRequest.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    topMovies: []
  },
  mutations: {
    addTopMovies: function(state, { movies } = {}) {
      if(Array.isArray(movies)) {
        movies.forEach(movie => { state.topMovies.push(movie); });
      }
    }
  },
  actions: {
    addTopMovies: function({ commit, getters }, payload) {
      if(getters.isTopMoviesLoaded) { return; }
      
      commit('addTopMovies', payload);
    }
  },
  getters: {
    isTopMoviesLoaded: (state, getters) => { return getters.topMoviesCount >= 100; },
    topMoviesCount: state => { return state.topMovies.length; }
  } 
});

new Vue({
  el: '#app',
  store,
  components: {
    MovieList, 
    MovieDetails
  },
  created: function() {
    this.getTopMovies();
  },
  methods: {
    getTopMovies() {
      if(this.$store.getters.isTopMoviesLoaded) { return; }

      TMDBRequest.getTopMovies({ 
        page: Math.floor(this.$store.getters.topMoviesCount / 20 + 1),
        successHandler: ({ data: { results } = {} } = {}) => { 
          this.$store.dispatch('addTopMovies', { movies: results })
        } 
      });
    }
  }
});