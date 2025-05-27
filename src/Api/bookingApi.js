import axiosInstance from './axiosConfig';


export const Searchprovider = async (requestData) =>{  
    try {
      const response = await axiosInstance.post("/booking/searchServiceProviders", requestData);
       localStorage.setItem("Providers", JSON.stringify(response.data));
      return response;
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
    }
};

export const createBookingApi = async (bookingData) => {
  
  return await axiosInstance.post(
    "/booking/Bookprovider",
    bookingData,
   
  );
};


export const getAllUserBookingApi = async () => {
   return await axiosInstance.get('/booking/getAllUserBookings');
   
};

export const getAllProviderBookingApi = async () => {
  return await axiosInstance.get('/booking/getAllProviderBookings');
}

export const acceptBookingApi = async (_id) => {
  return await axiosInstance.post("/booking/AcceptBooking/",{ _id });
};

export const completebookingApi = async (_id) => {
  return await axiosInstance.post("/booking/CompleteBooking/",{ _id });
};