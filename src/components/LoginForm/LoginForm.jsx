import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendCredentials } from '../../api/api';
import { login } from '../../features/login/loginSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  // Invalid credentials error message
  const [
    displayInvalidCredentialsMessage,
    setDisplayInvalidCredentialsMessage,
  ] = useState(false);
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
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log('Username: ', username);
      console.log('Password: ', password);
      // API call with user's entered credentials
      const response = await sendCredentials({
        email: username,
        password: password,
      });
      if (response.status === 200) {
        const { token } = response.data.body;
        window.localStorage.setItem('token', token);
        console.log('Token: ', token);
        dispatch(login());
        navigate('/profile');
      }
      if (response.status === 400) {
        console.log('Invalid credentials!');
        setDisplayInvalidCredentialsMessage(true);
      }
      console.log(response);
      // Empty input fields
      setUsername('');
      setPassword('');
      // Reset user interaction history with input fields (back to false)
      setUsernameInputEntered(false);
      setPasswordInputEntered(false);
    }
  };
  const hideInvalidCredentialsMessage = () => {
    setDisplayInvalidCredentialsMessage(false);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
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
          onFocus={hideInvalidCredentialsMessage}
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
          onFocus={hideInvalidCredentialsMessage}
          value={password}
        />
        {displayPasswordInputErrorMessage && (
          <p className={styles.error}>
            Password should be at least 8 characters long!
          </p>
        )}
        {displayInvalidCredentialsMessage && (
          <p className={styles.error}>Invalid credentials!</p>
        )}
      </div>
      <div className={styles['input-remember']}>
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {!loggedIn && (
        <button className={styles['sign-in-button']} disabled={!formIsValid}>
          Sign In
        </button>
      )}
    </form>
  );
}
