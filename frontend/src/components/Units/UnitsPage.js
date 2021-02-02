import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import './SignupForm.css';

function UnitsPage() {
//   const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


//   if (!sessionUser) return <Redirect to="/" />;


  return (
    <>
      <h1>Units Page</h1>
    </>
  );
}

export default UnitsPage;