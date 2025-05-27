// step3.js
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createBookingApi } from "../../Api/bookingApi.js";
import {socket} from "../../Api/socket.io.js";


const ReviewAndConfirm = ({onBack}) => {
  const { serviceLocation, schedule ,selectedProvider,selectedSubcategory,selectedService  } = useSelector((state) => state.booking);
  const {user } = useSelector((state) => state.auth);

  const provider = selectedProvider.provider._id;
  const customer =user._id; 
  const service = selectedProvider._id;
  const shift = schedule.shift;
  const date = schedule.date;
  const description = serviceLocation.description;
  const houseNo = serviceLocation.houseNo;
  const area = serviceLocation.locationName;
  const city = serviceLocation.city;
  const subcategory = selectedSubcategory;
 console.log("areaaa",serviceLocation.locationName);
  const bookingData = {
    customer,
    provider,
    service,
    shift,
    date,
    description,
    houseNo,
    area,
    city,
    subcategory
  };
  const navigate = useNavigate();
  const handleConfirm = async () => {
    
    try {
      console.log("Booking successful: first ", bookingData);
      const response = await createBookingApi(bookingData);
      console.log("Booking successful:", response?.data);
       socket.emit("sendBooking", { provider, bookingData });
       alert("Booking confirmed!");
       localStorage.removeItem("Providers");
      navigate('/user/bookings');
    } catch (error) {
      console.log("Booking failed:", error.response?.data || error.message);
      alert("Booking failed. Try again.");
    }
 
      
    
  }

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
        Review Your Booking
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Service Location:
        </Typography>
        <Typography variant="body2">House No: {serviceLocation.houseNo}</Typography>
        <Typography variant="body2">Area: {serviceLocation.locationName}</Typography>
        <Typography variant="body2">City: {serviceLocation.city}</Typography>
        <Typography variant="body2">user: {user._id}</Typography>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Schedule:
        </Typography>
        <Typography variant="body2">Date: {schedule.date || "Not Set"}</Typography>
        <Typography variant="body2">Shift: {schedule.shift || "Not Set"}</Typography>
        <Typography variant="body2">Service Provider: {selectedProvider.provider.FullName}</Typography>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Service Details:
        </Typography>
        <Typography variant="body2">Category: {selectedService}</Typography>
        <Typography variant="body2">Subcategory: {selectedSubcategory}</Typography>
        <Typography variant="body2">Description: {serviceLocation.description}</Typography>
      </Box>
      
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" color="primary" onClick={onBack} sx={{ px: 2 }}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ px: 2 }}>
          Confirm Booking
        </Button>
      </Box>
    </CardContent>
  </Card>
  );
};

export default ReviewAndConfirm;
