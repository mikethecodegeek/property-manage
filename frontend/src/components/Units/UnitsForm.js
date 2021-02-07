import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {createUnit} from '../../store/units'
// import './SignupForm.css';

function UnitsForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [propertyId, setPropertyId] = useState("");
  const [sqft, setSqft] = useState("");
  const [isVacant, setIsVacant] = useState(true);
  const [rentalPrice, setRentalPrice] = useState("");
  const [numOccupants, setNumOccupants] = useState("");
  const [numBeds, setNumBeds] = useState("");
  const [numBaths, setNumBaths] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [unitType, setUnitType] = useState("");

  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(sessionActions.signup({ email, username, password }))
        return dispatch(createUnit({propertyId,sqft,isVacant,rentalPrice,numOccupants,numBaths,numBeds,unitNumber,unitType},sessionUser.id))
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
          Property
          <input
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            required
          />
        </label>
        <label>
          Square Feet
          <input
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            required
          />
        </label>
        <label>
          Rental Price
          <input
            type="number"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Max Occupants
          <input
            type="number"
            value={numOccupants}
            onChange={(e) => setNumOccupants(e.target.value)}
            required
          />
        </label>
        <label>
          Number of Beds
          <input
            type="number"
            value={numBeds}
            onChange={(e) => setNumBeds(e.target.value)}
            required
          />
        </label>
        <label>
          Number of Baths
          <input
            type="number"
            value={numBaths}
            onChange={(e) => setNumBaths(e.target.value)}
            required
          />
        </label>
        <label>
          Unit Number
          <input
            type="number"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Unit Type
          <input
            type="text"
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Unit</button>
      </form>
    </>
  );
}

export default UnitsForm;