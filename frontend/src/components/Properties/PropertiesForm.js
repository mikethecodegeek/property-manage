import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createProperty} from '../../store/properties'

import './Properties.css'
import { useAlert } from 'react-alert'
import BeatLoader from "react-spinners/BeatLoader";

function PropertiesForm({saved}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [monthlyPayment, setPayment] = useState(0);
  const [propertyName, setPropName] = useState("");
  const [propertyType, setPropType] = useState("");
  const [numUnits, setNumUnits] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

 

  const alert = useAlert();
  const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(sessionActions.signup({ email, username, password }))
        const asyncHandle = async () => {
          setLoading(!loading)
          try {
            await dispatch(createProperty({city,state,zipCode,address,monthlyPayment,propertyName,propertyType,numUnits},sessionUser.id))
            // setCity('')
            // setState('')
            // setZip('')
            // setAddress('')
            // setPayment(0)
            // setPropName('')
            // setPropType('')
            // setNumUnits('')
            saved()
           
            alert.show('Saved!')
          } catch {
            alert.error('Failed') 
          } finally {
            
            setLoading(false)
          }
        }
        asyncHandle()
    }


  return (
    <div style={{position:'relative',top:'-30px'}}>
      <h3 >Add Property</h3>
      <div className='loader'>
        <BeatLoader color={'#0183BD'} loading={loading} size={35} />
      </div>
    
      <form className='basic-form properties-form' style={{width:'300px'}} onSubmit={handleSubmit}>
          {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        }
        <div className='flex-between'>
        <div>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label> <br/>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label><br />
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label><br/>
        <label>
          Zip Code
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </label><br/>
        </div>
        <div>
        <label>
          Mortage Payment
          <input
            type="text"
            value={monthlyPayment}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
        </label> <br/>
        <label>
          Property Name
          <input
            type="text"
            value={propertyName}
            onChange={(e) => setPropName(e.target.value)}
            required
          />
        </label><br/>
        <label>
          Property Type
          <input
            type="text"
            value={propertyType}
            onChange={(e) => setPropType(e.target.value)}
            required
          />
        </label><br/>
        <label>
          Number of Units
          <input
            type="number"
            value={numUnits}
            onChange={(e) => setNumUnits(e.target.value)}
            required
          />
        </label>
        </div>
        </div>
        <button className='form-button submit-button' type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default PropertiesForm;