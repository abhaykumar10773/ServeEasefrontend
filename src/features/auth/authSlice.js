// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser ,logoutUser,getUserDetails } from '../auth/authAction';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    token: null, // Add token to the initial state
  },
  reducers: {
     setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // true ya false set karega
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; // Store full user details
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new login attempt
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      });
  },
});


export const { setCredentials,setLoading } = authSlice.actions;
export default authSlice.reducer;
