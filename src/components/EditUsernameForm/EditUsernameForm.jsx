import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDetails } from '../../api/api';
import { close } from '../../features/editMode/editModeSlice';
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
    event.target.id === 'firstName'
      ? setEditedFirstName(event.target.value)
      : setEditedLastName(event.target.value);
    console.group('Initial name');
    console.log('firstName: ', firstName);
    console.log('lastName: ', lastName);
    console.groupEnd();
    console.group('After editing');
    console.log('Edited first name: ', editedFirstName);
    console.log('Edited last name: ', editedLastName);
    console.log('event.target.value: ', event.target.value);
    console.groupEnd();
  }
  function inputFocusHandler(event) {
    // On focus, empty field
    event.target.placeholder = '';
    event.target.value = '';
  }
  function inputBlurHandler(event) {
    if (event.target.id === 'firstName') {
      // On blur, if field is empty, restore initial value
      if (editedFirstName === '') {
        setEditedFirstName(firstName);
      }
      event.target.placeholder = editedFirstName;
    }
    if (event.target.id === 'lastName') {
      // On blur, if field is empty, restore initial value
      if (editedLastName === '') {
        setEditedLastName(lastName);
      }
      event.target.placeholder = editedLastName;
    }
  }
  async function formSubmissionHandler(event) {
    event.preventDefault();
    // Create variables to store new names
    let newFirstName = firstName;
    let newLastName = lastName;
    // Update names if modified
    if (editedFirstName !== firstName) {
      newFirstName = editedFirstName;
    }
    if (editedLastName !== lastName) {
      newLastName = editedLastName;
    }
    let data = {
      firstName: newFirstName,
      lastName: newLastName,
    };
    const updatedNames = await updateDetails(data);
    console.log('Updated names: ', updatedNames);
    dispatch(close());
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
          // placeholder={firstName}
          value={editedFirstName}
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          onFocus={inputFocusHandler}
          // placeholder={lastName}
          value={editedLastName}
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