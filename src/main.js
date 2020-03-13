import Vue from 'vue';
import Vuex from 'vuex';
import MovieList from 'components/MovieList.vue';
import MovieDetails from 'components/MovieDetails.vue';
import * as TMDBRequest from 'modules/TMDBRequest.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    topMovies: [],
    isDetailsPanelShowed: false,
    movieDetails: null
  },
  mutations: {
    addTopMovies: (state, { movies } = {}) => {
      if(Array.isArray(movies)) {
        movies.forEach(movie => { state.topMovies.push(movie); });
      }
    },
    showDetails: (state, { details } = {}) => {
      state.movieDetails = details;
    },
    showDetailsPanel: state => {
      state.isDetailsPanelShowed = true;
    }
  },
  actions: {
    addTopMovies: function({ commit, getters }, payload) {
      if(getters.isTopMoviesLoaded) { return; }
      
      commit('addTopMovies', payload);
    },    
    getTopMovies({ dispatch, getters }) {
      if(getters.isTopMoviesLoaded) { return; }

      TMDBRequest.getTopMovies({
        page: Math.floor(getters.topMoviesCount / 20 + 1),
        successHandler: results => {
          dispatch('addTopMovies', { movies: results });
        }
      });
    },
    showDetails: function({ commit }, { movieId } = {}) {
      commit('showDetailsPanel');
      
      TMDBRequest.getMovieDetails({
        movieId,
        successHandler: results => {
          commit('showDetails', { details: results });
        }
      });
    }
  },
  getters: {
    isDetailsPanelShowed: state => { return state.isDetailsPanelShowed; },
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
    this.$store.dispatch('getTopMovies');
  },
  computed: {
    ...Vuex.mapGetters([
      'isDetailsPanelShowed',
      'isTopMoviesLoaded'
    ])
  },
  methods: {
    ...Vuex.mapActions([
      'getTopMovies'
    ])
  }
});