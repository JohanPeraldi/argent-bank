import styles from './Footer.module.css';

export default function Footer() {
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles['footer-text']}>
        Copyright {currentYear} Argent Bank
      </p>
    </footer>
  );
}
