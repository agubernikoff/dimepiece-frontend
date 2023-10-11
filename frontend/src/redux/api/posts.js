import axios from 'axios';

export const getAllPostsApi = async () => {
  return await axios
    .get('http://localhost:8080/api/posts')
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
