import Vue from 'vue';
import MovieList from 'components/movie-list.js';

new Vue({
  el: '#app',
  data: {
    movies: [
      { id: 'movie1', rank: 1, title: 'The Shawshank Redemption', rating: '9.2'},
      { id: 'movie2', rank: 2, title: 'God Father', rating: '9.1' },
      { id: 'movie3', rank: 3, title: 'God Father II', rating: '9.0' }
    ]
  },
  components: {
    MovieList
  }
});