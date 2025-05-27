import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { SignUpOne } from './Login';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { logoutUser  } from '../features/auth/authAction.js';
import "../styles/global.css";

const pages = [
  { name: 'home', path: '/home' },
  { name: 'services', path: '/Service' },
  { name: 'about', path: '/About' },
  { name: 'contacts', path: '/Contact' },
];
const userdropdowns = [
  { name: 'My Account', path: '/user/users' },
  { name: 'My bookings', path: '/user/bookings' },
  { name: 'Logout', path: '/home' },
];

const providerdropdowns = [
  { name: 'My Account', path: '/provider/profile' },
  { name: 'My bookings', path: '/provider/bookings' },
  { name: 'Logout', path: '/home' },
];

function Header() {
  const { isLoggedIn} = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const dispatch = useDispatch((state) => state.auth); 
 // const navigate = useNavigate();
 
 const { user } = useSelector((state) => state.auth);
  const dropdowns = user?.role === 'User' ? userdropdowns : providerdropdowns;
 


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (menuItem) => {
    setAnchorElUser(null); // Close the dropdown regardless of the selection
    if (menuItem === "Logout") {
      dispatch(logoutUser());
    }
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  const handleLoginSuccess = () => {
    isLoggedIn(true);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000); // Hide alert after 3 seconds
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#6A9C89" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Home
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link}
                  to={page.path}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

           <Button 
  className="text-white" 
  variant="outlined" 
  sx={{ 
    color: "white",
    borderColor: 'white',
    ml: 2, 
    display: { xs: 'none', sm: 'block' } 
  }}
>
  <Link to="/rprovider" style={{ color: 'inherit', textDecoration: 'none' }}>
    register as service provider
  </Link>
</Button>


            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button onClick={() => setShowSignUp((prev) => !prev)} sx={{ color: 'white' }}>
                     Login / Signup
                 </Button>
              )}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {dropdowns.map((dropdown) => (
       
        <MenuItem key={dropdown.name} onClick={() => handleCloseUserMenu(dropdown.name)}>
          <Link to={dropdown.path} style={{ textDecoration: 'none', width: '100%' }}>
            <Typography textAlign="center">{dropdown.name}</Typography>
          </Link>
        </MenuItem>
    
      ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center p-4">
          Successfully logged in!
        </div>
      )}

      {/* Signup Form Popup */}
      {showSignUp && (
        
            <SignUpOne handleClose={handleCloseSignUp} onLoginSuccess={handleLoginSuccess} />
         
      )}
    </>
  );
}

export default Header;
