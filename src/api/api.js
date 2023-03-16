import axios from 'axios';

const port = '3001';
const baseUrl = `http://localhost:${port}/api/v1`;

export async function getUserData(user) {
  let data = JSON.stringify(user);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      console.log('Token: ', JSON.stringify(response.data.body.token));
      window.localStorage.setItem(
        'Token',
        JSON.stringify(response.data.body.token)
      );
    })
    .catch((error) => {
      console.log(error);
    });
}
