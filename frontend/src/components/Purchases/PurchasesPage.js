import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllProperties} from '../../store/properties'
import {getAllVendors} from '../../store/vendors'
import {getUserUnits} from '../../store/units'
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import {format} from 'date-fns'
import './Purchases.css'
import { useAlert } from 'react-alert'
import BeatLoader from "react-spinners/BeatLoader";
import {createPurchase, getAllPurchases} from '../../store/purchases'
import TableComponent from "../Table/Table";

// import './SignupForm.css';

function PurchasesPage() {
  // if (!sessionUser) return <Redirect to="/" />;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const units = useSelector(state => state.propertyUnits.units.units)
  const vendors = useSelector((state) => state.vendors);
  const purchases = useSelector((state) => state.purchases);
 
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
  const [loading, setLoading] = useState(false);
  const [creatingPurchase,setCreatingPurchase] = useState(false)
 
  const [data,setData] = useState([])


//   if (!sessionUser) return <Redirect to="/" />;


useEffect(()=>{
  const getData = async(id)=>{
    await dispatch(getAllProperties(id))
    await dispatch(getAllVendors(id))
    await dispatch(getUserUnits(id))
    const purchases = await dispatch(getAllPurchases(id))
    // const allPurchases = purchases.data.allPurchases
    
    // console.log(allPurchases)

    // setData([...allPurchases.unitPurchases, ...allPurchases.propertyPurchases])
  } 

  if(sessionUser) {
    getData(sessionUser.id)
  }
},[])

useEffect(()=>{
  if (purchases.unitPurchases && purchases.propertyPurchases) {
    // console.log(purchases)
    setData([...purchases.unitPurchases, ...purchases.propertyPurchases])
  }
},[purchases])

  // useEffect(()=>{
  //   if (purchases.unitPurchases.length ==0) return
  //   const newPurchases = purchases.data
  //   setData([...newPurchases.unitPurchases, ...newPurchases.propertyPurchases])
  // },[purchases])

  
 

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
      
      alert.show('Saved!')
      setCreatingPurchase(false)
    } catch {
      alert.error('Failed') 
    } finally {
      
      setLoading(false)
    }
  }
  asyncHandle()
}

const columns =  [
    {
      id: 'propertyId',
      Header: 'Property',
      accessor: d => {
       if (sessionProperties.properties) {
          let props =Array.from(sessionProperties.properties)
          let prop = props.find(prop => prop.id==d.propertyId)
          // console.log(sessionProperties)
          return prop.propertyName
       }
      }
    },
    {
      Header: 'Type',
      accessor: d => d.unitId ? 'Unit' : 'Property'
    },
    {
      id: 'unitId',
      Header: 'Unit',
      accessor: d => {

        if (d.unitId == undefined) return 'N/A'
        const allUnits = Array.from(units);
        const found = allUnits.find(un => {
          return un.id == d.unitId
        })
        return found.unitNumber

      }
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      id:'vendorId',
      Header: 'Vendor',
      accessor: d=> {
        // console.log(d.vendorId)
        const vend = vendors.find(v => v.id == d.vendorId)
        // console.log(vend)
        // return
        return vend.vendorName
      }
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Due',
      accessor: 'billDueBy',
      Cell: ({value}) => {return format(new Date(value),'MM/dd/yyyy')}
    },
  
    
  ]
  if (!sessionUser) return <Redirect to="/" />;
  return (
    <>
      <div className='flex-between'>

        <h1>Purchases</h1>
        {creatingPurchase &&
        
        <button className='form-button' onClick={() =>setCreatingPurchase(!creatingPurchase)}>All Purchases</button>
        }
        <button className='form-button' onClick={() =>setCreatingPurchase(!creatingPurchase)}>New Purchase</button>
      </div>

        {vendors && vendors.length > 0 && units && !creatingPurchase &&
        <TableComponent data={data} columns={columns} onClickCallback={(e)=> console.log(e)} />
}
        {/* <div style={{display:'flex',justifyContent:'space-between'}}> */}
        
      
      <div className="loader">
        <BeatLoader color={"#0183BD"} loading={loading} size={35} />
      </div>
        {creatingPurchase &&
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
            <option value='0' >Select a vendor</option>
            {vendors.map(vendor => <option value={vendor.id}>{vendor.vendorName}</option>)}
          </select>
          }
        </label>
        <label>
          Property
          {sessionProperties && sessionProperties.properties && (
            <select onChange={(e) => findCurrentProp(e.target.value)}>
              <option value="0">Select a property</option>
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
          }
   
   
    </>
  );
}

export default PurchasesPage;