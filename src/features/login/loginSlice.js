import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      window.localStorage.removeItem('token');
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
