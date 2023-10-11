const axios = require('axios');

async function fetchPostDataFromJsonPlaceHolder() {
  const url = 'http://jsonplaceholder.typicode.com/posts'
  return await axios.get(url)
}

module.exports = { fetchPostDataFromJsonPlaceHolder }