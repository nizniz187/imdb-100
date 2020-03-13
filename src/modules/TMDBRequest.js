import axios from 'axios';

const HOST = 'https://api.themoviedb.org/3';
const API_KEY = '70ab38cd7822777d9232fb0822e80e00';

export function getMovieDetails({ movieId, successHandler, errorHandler } = {}) {
  console.log(`${HOST}/movie/${movieId}?api_key=${API_KEY}`)
  return axios.get(`${HOST}/movie/${movieId}?api_key=${API_KEY}`)
    .then(({ data } = {}) => {
      resolveHandler(data, successHandler);
    })
    .catch(error => {
      rejectHandler(error, errorHandler);
    });
}
export function getTopMovies({ page = 1, successHandler, errorHandler } = {}) {
  return axios.get(`${HOST}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`)
    .then(({ data: { results } = {} } = {}) => {
      resolveHandler(results, successHandler);
    })
    .catch(error => {
      rejectHandler(error, errorHandler);
    });
}
export function searchMovie({ keyword, page = 1, successHandler, errorHandler } = {}) {
  return axios.get(`${HOST}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}&page=${page}`)
    .then(({ data } = {}) => {
      resolveHandler(data, successHandler);
    })
    .catch(error => {
      rejectHandler(error, errorHandler);
    });
}

function resolveHandler(response, callback) {
  console.debug(response);
  if(typeof callback === 'function') { callback(response); }
}
function rejectHandler(error, callback) {
  console.error(error);
  if(typeof callback === 'function') { callback(error); }
}