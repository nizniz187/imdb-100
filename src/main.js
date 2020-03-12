import Vue from 'vue';
import MovieList from 'components/movie-list.js';

import axios from 'axios';

let vm = new Vue({
  el: '#app',
  data: {
    movies: []
  },
  components: {
    MovieList
  }
});

axios.get('https://api.themoviedb.org/3/discover/movie?api_key=70ab38cd7822777d9232fb0822e80e00&sort_by=popularity.desc')
  .then(function (response) {
    // handle success
    console.log(response);
    vm.movies = response.data.results;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
