import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import './SignupForm.css';

function TenantsPage() {
//   const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


//   if (!sessionUser) return <Redirect to="/" />;


  return (
    <>
      <h1>Tenants</h1>
    </>
  );
}

export default TenantsPage;