import { BASE_URL } from './constants';

const getResponseData = (res) => (res.ok ? res.json() : Promise.reject(new Error(`Error ${res.status}`)));

export const register = (name, email, password) => fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => getResponseData(res));

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => getResponseData(res));
