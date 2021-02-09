import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {createUnit} from '../../store/units'
import {getAllProperties} from '../../store/properties'
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
  
//   const [propList, setPropList] = useState([])
  const [errors, setErrors] = useState([]);

  const sessionProperties = useSelector((state) => state.userProperties.properties);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(sessionActions.signup({ email, username, password }))
        return dispatch(createUnit({propertyId,sqft,isVacant,rentalPrice,numOccupants,numBaths,numBeds,unitNumber,unitType},sessionUser.id))
        console.log('Form Submitted')
    }

  useEffect(()=>{
    //   const getTheProperties = async () => {
         dispatch(getAllProperties(sessionUser.id))
    //       setPropList(properties)
    //   }
    //   getTheProperties()
  },[])  

    // let currentProps = 
  return (
    <>
      <h3>Add Unit Property</h3>
      <form className='basic-form' style={{width:'300px'}} onSubmit={handleSubmit}>
        {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        }
        <div className='flex-between'>
        <div>
        <label>
          Property
          {sessionProperties &&
             <select onChange={(e)=>setPropertyId(e.target.value)}>
             <option value='0'>Please select a property</option>
               {sessionProperties.properties.map(prop => <option value={prop.id}>{prop.propertyName}</option>)}
             </select>
          }
          {/* <input
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            required
          /> */}
        </label> <br/>
        <label>
          Square Feet
          <input
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            required
          />
        </label> <br/>
        <label>
          Rental Price
          <input
            type="number"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            required
          />
        </label><br/>
        <label>
          Max Occupants
          <input
            type="number"
            value={numOccupants}
            onChange={(e) => setNumOccupants(e.target.value)}
            required
          />
        </label> <br/>
        </div>
        <div>
        <label>
          Number of Beds
          <input
            type="number"
            value={numBeds}
            onChange={(e) => setNumBeds(e.target.value)}
            required
          />
        </label> <br/>
        <label>
          Number of Baths
          <input
            type="number"
            value={numBaths}
            onChange={(e) => setNumBaths(e.target.value)}
            required
          />
        </label><br/>
        <label>
          Unit Number
          <input
            type="number"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            required
          />
        </label><br/>
        <label>
          Unit Type
          <input
            type="text"
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
            required
          />
        </label><br/>
        </div>
        </div>
        <button className='form-button submit-button'  type="submit">Add Unit</button>
      </form>
    </>
  );
}

export default UnitsForm;