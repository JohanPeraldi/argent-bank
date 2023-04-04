import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rememberMe: false,
};

export const rememberMeSlice = createSlice({
  name: 'rememberMe',
  initialState,
  reducers: {
    toggle: (state) => {
      state.rememberMe = !state.rememberMe;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = rememberMeSlice.actions;

export default rememberMeSlice.reducer;
