import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.css';

export default function Login() {
  useEffect(() => {
    document.title = 'Argent Bank - Login';
  }, []);

  return (
    <main className="main bg-dark">
      <section className={styles['sign-in-content']}>
        <i className={`fa fa-user-circle ${styles['sign-in-icon']}`}></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authenticationData = {
    username: data.get('username'),
    password: data.get('password'),
  };
  const port = '3001';
  const baseUrl = `http://localhost:${port}/api/v1`;
  const body = JSON.stringify(authenticationData);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  };

  axios.request(config).then((response) => {
    console.log(JSON.stringify(response.data));
    if (response.status === 400) {
      // Invalid fields
    }
    if (response.status === 500) {
      // Internal server error
    }
    if (response.status === 200) {
      // TODO: Manage token

      return redirect('/profile');
    }
  });
}
