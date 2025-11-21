const BASE_URL = 'https://www.swapi.tech/api';

function callGet(resourceType, uid) {
}

// might need local cors proxy node module?
function callSearch(resourceType) {
  const searchTerm = document.getElementById('search').value
  const results = document.getElementById('results')
  results.textContent = ''
  console.log("Calling API on " + resourceType)
  let url = `${BASE_URL}/${resourceType}?name=${searchTerm}`
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
