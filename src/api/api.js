import axios from 'axios';

export async function sendCredentials(userCredentials) {
  let data = JSON.stringify(userCredentials);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/user/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => response)
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
}
