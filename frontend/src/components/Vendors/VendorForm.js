import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllVendors, createVendor} from '../../store/vendors'
import TableComponent from '../Table/Table'
import '../Table/Table.css'
import { useAlert } from 'react-alert'
import BeatLoader from "react-spinners/BeatLoader";


function VendorForm() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const vendors = useSelector((state) => state.vendors);
 
  const [vendorName,setVendorName] = useState('')
  const [phone,setPhone] = useState('')
  const [vendorDescription,setVendorDescription] = useState('')
  const [vendorType,setVendorType] = useState(1)
  const [vendorContactName,setVendorContactName] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [address,setAddress] = useState('')
  const [zipCode,setZipcode] = useState('')
  const [email,setEmail] = useState('')

 
  let [loading, setLoading] = useState(false);
 


//   if (!sessionUser) return <Redirect to="/" />;




const alert = useAlert();

const handleSubmit = (e) => {
  e.preventDefault();

  const asyncHandle = async () => {
    setLoading(!loading)
    try {
      await dispatch(createVendor({  
        vendorName,
        phone,
        vendorDescription,
        vendorType,
        vendorContactName,
        city,
        state,
        address,
        email,
        zipCode},
        sessionUser.id))
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
    <>
      
      <form className="basic-form form" onSubmit={handleSubmit}>
        {/* {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )} */}
        <div className="loader">
             <BeatLoader color={"#0183BD"} loading={loading} size={35} />
        </div>
        <div className='flex-between'>
        <div>
         <label className='label-name'>
          Name
          <input
           className='field-name'
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          /> 
        </label>
          <br/>
     
        <label className='label-phone'>
          Phone
          <input
            className='field-phone'
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <br/>
        <label className='label-description'>
          Description
          <input
            type="text"
            className='field-description'
            value={vendorDescription}
            onChange={(e) => setVendorDescription(e.target.value)}
            required
          />
        </label>
        <label className='label-type'>
          Type
          <select
            // value={vendorDescription}
            className='field-type'
            onChange={(e) => setVendorType(e.target.value)}
            required
            >
              <option value='1'>Service</option>
              <option value='2'>Retail Store</option>
              </select>
            
        </label>
        <br/>
        <label>
          Contact
          <input
            type="text"
            value={vendorContactName}
            onChange={(e) => setVendorContactName(e.target.value)}
            required
          />
        </label>
        <br/>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        </div>

        <div>

        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br/>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <br/>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <br/>
        <label>
          Zip Code
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </label>
        <br/>
        </div>
      </div>
        

        <button className="form-button submit-button" type="submit">
          Add Vendor
        </button>
      </form>
   
   
    </>
  );
}

export default VendorForm;