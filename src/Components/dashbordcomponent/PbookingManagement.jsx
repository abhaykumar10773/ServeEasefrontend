import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { socket } from "../../Api/socket.io"; // Import socket instance
import { getAllProviderBookingApi,acceptBookingApi,completebookingApi } from "../../Api/bookingApi"; // Import API function
import LiveTracking from "../mapcomponent/usermap";
import DashboardMap from "../mapcomponent/providermap";


const PbookingManagement = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [ongoingBookings, setOngoingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [trackingUser, setTrackingUser] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllProviderBookingApi();
        const bookings = response.data.data || [];
        console.log("Fetched provider bookings:", bookings);

        // Categorize bookings based on status
        setUpcomingBookings(bookings.filter((b) => b.status === "Pending"));
        setOngoingBookings(bookings.filter((b) => b.status === "Confirm"));
        setCompletedBookings(bookings.filter((b) => b.status === "Completed"));
      } catch (error) {
        console.log("Error fetching bookings:", error.response?.data || error.message);
      }
    };

    fetchBookings();

    // Listen for real-time updates
    socket.on("newBooking", (newBooking) => {
      console.log("New booking received:", newBooking);
      setUpcomingBookings((prev) => [...prev, newBooking]);
    });

    socket.on("bookingAccepted", (updatedBooking) => {
      setUpcomingBookings((prev) => prev.filter((b) => b._id !== updatedBooking._id));
      setOngoingBookings((prev) => [...prev, updatedBooking]);
    });

    socket.on("bookingCompleted", (updatedBooking) => {
      setOngoingBookings((prev) => prev.filter((b) => b._id !== updatedBooking._id));
      setCompletedBookings((prev) => [updatedBooking, ...prev]);
  });

    return () => {
      socket.off("newBooking");
      socket.off("bookingAccepted");
      socket.off("bookingCompleted");
    };
  }, []);

  console.log("ongoingBookings setOngoingBookings:", ongoingBookings);
  console.log("upcomingBookings upcomingBookings:", upcomingBookings);

  // Handle Accept Booking
  const handleAcceptBooking = async (booking) => {
    console.log("Booking object before API call:", booking);
  console.log("Booking ID before API call:", booking?._id);

  if (!booking || !booking._id) {
    console.error("Invalid booking data, cannot proceed.");
    return;
  }
    try {
      
      const response = await acceptBookingApi(booking._id);
      console.log("bokingid",booking._id  );
      console.log("response.data",response.data);
      if (response.data.success || response.data.message === "Booking accepted.") {
        const updatedBooking = { ...booking, status: "Confirm" };
  
        setOngoingBookings((prev) => [updatedBooking, ...prev]);
        setUpcomingBookings((prev) => prev.filter((b) => b._id !== booking._id));
  
        socket.emit("acceptBooking", { 
          customer: booking._id,  
          bookingData: updatedBooking 
      });// Notify the server
      } else {
        console.log("Failed to accept booking:", response.data.message);
      }
    } catch (error) {
      console.error("Error accepting booking:", error.response?.data || error.message);
    }
  };
  

  // Handle Complete Booking
  const handleCompleteBooking = async (booking) => {
    console.log("Completing booking for ID:", booking?._id);

    if (!booking || !booking._id) {
        console.error("Invalid booking data, cannot proceed.");
        return;
    }

    try {
        const response = await completebookingApi(booking._id);
        console.log("Response Data:", response.data);

        if (response.data.success || response.data.message === "Booking marked as completed.") {
            const updatedBooking = { ...booking, status: "Completed" };

            setOngoingBookings((prev) => prev.filter((b) => b._id !== booking._id));
            setCompletedBookings((prev) => [updatedBooking, ...prev]);

            socket.emit("completeBooking", { 
                customer: booking.customer, 
                bookingData: updatedBooking 
            });
        } else {
            console.log("Failed to complete booking:", response.data.message);
        }
    } catch (error) {
        console.error("Error completing booking:", error.response?.data || error.message);
    }
};

const handleStartLocation = (booking) => {
 

  
};

  

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h2" align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        My Booking Management
      </Typography>
      <hr />

      {/* Upcoming Bookings */}
      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>Upcoming Bookings</Typography>
      {upcomingBookings.length > 0 ? (
        <Grid container spacing={2}>
          {upcomingBookings.map((booking) => (
           <Grid item xs={12} sm={6} md={4} key={booking._id}>
           <Card>
             <CardContent>
             <Typography variant="h6">{booking?._id}</Typography>
               <Typography variant="h6">{booking.customer?.FullName}</Typography>
               <Typography variant="body1">Service: {booking.service?.category}</Typography>
               <Typography variant="body1">Location:{booking.address?.houseNo}, {booking.address?.area}, {booking.address?.city}</Typography>
               <Typography variant="body1">Price: ₹{booking.service?.price}</Typography>
               <Button
                 variant="contained"
                 color="primary"
                 sx={{ mt: 2, mr: 1 }}
                 onClick={() => handleAcceptBooking(booking)}
               >
                 Accept Booking
               </Button>
             </CardContent>
           </Card>
         </Grid>
         
          ))}
        </Grid>
      ) : (
        <Card sx={{ width: '100%', mt: 2 }}>
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              There are no upcoming bookings at the moment.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Ongoing Bookings */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Ongoing Bookings</Typography>
      {ongoingBookings.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ongoingBookings.map((booking) => (
                <TableRow key={booking._id} style={{ backgroundColor: "#e0f7e0" }}>
                  <TableCell>{booking.customer?.FullName}</TableCell>
                  <TableCell> {booking.service?.category}</TableCell>
                  <TableCell>{booking.address.street}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.shift}</TableCell>
                  <TableCell>

                           <Button 
                             variant="contained" 
                             color="secondary" 
                             //disabled={!(booking.date === currentDate && isShiftMatched)}
                              onClick={() => handleStartLocation(booking)}
                            ><LiveTracking id={booking.provider?._id} role="Provider" />
                        Start Booking
                    </Button>
                  <Button variant="contained" color="success" onClick={() => handleCompleteBooking(booking)}>
                     Mark as Completed
                  </Button>

                  </TableCell>
         
                 
                </TableRow>
              ))}
              
            </TableBody>
           
          </Table>
          <DashboardMap/>
        </TableContainer>
  
      ) : (
        <Card sx={{ width: '100%', mt: 2 }}>
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              There are no ongoing bookings at the moment.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Completed Bookings */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Completed Bookings</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedBookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking?._id}</TableCell>
                <TableCell>{booking.customer?.FullName}</TableCell>
                <TableCell>{booking.service?.category}</TableCell>
                <TableCell>{booking.payment?.status || "N/A"}</TableCell>
                {/* <TableCell>{booking?.status || "not show"}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PbookingManagement;
