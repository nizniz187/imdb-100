import Vue from 'vue';
import Vuex from 'vuex';
import SearchBar from 'components/SearchBar.vue';
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
        state.topMovies.splice(state.topMovies.length, 0, ...movies);
      }
    },
    clearMovieList: state => {
      state.topMovies.splice(0, state.topMovies.length);
    },
    showDetails: (state, { details } = {}) => {
      state.movieDetails = details;
    },
    showDetailsPanel: state => {
      state.isDetailsPanelShowed = true;
    }
  },
  actions: {
    addTopMovies: ({ commit, getters }, payload) => {
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
    searchMovie: ({ commit }, { keyword } = {}) => {
      commit('clearMovieList');

      TMDBRequest.searchMovie({
        keyword,
        successHandler: results => {
          commit('addTopMovies', { movies: results });
        }
      });
    },
    showDetails: ({ commit }, { movieId } = {}) => {
      commit('showDetailsPanel');
      
      TMDBRequest.getMovieDetails({
        movieId,
        successHandler: results => {
          commit('showDetails', { details: results });
        }
      });
    },
    showTopMovies: ({ dispatch, commit }) => {
      commit('clearMovieList');
      dispatch('getTopMovies');
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
    SearchBar,
    MovieList, 
    MovieDetails
  },
  created: function() {
    this.$store.dispatch('getTopMovies');
  },
  computed: {
    ...Vuex.mapState([
      'isDetailsPanelShowed'
    ]),
    ...Vuex.mapGetters([
      'isTopMoviesLoaded'
    ])
  },
  methods: {
    ...Vuex.mapActions([
      'getTopMovies',
      'showTopMovies'
    ])
  }
});