// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access_token: null,
};

export const authSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    unsetUserToken: (state) => {
      state.access_token = null;
    },
  },
});

export const { setUserToken, unsetUserToken } = authSlice.actions;

export default authSlice.reducer;