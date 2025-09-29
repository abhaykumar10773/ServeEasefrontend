// src/features/auth/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginUserApi , registerUserApi ,logoutUserApi,getUserDetailsApi } from '../../Api/userApi.js';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(credentials);
   
    if (response.data.data.user) {
      const userId = response.data.data.user._id; // Extract user ID
      localStorage.setItem("userId", userId); // Store user ID in localStorage



    }
  
    return response.data.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Registration failed');
  }
});
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await logoutUserApi();
   localStorage.removeItem("userId");
   localStorage.removeItem("userdetails");
   localStorage.removeItem("Providers");
  
    return response.data;
  } catch (error) {
    return rejectWithValue('Logout failed');
  }
});

export const getUserDetails = createAsyncThunk('auth/getUserDetails', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserDetailsApi();
   // localStorage.setItem("userdetails", response.data.data.user);

    console.log("getuser",response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch user details');
  }
});