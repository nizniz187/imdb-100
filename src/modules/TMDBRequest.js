import axios from 'axios';

const HOST = 'https://api.themoviedb.org/3';
const API_KEY = '70ab38cd7822777d9232fb0822e80e00';

export function getTopMovies(page = 1) {
  return axios.get(`${HOST}/discover/movie?api_key=${API_KEY}&page=${page}`);
}