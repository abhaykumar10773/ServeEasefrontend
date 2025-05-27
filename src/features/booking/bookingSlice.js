// src/redux/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../auth/authAction.js'; // Example of using auth action
import { searchProvider } from './bookingAction.js';


export const bookingSlice = createSlice({
  name: 'booking',
  initialState : {
    selectedService: null,
    selectedSubcategory:null,
    serviceLocation: {
      houseNo: '',
      area: '',
      city: '',
      description:'',
    },
    schedule: {
      date: '',
      shift: '',
    },
    serviceProviders: [],
    selectedProvider: null, 
    bookingConfirmed: false,
    bookingStatus: 'Pending',  // Default status is Pending
    loading: false, // For loading states
    // error: null, 
  },
  reducers: {
    updateSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    selectSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
    },
    selectdescription: (state, action) => {
      state.description = action.payload;
    },
    updateServiceLocation: (state, action) => {
      state.serviceLocation = action.payload;
    },
    setServiceProviders: (state, action) => {
      state.serviceProviders = action.payload; // Set all providers
    },
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload; // Set selected provider
    },
    clearSelectedProvider: (state) => {
      state.selectedProvider = null; // Clear selected provider
    },
    updateSchedule: (state, action) => {
      state.schedule = action.payload;
    },
    updateServiceProvider: (state, action) => {
      state.serviceProvider = action.payload;
    },
    confirmBooking: (state) => {
      state.bookingConfirmed = true;
      state.bookingStatus = 'Pending'; // Initially set the status to Pending when booking is confirmed
    },
    setOngoingStatus: (state) => {
      state.bookingStatus = 'Ongoing'; // Update the status to Ongoing when the service is in progress
    },
    setCompletedStatus: (state) => {
      state.bookingStatus = 'Completed'; // Update the status to Completed when the service is completed
    },

    // setUser: (state, action) => {
    //   state.user = action.payload; // Action to set logged-in user info
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.user = action.payload; // Add user data from auth state
      // })
      .addCase(searchProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProvider.fulfilled, (state, action) => {
        console.log('Providers Data:', action.payload); // Debugging
        state.serviceProviders = action.payload; // ✅ Directly store providers array
        state.loading = false;
      }
      )

      .addCase(searchProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch service providers';
      });
      
  },
});

export const {
  updateSelectedService,
  selectSubcategory,
  selectdescription,
  updateServiceLocation,
  setServiceProviders,
  setSelectedProvider,
  clearSelectedProvider,
  updateSchedule,
  updateServiceProvider,
  confirmBooking,
  setOngoingStatus,
  setCompletedStatus,
  setUser, // Action to set user info
} = bookingSlice.actions;

export default bookingSlice.reducer;
