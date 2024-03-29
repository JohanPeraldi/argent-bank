import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../api/api';
import Account from '../../components/Account/Account';
import EditUsernameForm from '../../components/EditUsernameForm/EditUsernameForm';
import { accounts } from '../../data/accounts';
import { open, close } from '../../features/editMode/editModeSlice';
import { fetchUser, login, logout } from '../../features/login/loginSlice';
import styles from './Profile.module.css';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const editing = useSelector((state) => state.editMode.editing);
  const dispatch = useDispatch();
  // Update page title
  useEffect(() => {
    document.title = 'Argent Bank - Profile';
  }, []);
  // Get firstName
  useEffect(() => {
    async function fetchData() {
      try {
        const { firstName, lastName } = await getUserData();
        setFirstName(firstName);
        setLastName(lastName);
        setUsername(`${firstName} ${lastName}`);
        if (firstName && lastName) {
          dispatch(login());
          dispatch(fetchUser());
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dispatch, firstName, lastName, username]);
  function handleClickOnEditNameButton() {
    dispatch(open());
  }
  function handleUsernameChange(newFirstName) {
    setFirstName(newFirstName);
  }

  return (
    <main className="main bg-dark">
      {loggedIn && (
        <>
          <div className={styles.header}>
            {firstName && <h1>Welcome back {firstName}!</h1>}
            <button
              type="button"
              className={styles['edit-button']}
              onClick={handleClickOnEditNameButton}
            >
              Edit Name
            </button>
            {editing && (
              <EditUsernameForm
                firstName={firstName}
                lastName={lastName}
                onCloseEditMode={() => dispatch(close())}
                onUsernameChange={handleUsernameChange}
              />
            )}
          </div>
          <h2 className="sr-only">Accounts</h2>
          {accounts.map((account) => (
            <Account
              key={account.key}
              title={account.title}
              balance={account.balance}
              description={account.description}
            />
          ))}
        </>
      )}
      {!loggedIn && (
        <div className={styles.header}>
          <h1>You are not logged in!</h1>
        </div>
      )}
    </main>
  );
}
