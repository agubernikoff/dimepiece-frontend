const { fetchPostDataFromJsonPlaceHolder } = require('./external-request')

const getAllPosts = async (req, res, next) => {
  try {
    const response = await fetchPostDataFromJsonPlaceHolder();
    let list = [];
    if (response?.data) list = response?.data?.map(a => a)
    res.send({ status: 200, message: 'Ok', list })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllPosts
}
