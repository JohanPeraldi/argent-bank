import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendCredentials } from '../../api/api';
import { login } from '../../features/login/loginSlice';
import { toggle } from '../../features/rememberMe/rememberMeSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const rememberMe = useSelector((state) => state.rememberMe.rememberMe);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Keep track of the checkbox's state
  const [isChecked, setIsChecked] = useState(undefined);
  console.log('Checkbox is checked: ', isChecked);
  // Update Redux state to match checkbox's state
  useEffect(() => {
    if (isChecked !== rememberMe) {
      dispatch(toggle());
    }
  }, [dispatch, isChecked, rememberMe]);
  // Get email from localStorage
  const emailFromLocalStorage = localStorage.getItem('email');
  // Email and password values (in case Remember me checkbox was previously checked,
  // the user's email will have been stored in localStorage, in which case we give
  // email the value of emailFromLocalStorage)
  const [email, setEmail] = useState(emailFromLocalStorage || '');
  const [password, setPassword] = useState('');
  // Have input fields been entered and exited by user (blur event)?
  const [emailInputEntered, setEmailInputEntered] = useState(false);
  const [passwordInputEntered, setPasswordInputEntered] = useState(false);
  // Validity of email and password values (only reject empty field for email
  // and passwords with less than 8 characters, but may be further restricted)
  const emailIsValid = email.trim() !== '';
  const passwordIsValid = password.trim().length > 7;
  // Error message should only be displayed if input box has received
  // and lost focus (blur event) without user providing a valid value
  const displayEmailInputErrorMessage = !emailIsValid && emailInputEntered;
  const displayPasswordInputErrorMessage =
    !passwordIsValid && passwordInputEntered;
  // Invalid credentials error message
  const [
    displayInvalidCredentialsMessage,
    setDisplayInvalidCredentialsMessage,
  ] = useState(false);
  // Dynamic className depending on both input validity
  // and input field being entered and left (blur event)
  const emailInputClassName = displayEmailInputErrorMessage
    ? 'input-invalid'
    : '';
  const passwordInputClassName = displayPasswordInputErrorMessage
    ? 'input-invalid'
    : '';
  // Form validity (false by default, true if both inputs are valid)
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  // Event handler functions
  const inputChangeHandler = (event) => {
    if (event.target.type === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.type === 'password') {
      setPassword(event.target.value);
    }
  };
  const inputBlurHandler = (event) => {
    if (event.target.type === 'email') {
      setEmailInputEntered(true);
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
        email: email,
        password: password,
      });
      if (response.status === 200) {
        // Get token from API response and store it in localStorage
        const { token } = response.data.body;
        localStorage.setItem('token', token);
        // If rememberMe is true, it means that the checkbox is checked,
        // in which case we want to store the user's email in localStorage
        // in order to retrieve it when later visiting the login page
        // and save the user from typing it again
        if (rememberMe) {
          localStorage.setItem('email', email);
        }
        dispatch(login());
        navigate('/profile');
      }
      if (response.status === 400) {
        setDisplayInvalidCredentialsMessage(true);
      }
      // Empty input fields
      setEmail('');
      setPassword('');
      // Reset user interaction history with input fields (back to false)
      setEmailInputEntered(false);
      setPasswordInputEntered(false);
    }
  };
  const hideInvalidCredentialsMessage = () => {
    setDisplayInvalidCredentialsMessage(false);
  };
  const checkboxStateHandler = (event) => {
    setIsChecked(event.target.checked);
    dispatch(toggle());
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={styles['input-wrapper']}>
        <label htmlFor="email">Username</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles[emailInputClassName]}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          onFocus={hideInvalidCredentialsMessage}
          value={email}
        />
        {displayEmailInputErrorMessage && (
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
        {/* If no email has been stored in localStorage, it means that
        the "Remember me" checkbox was not previously checked and so
        the checkbox must remain unchecked and no email value can
        be prefilled */}
        {/* {!emailFromLocalStorage && ( */}
        <input
          type="checkbox"
          id="remember-me"
          onChange={checkboxStateHandler}
        />
        {/* )} */}
        {/* On the contrary, if an email has been stored in localStorage, it means that
        the "Remember me" checkbox was previously checked and so
        the checkbox must remain checked and the email value found in localStorage
        will be used to prefill the "Username" input field.
        The following, however, will result in the checkbox being
        ALWAYS checked!!!
        {emailFromLocalStorage && (
          <input
            type="checkbox"
            id="remember-me"
            onChange={checkboxStateHandler}
            checked
          />
        )} */}
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
