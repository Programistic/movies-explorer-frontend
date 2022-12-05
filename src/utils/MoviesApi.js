import { BEATFILM_URL } from './constants';

class MoviesApi {
  constructor() {
    this._BEATFILM_URL = BEATFILM_URL;
  }

  getMovies() {
    return fetch(this._BEATFILM_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)));
  }
}

const moviesApi = new MoviesApi(BEATFILM_URL);

export default moviesApi;
