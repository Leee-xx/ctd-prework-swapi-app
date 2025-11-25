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

function showError(message) {
  const errorDiv = document.getElementById('error-message')
  errorDiv.style.visibility = 'visible'
  errorDiv.innerHTML = message
}

function clearSearch() {
  document.getElementById('search').value = ''
}

async function callSearch(resourceType) {
  const searchTerm = document.getElementById('search').value

  if (searchTerm === '') {
    showError('Please specify a search term')
    return
  }

  const resultsNode = document.getElementById('results')
  resultsNode.textContent = ''

  const url = buildUrl(resourceType, { name: searchTerm })
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.log(response)
      showError(`Couldn't fetch: ${response.status}`)
      return
    }
    const responseJson = await response.json()
    const results = responseJson.result

    if (results.length > 0) {
      results.forEach((record) => {
        const textNode = document.createElement('p')
        textNode.innerHTML = `${record.properties.name} (<a href='${resourceType}/${record.uid}'>details</a>)`
        resultsNode.append(textNode)
      })
    } else {
      showError('No results found!')
    }
  } catch (error) {
    console.log(error)
    showError(`Something went wrong with the fetch: ${error}. The server might not be reachable`)
  }
}
