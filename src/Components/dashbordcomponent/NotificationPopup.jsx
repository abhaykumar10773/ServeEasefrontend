import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const NotificationPopup = ({ notification, onClose }) => {
  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {notification.title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{notification.message}</Typography>
        <TextField 
          fullWidth 
          label="Reply" 
          variant="outlined" 
          sx={{ mt: 2 }} 
        />
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }} 
          onClick={() => {/* Logic to send message */}} 
        >
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default NotificationPopup;
