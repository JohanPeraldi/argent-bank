import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDetails } from '../../api/api';
import { close } from '../../features/editMode/editModeSlice';
import { fetchUser } from '../../features/login/loginSlice';
import styles from './EditUsernameForm.module.css';

export default function EditUsernameForm(props) {
  const { firstName, lastName } = props;
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const dispatch = useDispatch();
  function closeEditMode() {
    dispatch(close());
  }
  function inputChangeHandler(event) {
    if (event.target.id === 'firstName') {
      setEditedFirstName(event.target.value);
    } else if (event.target.id === 'lastName') {
      setEditedLastName(event.target.value);
    }
  }
  function inputFocusHandler(event) {
    // On focus, empty field
    if (event.target.id === 'firstName') {
      setEditedFirstName('');
      event.target.placeholder = firstName;
    } else if (event.target.id === 'lastName') {
      setEditedLastName('');
      event.target.placeholder = lastName;
    }
  }
  function inputBlurHandler(event) {
    if (event.target.id === 'firstName') {
      // On blur, if field is empty, restore initial value
      if (editedFirstName === '') {
        setEditedFirstName(firstName);
      }
      event.target.placeholder = firstName;
    } else if (event.target.id === 'lastName') {
      // On blur, if field is empty, restore initial value
      if (editedLastName === '') {
        setEditedLastName(lastName);
      }
      event.target.placeholder = lastName;
    }
  }
  async function formSubmissionHandler(event) {
    event.preventDefault();
    // Create variables to store new names
    let newFirstName, newLastName;
    // Update names if modified
    editedFirstName !== firstName
      ? (newFirstName = editedFirstName)
      : (newFirstName = firstName);
    editedLastName !== lastName
      ? (newLastName = editedLastName)
      : (newLastName = lastName);
    let data = {
      firstName: newFirstName,
      lastName: newLastName,
    };
    updateDetails(data);
    // Update names in Redux store and close edit mode
    dispatch(fetchUser());
    dispatch(close());
    const token = localStorage.getItem('token');
    if (token) {
      props.onUsernameChange(newFirstName);
    }
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={styles['input-wrapper']}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          onFocus={inputFocusHandler}
          value={editedFirstName}
          required
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          onFocus={inputFocusHandler}
          value={editedLastName}
          required
        />
      </div>
      <div className={styles['button-wrapper']}>
        <button type="submit" className={styles['button-save']}>
          Save
        </button>
        <button
          type="button"
          className={styles['button-cancel']}
          onClick={closeEditMode}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
