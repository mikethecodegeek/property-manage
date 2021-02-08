import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {createTenant} from '../../store/tenants'
// import './SignupForm.css';

function TenantsForm({cancelTenant}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(sessionActions.signup({ email, username, password }))
        return dispatch(createTenant({firstName,lastName,phoneNumber}, sessionUser.id))
        console.log('Form Submitted')
    }


  return (
    <>
      <h3>Tenant Application</h3>
      <form className='basic-form' onSubmit={handleSubmit}>
          {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
            }
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <div className='flex-buttons'>
            <button className='form-button submit-button' type="submit">Add Applicant</button>
            <button className='form-button submit-button cancel' onClick={cancelTenant}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default TenantsForm;