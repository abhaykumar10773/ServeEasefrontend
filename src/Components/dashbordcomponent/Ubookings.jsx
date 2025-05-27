import  { useEffect, useState } from "react";
import { Card, CardContent,Stack, Typography, Button, Grid, Box } from "@mui/material";
import { Container } from "react-bootstrap";
import { socket } from "../../Api/socket.io";
import { useSelector } from 'react-redux';
import { getAllUserBookingApi } from "../../Api/bookingApi";
import DashboardMap from "../mapcomponent/providermap";
import LiveTracking from "../mapcomponent/usermap";
//import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function BookingCard({ booking }) {
    const {  service, shift, provider, status, date, paymentStatus,price  } = booking || {};

    return (
        <Card sx={{ width: "100%", mb: 3, p: 2 }}>
            <CardContent>
                {/* Service Details */}
                <Typography variant="h6" color="textPrimary" gutterBottom>
                    {service?.category}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Date & Time: {date} 
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Shift: {shift}
                </Typography>

                {/* Provider Details */}
                <Typography variant="body1" color="textSecondary">
                    Provider: {provider?.FullName || "Not Assigned"}
                </Typography>

                {/* Payment Details */}
                <Typography variant="body1" color="textSecondary">
                    Charges: ₹{ price || "N/A"}
                </Typography>
                <Typography 
                    variant="body2" 
                    color={paymentStatus === "Paid" ? "success.main" : "error.main"}
                >
                    Payment: {paymentStatus || ""}
                </Typography>

                {/* Booking Status and Actions */}
                <Box sx={{ mt: 2 }}>
    <Stack spacing={2} direction="column">
        {status === "Confirm" && (
            <Button variant="contained" color="success">
                Accepted by Provider
            </Button>
        )}

        {status === "Pending" && (
            <Button variant="outlined" color="warning">
                Waiting for Confirmation
            </Button>
        )}

        {status === "Completed" && (
            <Stack spacing={3}  direction="column">
                <Button variant="contained" color="info">
                    View Invoice
                </Button>
                <Button variant="contained" color="secondary">
                    Rate & Review
                </Button>
            </Stack>
        )}

        {status === "Pending" && (
            <Button variant="outlined" color="error">
                Cancel Booking
            </Button>
        )}
    </Stack>
</Box>
               
            </CardContent>
        </Card>
    );
}



function Ubookings() {
    const [bookings, setBookings] = useState([]);
    const [isLive, setIsLive] = useState(false);
    const {user} = useSelector(state => state.auth)
    const userId = user._id;
    const role = user.role;
    // Fetch bookings from API
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getAllUserBookingApi();
                setBookings(response.data.data || []);
                console.log("Fetched bookings:", response.data.data);
                socket.on("connection", () => {
             console.log("Connected to Socket.io server:", socket.id);
      });
            } catch (error) {
                console.log("Error fetching bookings:", error.response?.data || error.message);
                setBookings([]);
            }
        };

        fetchBookings();

        // Socket.io event listeners
        socket.on("bookingUpdate", (newBookingData) => {
            console.log("Received bookingUpdate:", newBookingData);
        
            const updatedBooking = newBookingData.bookingData; // Yeh actual booking object hai
        
            setBookings((prev) => {
                const isExisting = prev.some((b) => b._id === updatedBooking._id);
                return isExisting
                    ? prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
                    : [...prev, updatedBooking];
            });
        });


        // socket.on("bookingAccepted", (updatedBooking) => {
        //     console.log("Booking accepted:", updatedBooking);
        
        //     // Ensure valid data
        //     if (!updatedBooking || !updatedBooking._id) {
        //         console.log("Error: Invalid updatedBooking received!", updatedBooking);
        //         return;
        //     }
        
        //     // Update Bookings State
        //     setBookings((prev) => {
        //         return prev.map((booking) =>
        //             booking._id === updatedBooking._id ? { ...booking, status: "Confirm" } : booking
        //         );
        //     });
        
        //     // Debugging
        //     console.log("Updated Bookings List:", bookings);
        // });
        
        

        socket.on("bookingCompleted", (updatedBooking) => {
            console.log("Booking marked as completed:", updatedBooking);
            const updatedBookings = updatedBooking.bookingData; 
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === updatedBookings._id ? { ...booking, status: "Completed" } : booking
                )
            );
        });

        socket.on("userLocation", () => {
            console.log("Provider started live service");
            setIsLive(true); // Show map when provider starts
          });
      
         
        return () => {
            socket.off("bookingUpdate");
            socket.off("bookingAccepted");
            socket.off("bookingCompleted");
           socket.off("userLocation");
        };
    }, []);

    // Categorize bookings
    const ongoingBookings = bookings.filter((b) => b.status === "Pending");
    const confirmedBookings = bookings.filter((b) => b.status === "Confirm");
    const previousBookings = bookings.filter((b) => b.status === "Completed");

    return (
        <Container>
            <Typography variant="h2" align="center" sx={{ fontWeight: "bold", mt: 3, mb: 4 }}>
                Booking Management Dashboard
            </Typography>

            {/* Ongoing Bookings */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Ongoing Bookings
                </Typography>
                <Grid container spacing={2}>
                    {ongoingBookings.map((booking) => (
                        <Grid item xs={12} sm={6} md={4} key={booking._id}>
                            <BookingCard booking={booking} />
                        </Grid>
                    ))}
                    {ongoingBookings.length === 0 && (
                         <Card sx={{ width: '100%', mt: 2 }}>
                                 <CardContent>
                                   <Typography variant="body1" color="textSecondary">
                                     There are no Ongoing bookings at the moment.
                                   </Typography>
                                 </CardContent>
                               </Card>
                    )}
                </Grid>
            </Box>

            {/* Confirmed Bookings */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Confirmed Bookings
                </Typography>
                <Grid container spacing={2}>
                    {confirmedBookings.map((booking) => (
                        <Grid item xs={12} sm={6} md={4} key={booking._id}>
                            <BookingCard booking={booking} />
                            {isLive && ( // Show map only when provider is live
                                     <Box sx={{ mb: 5 }}>
                                        <Typography variant="h5" gutterBottom>
                                           Live Provider Tracking
                                        </Typography>
                                        <LiveTracking id={userId} role={role} />
                                        <DashboardMap />
                                     </Box>
                            )}
                        </Grid>
                        
                    ))}
                    {confirmedBookings.length === 0 && (
                          <Card sx={{ width: '100%', mt: 2 }}>
                                  <CardContent>
                                    <Typography variant="body1" color="textSecondary">
                                      There are no Confirmed bookings at the moment.
                                    </Typography>
                                  </CardContent>
                                </Card>
                    )}
                </Grid>
            </Box>

            {/* Previous Bookings */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    Previous Bookings
                </Typography>
                <Grid container spacing={2}>
                    {previousBookings.map((booking) => (
                        <Grid item xs={12} sm={6} md={4} key={booking._id}>
                            <BookingCard booking={booking} />
                        </Grid>
                    ))}
                    {previousBookings.length === 0 && (
                        <Typography variant="body1" color="textSecondary">
                            No previous bookings found.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Container>
    );
}

export default Ubookings;
