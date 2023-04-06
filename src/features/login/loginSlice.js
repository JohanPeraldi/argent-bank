import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserData } from '../../api/api';

const initialState = {
  loggedIn: false,
  firstName: null,
  lastName: null,
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk('login/fetchUser', async () => {
  const response = await getUserData();
  console.group('From fetchUser in loginSlice.js');
  console.log('response', response);
  console.log('response.firstName', response.firstName);
  console.groupEnd();
  return response;
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.firstName = null;
      state.lastName = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
