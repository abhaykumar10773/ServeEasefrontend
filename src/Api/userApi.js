import axiosInstance from './axiosConfig';

export const registerUserApi = async (userData) => {
  return await axiosInstance.post('/users/register', userData);
};

export const loginUserApi = async (credentials) => {
  return await axiosInstance.post('/users/login', credentials);
};

export const logoutUserApi = async () => {
  try {
    return await axiosInstance.post('/users/logout', {}, {
      withCredentials: true, // ✅ Ye ensure karega ki cookies backend me send ho
    });
  } catch (error) {
    console.error('Logout failed:', error.response?.data || error.message);
  }
 
};

export const getUserDetailsApi = async () => {
  try {
    const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage

    if (!userId) {
      console.error("No userId found in localStorage");
      return null;
    }

    return await axiosInstance.get(`/users/getuserdetails/${userId}`, { withCredentials: true }); } catch (error) {
    console.error('Failed to fetch user details:', error.response?.data || error.message);
  }
}

export const updatedetailsApi = async(editableUserInfo) =>{
  const response = await axiosInstance.put("/users/updateaccount",editableUserInfo);

  return response;
}
export const updateprofileApi = async (editableProfileImage) => {
  const response = await axiosInstance.post("/users/UpdateProfileimg",editableProfileImage);
  return response;
}