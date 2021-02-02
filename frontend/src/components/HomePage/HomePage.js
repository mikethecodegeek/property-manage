import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';
// import './SignupForm.css';

function HomePage() {
//   const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


  if (sessionUser) return <Redirect to="/profile" />;


  return (
    <>
      <h1>Your are not currently logged in</h1>
      <h2><NavLink to="/signup">Sign Up</NavLink></h2>  
      {/* <p>or</p> */}
      <h2><NavLink to="/login">Login</NavLink></h2>
    </>
  );
}

export default HomePage;