const BASE_URL = 'https://www.swapi.tech/api';

function buildUrl(uri, params = {}) {
  const queryString = new URLSearchParams(params).toString()

  let url = `${BASE_URL}/${uri}`

  if (queryString !== '') {
    url += `?${queryString}`
  }

  return url
}

function callGet(resourceType, uid, properties = []) {
  let url = buildUrl(`${resourceType}/${uid}`)
  const tableBody = document.getElementById('table-body')
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      const row = document.createElement('tr')
      properties.forEach((prop) => {
        const td = document.createElement('td')
        td.innerHTML = responseJson.result.properties[prop]
        row.append(td)
      })
      tableBody.append(row)
    })
}

function callSearch(resourceType) {
  const searchTerm = document.getElementById('search').value
  const results = document.getElementById('results')
  const errorDiv = document.getElementById('error-message')
  results.textContent = ''

  const url = buildUrl(resourceType, { name: searchTerm })
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.result.length > 0) {
        responseJson.result.forEach((record) => {
          const textNode = document.createElement('p')
          textNode.innerHTML = `${record.properties.name} (<a href='${resourceType}/${record.uid}'>details</a>)`
          results.append(textNode)
        })
      } else {
        errorDiv.innerHTML = 'No results!'
        errorDiv.style.visibility = 'visible'
      }
    })
}
