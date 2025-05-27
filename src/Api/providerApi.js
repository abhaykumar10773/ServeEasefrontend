import axiosInstance from './axiosConfig';

export const registerserviceApi = async(servicedata)=>{

      const response = await axiosInstance.post("/service/registerService",servicedata);

      return response;
}