import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editing: false,
};

export const editModeSlice = createSlice({
  name: 'editMode',
  initialState,
  reducers: {
    close: (state) => {
      state.editing = false;
    },
    open: (state) => {
      state.editing = true;
    },
  },
});

export const { close, open } = editModeSlice.actions;

export default editModeSlice.reducer;
