import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { css } from "@emotion/core";
import { useAlert } from "react-alert";
import {createTenant} from '../../store/tenants';
import BeatLoader from "react-spinners/BeatLoader";
// import './SignupForm.css';

function TenantsForm({cancelTenant}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;
  const alert = useAlert();

  const handleSubmit = (e) => {
        e.preventDefault();
        const asyncFunc = async() => {
          setLoading(true)
          try {
           await dispatch(createTenant({firstName,lastName,phoneNumber}, sessionUser.id))
           setFirstName('')
           setLastName('')
           setPhoneNumber('')
           alert.show('Saved!') 
          } catch {
          alert.error('Failed')
        } finally {
          setLoading(false)
        }
      }
        asyncFunc()
    }


  return (
    <>
      <h3>Tenant Application</h3>
      <div className="loader">
        <BeatLoader color={"#0183BD"} loading={loading} size={35} />
      </div>
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