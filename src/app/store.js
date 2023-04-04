import { configureStore } from '@reduxjs/toolkit';
import editModeReducer from '../features/editMode/editModeSlice';
import loginReducer from '../features/login/loginSlice';
import rememberMeReducer from '../features/rememberMe/rememberMeSlice';

export const store = configureStore({
  reducer: {
    editMode: editModeReducer,
    login: loginReducer,
    rememberMe: rememberMeReducer,
  },
});
