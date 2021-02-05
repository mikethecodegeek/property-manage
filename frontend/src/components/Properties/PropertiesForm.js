import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {createProperty} from '../../store/properties'
// import './SignupForm.css';

function PropertiesForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [monthlyPayment, setPayment] = useState("");
  const [propertyName, setPropName] = useState("");
  const [propertyType, setPropType] = useState("");
  const [numUnits, setNumUnits] = useState("");

  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(sessionActions.signup({ email, username, password }))
        return dispatch(createProperty({city,state,zipCode,address,monthlyPayment,propertyName,propertyType,numUnits},sessionUser.id))
        console.log('Form Submitted')
    }


  return (
    <>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Zip Code
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </label>
        <label>
          Monthly Payment
          <input
            type="text"
            value={monthlyPayment}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
        </label>
        <label>
          Property Name
          <input
            type="text"
            value={propertyName}
            onChange={(e) => setPropName(e.target.value)}
            required
          />
        </label>
        <label>
          Property Type
          <input
            type="text"
            value={propertyType}
            onChange={(e) => setPropType(e.target.value)}
            required
          />
        </label>
        <label>
          Number of Units
          <input
            type="number"
            value={numUnits}
            onChange={(e) => setNumUnits(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Property</button>
      </form>
    </>
  );
}

export default PropertiesForm;