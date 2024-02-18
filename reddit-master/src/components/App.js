import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Navbar from "./NavBar/NavBar";
import { createContext, useState } from "react";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login/Login";
import FlightSingle from "./Home/FlightSingle/FlightSingle";
import CheckOutPageF from "./Home/CheckOutPageF/CheckOutPageF";
import HotelSearchPage from "./Hotel/HotelSearchPage/HotelSearchPage";
import HotelSinglePage from "./Hotel/HotelSingle/HotelSinglePage";
import HotelSingleProduct from "./Hotel/HotelSingleProduct/HotelSingleProduct";
import HotelRoom from "./Hotel/HotelSingleProduct/hotelRoom/HotelRoom";


export const LoginButtonContext = createContext();  //login
export const ButtonContext = createContext();  //singup
export const AuthContext = createContext();   //is logged in or not logged in
export const paymentModalState = createContext();
export const ApiDetails = createContext();

function App() {
  const [loginButton, setLoginButton] = useState();   //undefined
  const [buttonState, setButtonState] = useState();   //undefined
  const [ApiInfo, setApiInfo] = useState([])


  //Payment Modal State

  const [pmodal, setPmodal] = useState(false)

  //ends payment modal state


  //Main crunch of the authentication program
  let isUserLoggedIn;
  const token = sessionStorage.getItem("userToken");
  if (token) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;
  }

  const [isLoggedin, setIsLoggedIn] = useState(isUserLoggedIn)





  return (

    <ButtonContext.Provider value={{ buttonState, setButtonState }}>
      <LoginButtonContext.Provider value={{ loginButton, setLoginButton }}>
        <AuthContext.Provider value={{ isLoggedin, setIsLoggedIn }}>
          <paymentModalState.Provider value={{ pmodal, setPmodal }}>
            <ApiDetails.Provider value={{ ApiInfo, setApiInfo }}>

              <Routes>
                <Route element={<Navbar />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/hotel" element={<HotelSearchPage />} />
                  {/* <Route path="/bus" element={<Home />} />
                  <Route path="/train" element={<Home />} /> */}
                </Route>

                {/* creating sub routes with id purpose kind of navigating with singleid*/}
                <Route path="flightSingle/:flightId" element={<FlightSingle />} />
                <Route path="hotelallpages/:hotelId" element={<HotelSingleProduct />} />
                <Route path="checkoutpagef" element={<CheckOutPageF />} />


                {/* creating individual pages */}
                <Route path="hoteldone" element={<HotelRoom />} />
              </Routes>
              <SignUp />
              <Login />
            </ApiDetails.Provider>
          </paymentModalState.Provider >
        </AuthContext.Provider>
      </LoginButtonContext.Provider>
    </ButtonContext.Provider>



  )
}

export default App;
