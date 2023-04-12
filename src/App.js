import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";


import LoginPage from './components/scenes/loginPage/LoginPage';
import HomePage from './components/scenes/homePage/HomePage';
import ProfilePage from './components/scenes/profilePage/ProfilePage';
import Message from "components/navScreen/Message/Message";
import Notification from "components/navScreen/Notification/Notification";
import HelpCenter from "components/navScreen/HelpCenter/HelpCenter";



function App ()
{

  const mode = useSelector( ( state ) => state.mode );
  const theme = useMemo( () => createTheme( themeSettings( mode ) ), [ mode ] );
  const isAuth = Boolean( useSelector( ( state ) => state.token ) );


  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          <Routes>
            <Route exact path="/login" element={ <LoginPage /> } />
            <Route exact path="/" element={ <LoginPage /> } />
            <Route exact path="/home" element={ isAuth ? <HomePage /> : <Navigate to="/" /> } />
            <Route exact path="/profile/:userId" element={ <ProfilePage /> } />
            {/* <Route exact path="/message/:userId" element={ <Message /> } />
            <Route exact path="/notification/:userId" element={ <Notification /> } />
            <Route exact path="/help-center" element={ <HelpCenter /> } /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
