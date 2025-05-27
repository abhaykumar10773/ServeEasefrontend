// ProfilePopup.js

import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const ProfilePopup = ({ open, onClose, provider }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{provider.name}</DialogTitle>
    <DialogContent>
      <Typography variant="body1">Service: {provider.service}</Typography>
      <Typography variant="body2">Reviews and Feedback</Typography>
      {/* Display reviews here */}
    </DialogContent>
  </Dialog>
);

export default ProfilePopup;
