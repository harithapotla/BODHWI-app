import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AdminComponenet from "./components/admin/admin";
import HomeComponent from "./components/home/home";
import LoginCompoenent from "./components/login/login";
import { logIn } from "./components/redux/slice";
import { Navigate } from "react-router-dom";
import './index.css';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const redux =  useSelector((store) => store.counter.loggedUsername) ;
  const [loggedUsername,setLoggedUsername] = useState(redux || localStorage.getItem("loggedUsername") != 'undefined'? localStorage.getItem("loggedUsername") : '')
  
 useEffect(()=>{
    setLoggedUsername(redux || localStorage.getItem("loggedUsername") != 'undefined'? localStorage.getItem("loggedUsername") : '')
},[redux,localStorage.getItem("loggedUsername"),window.location.pathname])

  const logOut = () => {
    localStorage.clear();
    dispatch(logIn(""));
   
  };
  console.log(window.location.pathname, "username")
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={loggedUsername ? <Navigate replace to="/home"/>: <Navigate replace to="/login"/>}></Route>
          <Route path="/login" element={<LoginCompoenent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/admin" element={<AdminComponenet />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRoutes;
