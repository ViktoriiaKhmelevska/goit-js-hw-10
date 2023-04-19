import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 500;
let inputValue = "";

const fetchCountryBtn = document.querySelector("#search-box");
const CountryList = document.querySelector(".country-list");
const CountryInfo = document.querySelector(".country-info");

fetchCountryBtn.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();

    inputValue = e.target.value.trim();
    if (!inputValue) {
        CountryList.innerHTML = "";
        CountryInfo.innerHTML = "";  
        return
    }

    fetchCountries(inputValue)
        .then((name) => {
            console.log(name);
            if (name.length < 2) {
            CountryList.innerHTML = "";    
            CountryInfo.innerHTML = renderCountriesInfo(name)
            } if (name.length > 2 && name.length < 10) {
             CountryInfo.innerHTML = "";  
             CountryList.innerHTML = renderCountriesList(name)
            } if (name.length >= 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                CountryList.innerHTML = "";
            }
            })
        .catch((err) => {
            Notify.failure("Oops, there is no country with that name");
            CountryList.innerHTML = "";
            });
        };

function renderCountriesInfo(arr) {
    return arr.map(
        ({ name: { official }, flags: { svg }, capital, languages, population }) =>    
        `   <div class="name-flag"><img src="${svg}" alt="${official}" width=20px height=20px></div>
            <h2>${official} ${official}</h2></div>
            <h2>${capital}</h2>
            <h2>${languages}</h2>
            <h2>${population}</h2>
      `).join("");
 };

function renderCountriesList(arr) {
    return arr.map(
        ({ name: { official }, flags: { svg }}) =>    
        `<li class="name-flag">
            <img src="${svg}" alt="${official}" width=50px height=50px>
             <h2>${official}</h2>
          </li>
      `).join("");
};
