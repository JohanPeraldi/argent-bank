import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../../api/api';
import { login } from '../../features/login/loginSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();
  // Username and password values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Have input fields been entered and exited by user (blur event)?
  const [usernameInputEntered, setUsernameInputEntered] = useState(false);
  const [passwordInputEntered, setPasswordInputEntered] = useState(false);
  // Validity of username and password values (only reject empty field for username
  // and passwords with less than 8 characters, but may be further restricted)
  const usernameIsValid = username.trim() !== '';
  const passwordIsValid = password.trim().length > 7;
  // Error message should only be displayed if input box has received
  // and lost focus (blur event) without user providing a valid value
  const displayUsernameInputErrorMessage =
    !usernameIsValid && usernameInputEntered;
  const displayPasswordInputErrorMessage =
    !passwordIsValid && passwordInputEntered;
  // Dynamic className depending on both input validity
  // and input field being entered and left (blur event)
  const usernameInputClassName = displayUsernameInputErrorMessage
    ? 'input-invalid'
    : '';
  const passwordInputClassName = displayPasswordInputErrorMessage
    ? 'input-invalid'
    : '';
  // Form validity (false by default, true if both inputs are valid)
  let formIsValid = false;
  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }
  // Event handler functions
  const inputChangeHandler = (event) => {
    if (event.target.type === 'text') {
      setUsername(event.target.value);
    }
    if (event.target.type === 'password') {
      setPassword(event.target.value);
    }
  };
  const inputBlurHandler = (event) => {
    if (event.target.type === 'text') {
      setUsernameInputEntered(true);
    }
    if (event.target.type === 'password') {
      setPasswordInputEntered(true);
    }
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      // API call with user's entered credentials
      const userCredentials = {
        email: username,
        password: password,
      };
      getUserData(userCredentials).then(verifyCredentials());
      console.log('Username: ', username);
      console.log('Password: ', password);
      // Verify credentials and either
      // 1. If entered credentials are valid, redirect user to his account details or
      // 2. If entered credentials are invalid, display message to that effect

      // Empty input fields
      setUsername('');
      setPassword('');
      // Reset user interaction history with input fields (back to false)
      setUsernameInputEntered(false);
      setPasswordInputEntered(false);
    }
  };
  const verifyCredentials = () => {
    if (window.localStorage.getItem('Token')) {
      console.log('There is a token stored in localStorage');
    } else {
      console.log('No token stored in localStorage!');
    }
  };

  return (
    <Form method="post" onSubmit={formSubmissionHandler}>
      <div className={styles['input-wrapper']}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className={styles[usernameInputClassName]}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          value={username}
        />
        {displayUsernameInputErrorMessage && (
          <p className={styles.error}>Username field cannot be empty!</p>
        )}
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles[passwordInputClassName]}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          value={password}
        />
        {displayPasswordInputErrorMessage && (
          <p className={styles.error}>
            Password should be at least 8 characters long!
          </p>
        )}
      </div>
      <div className={styles['input-remember']}>
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {!loggedIn && (
        <button
          className={styles['sign-in-button']}
          disabled={!formIsValid}
          onClick={() => dispatch(login())}
        >
          Sign In
        </button>
      )}
    </Form>
  );
}
