const BASE_URL = 'https://www.swapi.tech/api';


// might need local cors proxy node module?
function callApi(resourceType) {
  const searchTerm = document.getElementById('search').value
  const results = document.getElementById('results')
  console.log("Calling API on " + resourceType)
  let url = `${BASE_URL}/${resourceType}?name=${searchTerm}`
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson.result)
    })
}
