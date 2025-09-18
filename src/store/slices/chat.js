import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onlineUsers: JSON.parse(localStorage.getItem('onlineUsers')) || [],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
      localStorage.setItem('onlineUsers', JSON.stringify(action.payload));
    },
  },
});

export const { updateOnlineUser } = slice.actions;

export default slice.reducer;
