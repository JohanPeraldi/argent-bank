import { configureStore } from '@reduxjs/toolkit';
import editModeReducer from '../features/editMode/editModeSlice';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    editMode: editModeReducer,
    login: loginReducer,
  },
});
