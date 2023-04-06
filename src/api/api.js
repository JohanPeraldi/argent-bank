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

export async function getUserData() {
  const token = localStorage.getItem('token');
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
    // If the token is not found (has been deleted by user)
    // but that a firstName value can be found in localStorage,
    // return object with firstName (this will cause user to be
    // logged out and redirected to login page)
    const username = localStorage.getItem('username');
    return {
      firstName: firstName,
    };
  }
}

export async function updateDetails(data) {
  const token = localStorage.getItem('token');
  if (token) {
    const auth = `Bearer ${token}`;
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/user/profile`,
      headers: {
        Authorization: auth,
      },
      data: data,
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
  }
}
