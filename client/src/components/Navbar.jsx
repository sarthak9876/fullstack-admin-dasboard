import React, {useState} from 'react'
import { LightModeOutlined,
  DarkModeOutlined, 
  Menu as MenuIcon, 
  Search, 
  SettingsOutlined, 
  ArrowDropDownOutlined 
} from '@mui/icons-material';
import FlexBteween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileImage from "assets/profile-pic.jpg";
import { AppBar, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';


const Navbar = ({user,isSidebarOpen,setIsSidebarOpen}) => {
  const dispatch = useDispatch();
  const theme= useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl)
   const handleClick = (event) => setAnchorEl(event.currenTarget);
   const handleClose = () => setAnchorEl(null);

  return <AppBar
  sx={{
    position: "static",
    background: "none",
    boxShadow: "none",
  }}
  > {/* This will help us setup our nav navigation bar */}
  <Toolbar sx={{ justifyContent: "space-between"}}>
    {/* LEFT SIDE OF NAVBAR */}
    <FlexBteween>
      <IconButton onClick={()=>  setIsSidebarOpen(!isSidebarOpen)}>
        <MenuIcon />
      </IconButton>
      <FlexBteween
      backgroundColor = {theme.palette.background.alt}
      borderRadius = "9px"
      gap ="3rem"
      p="0.1rem 1.5rem" 
      >
        <InputBase placeholder='Search...' />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBteween>
    </FlexBteween>

    {/* RIGHT SIDE OF NAVBAR */}
    <FlexBteween gap="1.5rem">
      <IconButton onClick={()=> dispatch(setMode())}>
        {theme.palette.mode === 'dark' ? (
          <DarkModeOutlined sx={{ fontSize: "25px"}} />
        ) : (
          <LightModeOutlined sx={{ fontSize: "25px"}} />
        )}
      </IconButton>
      <IconButton>
        <SettingsOutlined sx={{ fontSize: "25px"}} />
      </IconButton> 

      <FlexBteween>
        <Button onClick={handleClick} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textTransform: "none",
          gap: "1rem"
        }}>
          <Box 
            component="img"
            alt="profile pic"
            src={profileImage}
            height="32px"
            width= "32px"
            borderRadius= "50%"
            sx={{ objectFit: "cover"}}
          />

          <Box textAlign="left">
          <Typography fontWeight="bold" fontSize="0.85rem" sx={{
             color: theme.palette.secondary[100]
           }}>
             {user.name}
          </Typography>
           <Typography  fontSize="0.75rem" sx={{
            color: theme.palette.secondary[100]
           }}>
             {user.occupation}
          </Typography>
          </Box>
          <ArrowDropDownOutlined 
          sx={{
            color: theme.palette.secondary[300],
            fontSize: "25px"
          }}
          />
         
         <SettingsOutlined 
          sx={{
            color: theme.palette.secondary[300],
            fontSize: "25px"
        }}
        />
                  
        </Button>

        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center"}}>
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
        </Menu>
      </FlexBteween>

    </FlexBteween>
  </Toolbar>
  </AppBar>
}

export default Navbar