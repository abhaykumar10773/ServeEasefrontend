// src/redux/bookingActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Searchprovider } from '../../Api/bookingApi';

export const searchProvider = createAsyncThunk(
  'booking/searchProvider',
  async ({ selectedService, serviceLocation }, { rejectWithValue }) => {
    try {
      const response = await Searchprovider(selectedService, serviceLocation);

      if (!response || !response.data) {
        throw new Error('No response from API');
      }

      console.log('API Response:', response.data); // Debugging

      return response.data.data; // ✅ Fix: Return correct data

    } catch (error) {
      console.error('Error occurred:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch service providers');
    }
  }
);

  