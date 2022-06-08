'use strict'

const baseUrl = 'https://restcountries.com/v2/name'

function fetchArticles(query) {
  const requestParams = `${query}`
  return fetch(`${baseUrl}/${requestParams}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
  })
}
export default { fetchArticles }
