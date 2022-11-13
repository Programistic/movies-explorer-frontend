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
