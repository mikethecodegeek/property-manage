import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Properties.css'
import {createPropertyFeatures} from '../../store/properties'
// import './SignupForm.css';

function PropertyFeaturesForm({propertyId}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [size, setSize] = useState("");
  const [gym, setGym] = useState(false);
  const [pool, setPool] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [clubhouse, setClubhouse] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [numParkingSpots, setNumParkingSpots] = useState(false);
  const [overheadParking, setOverheadParking] = useState(false);


  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
        e.preventDefault();
        
        return dispatch(createPropertyFeatures({size,gym,pool,wifi,clubhouse,petsAllowed,numParkingSpots,overheadParking},propertyId))
        console.log('Form Submitted')
    }


  return (
    <>
      {/* <h1>Property Feat</h1> */}
      <form className='property-features-form' onSubmit={handleSubmit}>
        {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        }
        <div className='section-one'>
          <label>
            Size (in acres)
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </label>
          <label>
            Parking Spots (per unit)
            <input
              type="number"
              value={numParkingSpots}
              onChange={(e) => setNumParkingSpots(e.target.value)}
              required
            />
          </label>

        </div>
        <div className='section-two'>
        <div>
        <label>
          Gym
          <input
            type="checkbox"
            value={gym}
            onChange={(e) => setGym(e.target.checked)}
           
          />
        </label>
        <label>
          Pool
          <input
            type="checkbox"
            value={pool}
            onChange={(e) => setPool(e.target.checked)}
           
          />
        </label>
        <label>
          WIFI
          <input
            type="checkbox"
            value={wifi}
            onChange={(e) => setWifi(e.target.checked)}
           
          />
        </label>
        </div>
        <div>
        <label>
          Clubhouse
          <input
            type="checkbox"
            value={clubhouse}
            onChange={(e) => setClubhouse(e.target.checked)}
          
          />
        </label>
        <label>
          Allow Pets
          <input
            type="checkbox"
            value={petsAllowed}
            onChange={(e) => setPetsAllowed(e.target.checked)}
           
          />
        </label>
        <label>
          Covered Parking?
          <input
            type="checkbox"
            value={overheadParking}
            onChange={(e) => setOverheadParking(e.target.checked)}
         
          />
        </label>
        </div>
       </div>
        
      
        <button type="submit" className='form-button features-button'>Add Features</button>
      </form>
    </>
  );
}

export default PropertyFeaturesForm;