const BASE_URL = 'https://www.swapi.tech/api';

function buildUrl(uri, params = {}) {
  const queryString = new URLSearchParams(params).toString()

  let url = `${BASE_URL}/${uri}`

  if (queryString !== '') {
    url += `?${queryString}`
  }

  return url
}

function callGet(resourceType, uid) {
  let url = buildUrl(`${resourceType}/${uid}`)
  const properties = ['name', 'birth_year', 'gender', 'eye_color']
  const tableHead = document.getElementById('table-head')
  const tableBody = document.getElementById('table-body')
  fetch(url)
    .then(response => resposne.json())
    .then(resonseJson => {
      console.log(responseJson.result.properties)
      properties.forEach((prop) => {
        console.log("prop: ", prop)
        let th = document.createElement('th')
        th.innerHTML = prop
        tableHead.append(th)
      }
    })
}

function callSearch(resourceType) {
  const searchTerm = document.getElementById('search').value
  const results = document.getElementById('results')
  results.textContent = ''
  console.log("Calling API on " + resourceType)

  const url = buildUrl(resourceType, { name: searchTerm })
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson.result)
      responseJson.result.forEach((record) => {
        console.log(record.uid)
        const textNode = document.createElement('li')
        textNode.innerHTML = `${record.properties.name} (<a href='${resourceType}/${record.uid}'>details</a>)`
        results.append(textNode)
      })
    })
}
