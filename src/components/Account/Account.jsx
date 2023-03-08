import styles from './Account.module.css';

export default function Account(props) {
  return (
    <section className={styles.account}>
      <div className={styles['account-content-wrapper']}>
        <h3 className={styles['account-title']}>{props.title}</h3>
        <p className={styles['account-amount']}>{props.balance}</p>
        <p className={styles['account-amount-description']}>
          {props.description}
        </p>
      </div>
      <div className={`${styles['account-content-wrapper']} cta`}>
        <button className={styles['transaction-button']}>
          View transactions
        </button>
      </div>
    </section>
  );
}
