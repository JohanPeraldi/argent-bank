import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <main className={`${styles.error} main`}>
      <h1>Ooops! Sorry, something went wrong 😕</h1>
      <Link to="/" className={styles.text}>
        Return to homepage
      </Link>
    </main>
  );
}
