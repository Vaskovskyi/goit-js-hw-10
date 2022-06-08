import './css/styles.css'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import API from './fetchCountries'
import listOfCountries from './countries/listOfCountries.hbs'
import country from './countries/country.hbs'

const refs = {
  countryInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
}

// очистка инпута при ошибке
function clearMarkup() {
  refs.countryInfo.innerHTML = ''
  refs.countryList.innerHTML = ''
}
//---------

let countryToSearch = ''

const DEBOUNCE_DELAY = 300
refs.countryInput.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY),
)
function onCountryInput(e) {
  e.preventDefault()
  countryToSearch = refs.countryInput.value.trim()
  console.log(countryToSearch)
  if (!countryToSearch) {
    return clearMarkup()
  }
  API.fetchArticles(countryToSearch)
    .then((countries) => {
      if (countries.length > 10) {
        clearMarkup()
        alertTooManyMatches()
        return
      } else if (countries.length === 1) {
        clearMarkup()
        renderMarkup(country, countries[0])
        return
      } else if (countries.length > 1 && countries.length <= 10) {
        clearMarkup()
        renderMarkup(listOfCountries, countries)
        return
      }
    })
    .catch(() => {
      clearMarkup(), alertWrongName()
    })
}

function renderMarkup(template, countries) {
  const markup = template(countries)
  refs.countryInfo.insertAdjacentHTML('beforeend', markup)
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.',
  )
}
