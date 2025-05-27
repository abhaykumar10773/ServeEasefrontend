import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookingReducer from '../features/booking/bookingSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Sirf auth persist hoga
  transforms: [
    {
      in: (state) => {
        if (state.auth) {
          return { auth: { token: state.auth.token } }; // Sirf token store karega
        }
        return state;
      },
      out: (state) => {
        if (state.auth) {
          return { auth: { token: state.auth.token } }; // Sirf token restore karega
        }
        return state;
      },
    },
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;
