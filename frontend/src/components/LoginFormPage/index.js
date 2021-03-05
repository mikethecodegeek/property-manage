import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import './LoginForm.css';
import ModalInFunctionalComponent from '../ModalComponent/ModalComponent'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false)

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  };
  
  const demoLogin = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential:'demo@user.io',password: 'password' }))
    .catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  }
  useEffect(()=>{
    
    if (localStorage.getItem('hasVisited') == null) {
      setShowModal(true)
      localStorage.setItem('hasVisited', 'true');
    }
    
    
  },[])
  if (sessionUser) return <Redirect to="/properties" />;

  return (
    <>
      <div className='flex-between'>
      <h1>Log In</h1>
      {showModal && <ModalInFunctionalComponent  />}
      <div className='account'>
        <h3>Don't have an account yet?</h3>       
        <h3><NavLink to="/signup">Sign Up</NavLink></h3> 
      </div>
      </div>
      <form className='basic-form' onSubmit={handleSubmit}>
        {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul>
          }
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button class='submit-button form-button' type="submit">Log In</button>
        <button class='submit-button form-button' onClick={demoLogin}>Demo User</button>
      </form>
     
    </>
  );
}

export default LoginFormPage;
