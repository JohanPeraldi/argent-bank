import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../features/login/loginSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();

  return (
    <form>
      <div className={styles['input-wrapper']}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className={styles['input-remember']}>
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {!loggedIn && (
        <button
          className={styles['sign-in-button']}
          onClick={() => dispatch(login())}
        >
          <Link to="/user">Sign In</Link>
        </button>
      )}
    </form>
  );
}
