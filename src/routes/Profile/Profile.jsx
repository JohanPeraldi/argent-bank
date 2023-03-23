import { useEffect, useState } from 'react';
import { getUserData } from '../../api/api';
import Account from '../../components/Account/Account';
import { accounts } from '../../data/accounts';
import styles from './Profile.module.css';

export default function Profile() {
  const [username, setUsername] = useState(null);
  // Update page title
  useEffect(() => {
    document.title = 'Argent Bank - Profile';
  }, []);
  // Get username
  useEffect(() => {
    async function fetchData() {
      try {
        const { firstName, lastName } = await getUserData();
        setUsername(`${firstName} ${lastName}`);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="main bg-dark">
      {username && (
        <>
          <div className={styles.header}>
            <h1>
              Welcome back
              <br />
              {username}!
            </h1>
            <button className={styles['edit-button']}>Edit Name</button>
          </div>
          <h2 className="sr-only">Accounts</h2>
          {accounts.map((account) => (
            <Account
              key={account[0]}
              title={account[1]}
              balance={account[2]}
              description={account[3]}
            />
          ))}
        </>
      )}
      {!username && (
        <div className={styles.header}>
          <h1>You are not logged in!</h1>
        </div>
      )}
    </main>
  );
}
