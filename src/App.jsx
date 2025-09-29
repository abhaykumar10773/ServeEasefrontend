import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './Layout/Layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from './features/auth/authAction.js' // path as per your structure
import { setCredentials } from './features/auth/authSlice.js'; // path as per your structure
import axiosInstance from './Api/axiosConfig.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await axiosInstance.get('users/refreshAccessToken', {
          credentials: 'include', // Sends cookies with request
        });

        const data = await res.json();

        if (data.accessToken) {
          dispatch(setCredentials({ token: data.accessToken, user: data.user }));
        } else {
          dispatch(logoutUser());
        }
      } catch (err) {
        dispatch(logoutUser());
      }
    };

    tryRefresh();
  }, [dispatch]);

  return <Layout />;
}

export default App;
