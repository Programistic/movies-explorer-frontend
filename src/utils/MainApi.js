import { BASE_URL } from './constants';

const getResponseData = (res) => (res.ok ? res.json() : Promise.reject(new Error(`Error ${res.status}`)));

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
    image: `${BASE_URL}${movie.image.url}`,
    trailerLink: movie.trailerLink,
    thumbnail: `${BASE_URL}${movie.image.formats.thumbnail.url}`,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  }),
})
  .then((res) => getResponseData(res));
