import { NavLink } from 'react-router-dom';
import logo from '../../img/argentBankLogo.png';
import styles from './Navigation.module.css';

export default function Navigation(props) {
  return (
    <nav className={styles['main-nav']}>
      <NavLink to="/" className={styles['main-nav-logo']}>
        <img
          className={styles['main-nav-logo-image']}
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!props.loggedIn && (
          <NavLink to="sign-in" className={styles['main-nav-item']}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
        {props.loggedIn && (
          <NavLink to="/" className={styles['main-nav-item']}>
            <i class="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        )}
      </div>
    </nav>
  );
}
