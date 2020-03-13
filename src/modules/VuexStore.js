import Vue from 'vue';
import Vuex from 'vuex';
import * as TMDBRequest from 'modules/TMDBRequest.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      displayMode: 'top',
      isDetailsPanelShowed: false,
      movieDetails: {},
      searchResults: {
        movies: [], limit: -1, type: 'search', keyword: ''
      },
      topMovies: {
        movies: [], limit: 100, type: 'top'
      }
    },
    mutations: {
      addSearchResults(state, { movies } = {}) {
        if(Array.isArray(movies)) {
          state.searchResults.movies.splice(state.searchResults.movies.length, 0, ...movies);
        }
      },
      addTopMovies(state, { movies } = {}) {
        if(Array.isArray(movies)) {
          state.topMovies.movies.splice(state.topMovies.movies.length, 0, ...movies);
        }
      },
      clearSearchResults(state) {
        state.searchResults.movies.splice(0, state.searchResults.movies.length);
      },
      hideDetailsPanel(state) {
        state.isDetailsPanelShowed = false;
      },
      setDisplayModeSearch(state) {
        state.displayMode = 'search';
      },
      setDisplayModeTop(state) {
        state.displayMode = 'top';
      },
      setSearchKeyword(state, { keyword } = {}) {
        if(typeof keyword !== 'string') { return; }
  
        state.searchResults.keyword = keyword;
      },
      setSearchResultsLimit(state, { limit } = {}) {
        if(Number.isInteger(limit)) {
          state.searchResults.limit = limit;
        }
      },
      showDetails(state, { details } = {}) {
        state.movieDetails = details;
      },
      showDetailsPanel(state) {
        state.isDetailsPanelShowed = true;
      }
    },
    actions: {
      getTopMovies({ commit, getters }) {
        TMDBRequest.getTopMovies({
          page: Math.floor(getters.topMoviesCount / 20 + 1),
          successHandler: results => {
            commit('addTopMovies', { movies: results });
          }
        });
      },
      searchMovie({ commit, getters }, { keyword, page = 1 } = {}) {
        commit('setSearchKeyword', { keyword });          
          TMDBRequest.searchMovie({
          keyword: getters.searchKeyword,
          page,
          successHandler: ({ results, total_results }) => {
              commit('addSearchResults', { movies: results });
              commit('setSearchResultsLimit', { limit: total_results });
          }
        });
      },
      showDetails({ commit }, { movieId } = {}) {
        commit('showDetailsPanel');
        
        TMDBRequest.getMovieDetails({
          movieId,
          successHandler(results) {
            commit('showDetails', { details: results });
          }
        });
      },
      showMoreMovies({ dispatch, getters, state }, { type }) {
        if(type === state.searchResults.type) {
          dispatch('searchMovie', { page: Math.floor(getters.searchResultsCount / 20) + 1})
        } else if(type === state.topMovies.type) {
          dispatch('getTopMovies');
        }
      },
      showSearchResults({ dispatch, commit, getters }, { keyword } = {}) {
        if(keyword === '') { return; }
        if(keyword === getters.searchKeyword) { 
          commit('setDisplayModeSearch');
          return; 
        }

        commit('clearSearchResults');
        commit('setDisplayModeSearch');
        dispatch('searchMovie', { keyword });
      },
      showTopMovies: ({ dispatch, commit, getters }) => {
        commit('setDisplayModeTop');
        if(getters.topMoviesCount === 0) {
          dispatch('getTopMovies'); 
        }
      }
    },
    getters: {
      isDisplayModeSearch(state) {
        return state.displayMode === 'search';
      },
      isDisplayModeTop(state) {
        return state.displayMode === 'top';
      },
      isTopMoviesLoaded(state, getters) {
        return getters.topMoviesCount >= 100;
      },
      searchKeyword(state) {
        return state.searchResults.keyword;
      },
      searchResultsCount(state) {
        return state.searchResults.movies.length;
      },
      topMoviesCount(state) {
        return state.topMovies.movies.length;
      }
    } 
  });