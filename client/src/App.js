import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography"
import Overview from "scenes/overview"
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";

function App() {

  const mode = useSelector((state) => state.global.mode); // this is used to grab the state in the index.js file of state folder 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // creating a theme for our dashboard by calling the themeSetting function which we created in the theme.js file and passing mode props to it
  
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* //it rests everything in terms of css to make our app more css default */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/*This will simply navigate us to the dashboard route whenever we open the app homepage */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route  path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/performance" element={<Performance />} />
          </Route>

        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;