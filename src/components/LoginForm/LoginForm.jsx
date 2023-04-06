import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendCredentials } from '../../api/api';
import { login } from '../../features/login/loginSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // If a valid token is found in localStorage, log user in and navigate to Profile page
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(login());
      navigate('/profile');
    }
  }, [dispatch, navigate]);
  // Username and password values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Have input fields been entered and exited by user (blur event)?
  const [usernameInputEntered, setUsernameInputEntered] = useState(false);
  const [passwordInputEntered, setPasswordInputEntered] = useState(false);
  // Remember me functionality to allow user to be automatically
  // logged in if his credentials are stored in localStorage
  const [rememberMe, setRememberMe] = useState(false);
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
      // API call with user's entered credentials
      const response = await sendCredentials({
        email: username,
        password: password,
      });
      if (response.status === 200) {
        // Get token from API response and store it in localStorage
        const { token } = response.data.body;
        if (rememberMe) {
          window.localStorage.setItem('token', token);
        }
        dispatch(login());
        navigate('/profile');
      }
      if (response.status === 400) {
        setDisplayInvalidCredentialsMessage(true);
      }
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
  const rememberMeHandler = (event) => {
    setRememberMe(event.target.checked);
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
        <input type="checkbox" id="remember-me" onChange={rememberMeHandler} />
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
