import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllProperties} from '../../store/properties'
import {getAllVendors} from '../../store/vendors'
import {getAllUnits} from '../../store/units'
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './Purchases.css'
import { useAlert } from 'react-alert'
import BeatLoader from "react-spinners/BeatLoader";
import {createPurchase} from '../../store/purchases'

// import './SignupForm.css';

function VendorsPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const vendors = useSelector((state) => state.vendors);
 
  const [vendorName,setVendorName] = useState('')
  const [phone,setPhone] = useState('')
  const [vendorDescription,setVendorDescription] = useState('')
  const [vendorType,setVendorType] = useState('')
  const [vendorContactName,setVendorContactName] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [address,setAddress] = useState('')
  const [zipCode,setZipcode] = useState('')
  const [email,setEmail] = useState('')
 
  let [loading, setLoading] = useState(false);
 


//   if (!sessionUser) return <Redirect to="/" />;


useEffect(()=>{
  const getData = async(id)=>{
    await dispatch(getAllVendors(id))
  } 

  if(sessionUser) {
    getData(sessionUser.id)
  }
},[])


// const findCurrentProp = (id) => {
//  if (id !== '0') {
//    let current =sessionProperties.properties.find(prop => prop.id==id)
//    setPropertyUnits(current.Units)
//    setPropertyId(id)
//  }

// }
const alert = useAlert();

const handleSubmit = (e) => {
  e.preventDefault();

  const asyncHandle = async () => {
    setLoading(!loading)
    try {
      await dispatch(createPurchase({  
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
        <h1>Vendors</h1>
        
        {/* <div style={{display:'flex',justifyContent:'space-between'}}> */}
        
        {/* vendorName,
        phone,
        vendorDescription,
        vendorType,
        vendorContactName,
        city,
        state,
        address,
        email,
        zipCode}, */}
      <div className="loader">
      {/* {vendors.length > 0 &&
            <select onChange={(e) => setVendorId(e.target.value)}>
            <option value='0' >Please select a vendor</option>
            {vendors.map(vendor => <option value={vendor.id}>{vendor.vendorName}</option>)}
          </select>
          } */}
        <BeatLoader color={"#0183BD"} loading={loading} size={35} />
      </div>
      <form className="basic-form" onSubmit={handleSubmit}>
        {/* {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )} */}
        
    
        
  
      
        
       
      
       

        <button className="form-button submit-button" type="submit">
          Add Vendor
        </button>
      </form>
   
   
    </>
  );
}

export default VendorsPage;