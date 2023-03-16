import React, { useState } from 'react';
import { useSelector /* useDispatch */ } from 'react-redux';
// import { login } from '../../features/login/loginSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  // const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameInputChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordInputChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log('Username: ', username);
    console.log('Password: ', password);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={styles['input-wrapper']}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={usernameInputChangeHandler}
        />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={passwordInputChangeHandler}
        />
      </div>
      <div className={styles['input-remember']}>
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {!loggedIn && (
        <button
          className={styles['sign-in-button']}
          // onClick={() => dispatch(login())}
        >
          Sign In
        </button>
      )}
    </form>
  );
}
