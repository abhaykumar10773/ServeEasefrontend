import { useState } from 'react';
import { Grid, Container } from '@mui/material';
import NotificationCard from './NotificationCard';
import NotificationPopup from './NotificationPopup';

const Unotification = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notifications = [
    { 
      title: 'Booking Confirmed', 
      message: 'Your service is confirmed for tomorrow at 10 AM.', 
      time: '2 hours ago', // Added time
      userImage: 'https://via.placeholder.com/40' // Placeholder image URL
    },
    { 
      title: 'Special Offer', 
      message: 'Get 20% off on your next service booking!', 
      time: '1 day ago',
      userImage: 'https://via.placeholder.com/40' 
    },
    { 
      title: 'Upcoming Service', 
      message: 'Your cleaning service is scheduled for this date because i have some problem can you satisfied wiith my mork ', 
      time: '3 days ago',
      userImage: 'https://via.placeholder.com/40' 
    },
  ];

  const handleCardClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleClosePopup = () => {
    setSelectedNotification(null);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notifications.map((notification, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <NotificationCard 
              notification={notification} 
              onClick={() => handleCardClick(notification)} 
            />
          </Grid>
        ))}
      </Grid>

      {selectedNotification && (
        <NotificationPopup 
          notification={selectedNotification} 
          onClose={handleClosePopup} 
        />
      )}
    </Container>
  );
};

export default Unotification;
