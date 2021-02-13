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

function PurchasesPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const vendors = useSelector((state) => state.vendors);
 
  const [propertyUnits,setPropertyUnits] = useState([])
  const [billDueBy,setBillDueBy] = useState(new Date())
  const [datePurchased,setPurchaseDate] = useState(new Date())
  const [errors, setErrors] = useState([])
  const [purchaseType,setPurchaseType] = useState('Property')
  const [amount,setAmount] = useState(0)
  const [description,setDescription] = useState('')
  const [propertyId, setPropertyId] = useState(0)
  const [unitId, setUnitId] = useState(0)
  const [vendorId, setVendorId] = useState(0)
  let [loading, setLoading] = useState(false);
 


//   if (!sessionUser) return <Redirect to="/" />;


useEffect(()=>{
  const getData = async(id)=>{
    await dispatch(getAllProperties(id))
    await dispatch(getAllVendors(id))
  } 

  if(sessionUser) {
    getData(sessionUser.id)
  }
},[])


const findCurrentProp = (id) => {
 if (id !== '0') {
   let current =sessionProperties.properties.find(prop => prop.id==id)
   setPropertyUnits(current.Units)
   setPropertyId(id)
 }

}
const alert = useAlert();

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('anything')
  // return dispatch(sessionActions.signup({ email, username, password }))
  const asyncHandle = async () => {
    setLoading(!loading)
    try {
      await dispatch(createPurchase({  
        propertyId,
        unitId,
        vendorId,
        amount,
        description,
        billDueBy,
        datePurchased,
        purchaseType},
        sessionUser.id))
      // setPropertyId(null)
      // setUnitId(null)
      // setVendorId(null)
      // setAmount(null)
      // setDescription('')
      // setBillDueBy(null)
      // setPurchaseType(null)
      // setLoading(!loading)
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
        <h1>Purchases</h1>
        
        {/* <div style={{display:'flex',justifyContent:'space-between'}}> */}
        
      
      <div className="loader">
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
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <label>
            Purchase Type
            <select onChange={(e)=>{setPurchaseType(e.target.value)}}>
                <option value='Property'>Property</option>
                <option value='Unit'>Unit</option>
            </select>
        </label>
        <label>
          Vendor
          {vendors.length > 0 &&
            <select onChange={(e) => setVendorId(e.target.value)}>
            <option value='0' >Please select a vendor</option>
            {vendors.map(vendor => <option value={vendor.id}>{vendor.vendorName}</option>)}
          </select>
          }
        </label>
        <label>
          Property
          {sessionProperties && sessionProperties.properties && (
            <select onChange={(e) => findCurrentProp(e.target.value)}>
              <option value="0">Please select a property</option>
              {sessionProperties.properties.map((prop) => (
                <option value={prop.id}>{prop.propertyName}</option>
              ))}
            </select>
          )}
        </label>
        {purchaseType == 'Unit' &&
        
        <label>
          Unit
              {propertyUnits && (
            <select onChange={(e) => setUnitId(e.target.value)}>
              {propertyUnits.length > 0 && (
                <option value="0">Select a Unit</option>
                )}
              {propertyUnits.map((prop) => (
                <option value={prop.id}>{prop.unitNumber}</option>
              ))}
            </select>
          )}
          
        </label>
         }
         </div>
       
        <h3>Purchase Details</h3>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <label>
          Purchase Date
          {/* <DatePicker className='pickme'
             onChange={(e) => setDueDate(e)}
             value={dueDate}
            /> */}
          <input
            type="date"
            value={datePurchased}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
        </label>
        <label>
          Bill Due
          {/* <DatePicker className='pickme'
             onChange={(e) => setDueDate(e)}
             value={dueDate}
            /> */}
          <input
            type="date"
            value={billDueBy}
            onChange={(e) => setBillDueBy(e.target.value)}
            required
          />
        </label>

        <label>
          Purchase Amount
         
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        </div>
        <label>
          Description
          <textarea  
            value={description}
            style={{width:'100%',height:'70px',marginBottom:'10px'}}
            onChange={(e) => setDescription(e.target.value)}
            required>  
          </textarea>
        </label>
       

        <button className="form-button submit-button" type="submit">
          Create Invoice
        </button>
      </form>
   
   
    </>
  );
}

export default PurchasesPage;