import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ChevronLeft
} from "@mui/icons-material"
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBteween from './FlexBetween';
import profileImage from "assets/profile-pic.jpg"

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]); //anytime the pathname changes it will set the active value to the current page and our url changes so that we can set the active to the correct url always and use it to dteermine which page we are currently on.


  return (
    <Box component="nav">
        {isSidebarOpen && (
          <Drawer 
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor='left'
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSixing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth
              },
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBteween color={theme.palette.secondary.main}>
                  <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight="bold">
                      DASHCOM
                    </Typography>
                  </Box>
                  {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <ChevronLeft />
                    </IconButton>
                  )}
                </FlexBteween>
              </Box>
              <List>
                {navItems.map(({ text, icon}) => {
                  if(!icon){
                    return(
                      <Typography key={text} sx={{ m:"2.25rem 0 1rem 3rem"}}>
                        {text}
                      </Typography>
                    );
                  }

                  const lcText= text.toLowerCase();

                  return(
                    <ListItem key={text} disablePadding >
                      <ListItemButton onClick={() =>  
                        { navigate(`/${lcText}`); // update the browser url according to the choice we make in the sidebar
                        setActive(lcText); //setting the active hoo to lcText to hightlight the choice we make in sidebar
                        }}
                        sx={{
                          backgroundColor: active === lcText ? 
                          theme.palette.secondary[300] :
                          "transparent",
                          color: active === lcText 
                          ? theme.palette.primary[600] 
                          : theme.palette.secondary[100],
                        }}
                        >
                          <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color: active === lcText 
                            ? theme.palette.primary[600] 
                            : theme.palette.secondary[200],
                          }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {active === lcText && (
                            <ChevronRightOutlined sx={{ ml: "auto"}} />
                          )}
                      </ListItemButton>
                    </ListItem>
                  );

                })}
              </List>
            </Box>
            <Box position="absolute" bottom="2rem">
                <Divider />
                <FlexBteween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                  <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{
                    objectFit: "cover" //it crops the image as necessary to fit in
                  }}
                  />
                    <Box textAlign="left">
                      <Typography fontWeight="bold" fontSize="0.9rem" sx={{
                        color: theme.palette.secondary[100]
                      }}>
                        {user.name}
                      </Typography>
                      <Typography  fontSize="0.8rem" sx={{
                        color: theme.palette.secondary[100]
                      }}>
                        {user.occupation}
                      </Typography>
                    </Box>
                    <SettingsOutlined 
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px"
                    }}
                    />
                  
                </FlexBteween>
            </Box>

          </Drawer>
        )}
    </Box>
      
  );
}

export default Sidebar
