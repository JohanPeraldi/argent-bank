import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './SignIn.module.css';

export default function SignIn() {
  return (
    <main className="main bg-dark">
      <section className={styles['sign-in-content']}>
        <i className={`fa fa-user-circle ${styles['sign-in-icon']}`}></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  );
}
