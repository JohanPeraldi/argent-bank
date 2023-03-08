import { NavLink } from 'react-router-dom';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  return (
    <form>
      <div className={styles['input-wrapper']}>
        <label for="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div className={styles['input-wrapper']}>
        <label for="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className={styles['input-remember']}>
        <input type="checkbox" id="remember-me" />
        <label for="remember-me">Remember me</label>
      </div>
      {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
      <NavLink to="/user" className={styles['sign-in-button']}>
        Sign In
      </NavLink>
      {/* <!-- SHOULD BE THE BUTTON BELOW -->
          <!-- <button className={styles['sign-in-button']}>Sign In</button> -->
          <!--  --> */}
    </form>
  );
}
