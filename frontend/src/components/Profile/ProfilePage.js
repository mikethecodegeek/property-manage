import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import {getAllProperties} from '../../store/properties'
import {getAllTenants} from '../../store/tenants'
import {getUserUnits} from '../../store/units'
import LeaseForm from '../LeaseFormPage'
// import './SignupForm.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const sessionTenants = useSelector(state => state.tenants.tenants)
  const unitData = useSelector(state => state.propertyUnits.units)
  
  // const ownerUnits = useSelector(state => state.units.units)
  const [propData, setPropData] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [numUnits,setNumUnits] = useState(0)
  const [numVacant,setNumVacant] = useState(0)
  const [rentedUnits,setRentedUnits] = useState([])
  const [activeTenants,setActiveTenants] = useState([])

  useEffect(()=>{
    const getProperties = async(id)=>{
      let properties = await dispatch(getAllProperties(id))
      // let propresp = await properties.json()
      setPropData(properties.data)
      setAllProperties(properties.data.properties)
      dispatch(getAllTenants(id))
      dispatch(getUserUnits(id))
      console.log(properties.data.properties)
     
    } 
    if(sessionUser) {
      getProperties(sessionUser.id)
    }
  },[])

  useEffect(()=>{
    if (propData.properties) {
      let totUnits = 0
      propData.properties.forEach(prop => totUnits+=prop.numUnits)
      // console.log(totUnits)
      setNumUnits(totUnits)
      // console.log(numUnits)
    }
  },[propData])

  useEffect(()=>{
    // console.log(sessionTenants.tenants)
    if (sessionTenants.tenants) {
      let active = sessionTenants.tenants.filter(tenant =>{
        // console.log(tenant)
        return tenant.active == true})
        // console.log(active.length)
        setActiveTenants(active.length)
    }
  },[sessionTenants])
  
  useEffect(()=>{
    // console.log(sessionTenants.tenants)
    if (unitData.units) {
      let vacant = unitData.units.filter(unit =>{
        return unit.isVacant == true})
      let rented = unitData.units.filter(unit =>{
        return unit.isVacant != true})
        console.log(rented)
        setRentedUnits(rented)
        setNumVacant(vacant.length)
    }
  },[unitData.units])

  const calculateIncome = arr => {
    let starting = 0;
    arr.forEach(unit => {
      starting += unit.rentalPrice
    })
    return starting
  }

  const calculateExpense = (propArray) => {
    let expense = 0;
    propArray.forEach(prop => expense += prop.monthlyPayment)
    return expense
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  // useEffect(()=>{
  //   const asyncStuff = async () =>{
       
  //   }
  // },[])

  // if (!sessionUser) return <Redirect to="/" />;


  return (
    <>
      <h1 className='profile-username'>{sessionUser.username}</h1>
        {sessionProperties.properties &&
      <div className='profile-quickview'>
        <h2>Quick View</h2>
          <p>{sessionProperties.properties.length} properties</p>
          <p>{sessionProperties.properties.reduce((acc,val) => {
            console.log(acc.numUnits,acc.propertyName)
            console.log(val.numUnits,val.propertyName)
            
           return acc.numUnits==undefined || val.numUnits==undefined? acc+ 0: parseInt(acc.numUnits)+parseInt(val.numUnits)
           
           })} units </p>


          {/* <p>{sessionProperties.properties.reduce((acc,val) => acc.numUnits+val.numUnits)} units </p>
          <p>{sessionProperties.properties.filter(prop => prop.Units.filter(unit => unit.isVacant))} vacant units </p> */}

          {/* <LeaseForm /> */}
          {sessionTenants.tenants &&
          <>
          <p>{activeTenants} Tenants</p>
          <p>{sessionTenants.tenants.length - activeTenants} Applicants</p>
          </>
        }
        {unitData.units &&
        <>
          <p>{numVacant} Vacant Units</p>
          <p>{formatter.format(calculateIncome(rentedUnits))} Income from rentals</p>
        
        </>
        }
        {allProperties.length >0 &&
          <>
          <p>{formatter.format(calculateExpense(allProperties))} Expenses this month</p>
          <p>{formatter.format(calculateIncome(rentedUnits)-calculateExpense(allProperties))} Net</p>
          </>
        }
        
      </div>
        }
    </>
  );
}

export default ProfilePage;