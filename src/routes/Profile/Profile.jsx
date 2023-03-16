import { getUserData } from '../../api/api';
import Account from '../../components/Account/Account';
import styles from './Profile.module.css';

export default function User() {
  const checkingAccountTitle = 'Argent Bank Checking (x8349)';
  const checkingAccountBalance = '$2,082.79';
  const checkingAccountDescription = 'Available Balance';
  const savingsAccountTitle = 'Argent Bank Savings (x6712)';
  const savingsAccountBalance = '$10,928.42';
  const savingsAccountDescription = 'Available Balance';
  const creditCardTitle = 'Argent Bank Credit Card (x8349)';
  const creditCardBalance = '$184.30';
  const creditCardDescription = 'Current Balance';
  const data = [
    [
      checkingAccountTitle,
      checkingAccountBalance,
      checkingAccountDescription,
      1,
    ],
    [savingsAccountTitle, savingsAccountBalance, savingsAccountDescription, 2],
    [creditCardTitle, creditCardBalance, creditCardDescription, 3],
  ];

  const testUser1 = {
    email: 'tony@stark.com',
    password: 'password123',
  };
  const testUser2 = {
    email: 'steve@rogers.com',
    password: 'password456',
  };
  const testUser3 = {
    email: 'toto@squillaci.it',
    password: 'supersecurepass',
  };
  getUserData(testUser1);
  getUserData(testUser2);
  getUserData(testUser3);

  return (
    <main className="main bg-dark">
      <div className={styles.header}>
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className={styles['edit-button']}>Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {data.map((account) => (
        <Account
          title={account[0]}
          balance={account[1]}
          description={account[2]}
          key={account[3]}
        />
      ))}
    </main>
  );
}
