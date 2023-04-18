import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const name = "";

const fetchCountryBtn = document.querySelector("#search-box");
const CountryList = document.querySelector(".country-list");
const CountryInfo = document.querySelector(".country-info");

console.log(fetchCountryBtn);

fetchCountryBtn.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
 e.preventDefault();

    name = e.target.value;
    fetchCountries(name)
        .then((name) => CountryList.innerHTML = renderCountriesList(name))
        .catch((err) => console.log(err));
};

// function renderCountriesInfo(arr) {
//     return arr.map(
//         ({ name: { common }, flags: { svg }, capital, languages, population }) =>    
//         `<li>
//             <img src="${svg}" alt="${common}">
//           </li>
//       `).join("");
//  };

function renderCountriesList(arr) {
    return arr.map(
        ({ name: { common }, flags: { svg }, capital, languages, population }) =>    
        `<li>
            <img src="${svg}" alt="${common}">
          </li>
      `).join("");
};

export {name}