import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllProperties} from '../../store/properties'
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import './SignupForm.css';

function PropertiesPage() {
//   const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);


//   if (!sessionUser) return <Redirect to="/" />;
const dispatch = useDispatch();
const sessionUser = useSelector((state) => state.session.user);
const sessionProperties = useSelector((state) => state.userProperties.properties);
const [propData, setPropData] = useState([])
const [numUnits,setNumUnits] = useState(0)
const [currentProp,setCurrentProp] = useState({})
const [propertyUnits,setPropertyUnits] = useState()
const [vacantUnits, setVacantUnits] = useState([])

useEffect(()=>{
  const getProperties = async(id)=>{
    let properties = await dispatch(getAllProperties(id))
    // let propresp = await properties.json()
    setPropData(properties.data)
    console.log(properties.data)
  } 
  if(sessionUser) {
    getProperties(sessionUser.id)
  }
},[])

useEffect(()=>{
  if (propData.properties) {
    let totUnits = 0
    propData.properties.forEach(prop => totUnits+=prop.numUnits)
    console.log(totUnits)
    setNumUnits(totUnits)
    console.log(numUnits)
  }
},[propData])

const findCurrentProp = (id) => {
  console.log('anything')
  let current =sessionProperties.properties.find(prop => prop.id==id)
  setCurrentProp(current)
  setPropertyUnits(current.Units)
  setVacantUnits(current.Units.filter(unit=> unit.isVacant))
  console.log(current.Units)
}

  return (
    <>
      <h1>Properties</h1>
    {sessionProperties.properties &&
    
      <select onChange={(e)=>findCurrentProp(e.target.value)}>
        <option>Please select a property</option>
        {sessionProperties.properties.map(prop => <option value={prop.id}>{prop.propertyName}</option>)}
      </select>
    }

      {currentProp && propertyUnits &&
    <div className='property-page-details'>
      <h2>Property Details</h2>
      <img src={currentProp.photo}></img>
      <div>
        <p>{currentProp.propertyName}</p>
        <p>{currentProp.propertyType}</p>
      </div>
      <div>
        <p>{currentProp.address}</p>
        <p>{currentProp.city} {currentProp.state} {currentProp.zipCode}</p>
      </div>
      <div>
        <h3>Total Units: {currentProp.numUnits} </h3>
        <h3>Rented Units: {currentProp.numUnits - vacantUnits.length} </h3>
        <h3>Vacant Units: {vacantUnits.length} </h3>
        {/* <h3>Units Rented: {currentProp.Units.filter(unit => unit.isVacant)} </h3> */}
      </div>
    </div>
      }

    </>
  );
}

export default PropertiesPage;