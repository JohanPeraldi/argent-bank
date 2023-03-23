import axios from 'axios';

export function sendCredentials(userCredentials) {
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

export function getUserData() {
  const token = JSON.parse(window.localStorage.getItem('token'));
  if (token) {
    const auth = `Bearer ${token}`;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/user/profile`,
      headers: {
        Authorization: auth,
      },
    };

    return axios
      .request(config)
      .then((response) => {
        console.log(response.data.body);
        return response.data.body;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
  } else {
    console.log('No token found!');
  }
}
