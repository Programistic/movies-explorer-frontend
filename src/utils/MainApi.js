import { BASE_URL, API_URL } from './constants';

const getResponseData = (res) => (res.ok ? res.json() : Promise.reject(res));

export const getCurrentUser = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => getResponseData(res));

export const editCurrentUser = (email, name) => fetch(`${BASE_URL}/users/me`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  body: JSON.stringify({ email, name }),
})
  .then((res) => getResponseData(res));

export const getAllSavedMovies = () => fetch(`${BASE_URL}/movies`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
})
  .then((res) => getResponseData(res));

export const saveMovie = (movie) => fetch(`${BASE_URL}/movies`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  body: JSON.stringify({
    movieId: movie.id,
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `${API_URL}${movie.image.url}`,
    trailerLink: movie.trailerLink,
    thumbnail: `${API_URL}${movie.image.formats.thumbnail.url}`,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  }),
})
  .then((res) => getResponseData(res));

  export const deleteMovie = (movieId) => fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then((res) => getResponseData(res));
