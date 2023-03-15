import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/login/loginSlice';
import logo from '../../img/argentBankLogo.png';
import styles from './Navigation.module.css';

export default function Navigation() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();

  return (
    <nav className={styles['main-nav']}>
      <Link to="/" className={styles['main-nav-logo']}>
        <img
          className={styles['main-nav-logo-image']}
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!loggedIn && (
          <Link to="login" className={styles['main-nav-item']}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
        {loggedIn && (
          <Link
            to="/"
            className={styles['main-nav-item']}
            onClick={() => dispatch(logout())}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}
