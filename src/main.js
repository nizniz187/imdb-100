import Vue from 'vue';
import Vuex from 'vuex';
import VuexStore from 'modules/VuexStore.js';
import vuetify from 'plugins/vuetify.js';
import SearchBar from 'components/SearchBar.vue';
import MovieList from 'components/MovieList.vue';
import MovieDetails from 'components/MovieDetails.vue';

const store = VuexStore;

new Vue({
  el: '#app',
  store,
  vuetify,
  components: {
    SearchBar,
    MovieList, 
    MovieDetails
  },
  created() {
    this.$store.dispatch('getTopMovies');
  },
  computed: {
    isDisplayModeSearch() {
      return this.$store.getters.isDisplayModeSearch;
    },
    isDisplayModeTop() {
      return this.$store.getters.isDisplayModeTop;
    },
    ...Vuex.mapState([
      'isDetailsPanelShowed',
      'searchResults',
      'topMovies'
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