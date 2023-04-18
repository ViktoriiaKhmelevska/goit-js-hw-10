import { name } from './index'

function fetchCountries(name) {
      return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
    }
        const Promise = response.json()
        return Promise;
    });
};

export function fetchCountries() {}

