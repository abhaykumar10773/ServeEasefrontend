import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const NotificationCard = ({ notification, onClick }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card onClick={onClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Box 
          component="img" 
          src={notification.userImage} 
          alt="User" 
          sx={{
            borderRadius: '50%', 
            width: 40, 
            height: 40, 
            marginRight: 2 
          }} 
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{notification.title}</Typography>
          <Typography variant="body2" color="textSecondary">{notification.message}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: '100px', textAlign: 'right' }}>
          {notification.time}
        </Typography>
      </Card>
    </motion.div>
  );
};

export default NotificationCard;
