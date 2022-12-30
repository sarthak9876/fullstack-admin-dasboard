import React,{ useState } from 'react'
import  {Box, useMediaQuery}  from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "components/Navbar"
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from 'state/api';



const Layout = () => {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  // console.log('data',data);
  return (
  <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">  {/* Material UI has a box property which we are using here and passing it a width and height as its css property. For other components we can do it like sx={{display: "flex"}} */}
    <Sidebar 
    user={data || {}}
    isNonMobile={isNonMobile}
    drawerWidth="250px"
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
    />
    <Box flexGrow={1}>
      <Navbar 
        user={data || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet /> {/* Outlet will basically represent everything which is below Navbar such as dahsboard in one example and so on */}

    </Box>
  </Box>);
}

export default Layout;