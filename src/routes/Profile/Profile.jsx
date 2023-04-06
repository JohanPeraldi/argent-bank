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
  // Get username
  useEffect(() => {
    async function fetchData() {
      try {
        const { firstName, lastName } = await getUserData();
        setFirstName(firstName);
        setLastName(lastName);
        setUsername(`${firstName} ${lastName}`);
        if (firstName && lastName) {
          window.localStorage.setItem('username', username);
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
  }, [dispatch, username]);
  function handleClickOnEditNameButton() {
    dispatch(open());
  }
  function handleUsernameChange(newUsername) {
    setUsername(newUsername);
    window.localStorage.setItem('username', newUsername);
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
              key={account[0]}
              title={account[1]}
              balance={account[2]}
              description={account[3]}
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
