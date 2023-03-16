import React, { useState } from 'react';
import { useSelector /* useDispatch */ } from 'react-redux';
// import { login } from '../../features/login/loginSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  // const dispatch = useDispatch();
  // Username and password values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Validity of username and password values
  // (only reject empty fields, but may be further restricted)
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  // Have input fields been entered and exited by user (blur event)?
  const [usernameInputEntered, setUsernameInputEntered] = useState(false);
  const [passwordInputEntered, setPasswordInputEntered] = useState(false);
  // Dynamic className depending on both input validity
  // and input field being entered and left (blur event)
  const usernameInputClassName =
    usernameIsValid || !usernameInputEntered ? '' : 'input-invalid';
  const passwordInputClassName =
    passwordIsValid || !passwordInputEntered ? '' : 'input-invalid';
  // Form validity (false by default, true if both inputs are valid)
  let formIsValid = false;
  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }
  // Event handler functions
  const inputChangeHandler = (event) => {
    if (event.target.value.trim() === '') return;
    if (event.target.type === 'text') {
      setUsernameIsValid(true);
      setUsername(event.target.value);
    }
    if (event.target.type === 'password') {
      setPasswordIsValid(true);
      setPassword(event.target.value);
    }
  };
  const inputBlurHandler = (event) => {
    if (event.target.value.trim() === '') {
      if (event.target.type === 'text') {
        setUsernameIsValid(false);
        setUsernameInputEntered(true);
      }
      if (event.target.type === 'password') {
        setPasswordIsValid(false);
        setPasswordInputEntered(true);
      }
      event.target.placeholder = 'Field cannot be empty!';
    }
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      // submit form
      console.log('Username: ', username);
      console.log('Password: ', password);
    } else return;
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={styles['input-wrapper']}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className={styles[usernameInputClassName]}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className={styles[passwordInputClassName]}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        />
      </div>
      <div className={styles['input-remember']}>
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {!loggedIn && (
        <button
          className={styles['sign-in-button']}
          disabled={!formIsValid}
          // onClick={() => dispatch(login())}
        >
          Sign In
        </button>
      )}
    </form>
  );
}
