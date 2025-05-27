
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomSeparator() {
  const breadcrumbs = [
    <Link underline="hover" key="1"  component={RouterLink} color="inherit" to="/Home" onClick={handleClick}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      to="/Service"
      component={RouterLink}
      onClick={handleClick}
    >
      Service
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      ServiceInformation
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
       {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}