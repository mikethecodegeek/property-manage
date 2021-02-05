import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllProperties} from '../../store/properties'
import {getAllUnits} from '../../store/units'
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import './SignupForm.css';

function UnitsPage() {
//   const dispatch = useDispatch();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const [propData, setPropData] = useState([])
  const [numUnits,setNumUnits] = useState(0)
  const [currentProp,setCurrentProp] = useState({})
  const [currentUnit,setCurrentUnit] = useState()
  const [propertyUnits,setPropertyUnits] = useState([])
  const [vacantUnits, setVacantUnits] = useState([])

//   if (!sessionUser) return <Redirect to="/" />;

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
 if (id !== '0') {
   let current =sessionProperties.properties.find(prop => prop.id==id)
   setCurrentProp(current)
   setPropertyUnits(current.Units)
   setVacantUnits(current.Units.filter(unit=> unit.isVacant))
   console.log(current.Units)
 } else {
   setCurrentProp(null)
   setCurrentUnit([])
 }
}

const findCurrentUnit = (id) => {
  if (id !== 0) {
    let current = propertyUnits.find(unit => unit.id==id)
    // setCurrentProp(current)
    // setPropertyUnits(current.Units)
    // setVacantUnits(current.Units.filter(unit=> unit.isVacant))
    setCurrentUnit(current)
    console.log(current)
  }
}

  return (
    <>
      <h1>Units Page</h1>
      <div style={{display:'flex',justifyContent:'space-between',width:'80%'}}>
    {sessionProperties.properties &&
    <div>

      <h2>Select a Property:</h2>
      <select onChange={(e)=>findCurrentProp(e.target.value)}>
      <option value='0'>Please select a property</option>
        {sessionProperties.properties.map(prop => <option value={prop.id}>{prop.propertyName}</option>)}
      </select>
    </div>
  }
    {propertyUnits &&
    <div>
      <h2>Select a Unit</h2>
       <select onChange={(e)=>findCurrentUnit(e.target.value)}>
       <option value='0'>Please select a unit</option>
       {propertyUnits.map(unit => <option value={unit.id}>{unit.unitNumber}</option>)}
     </select>
    </div>
    }
    </div>
    {currentUnit &&
    <div>
      <h2>Unit Details</h2>
      <div className='current-unit-details' style={{display:'flex',justifyContent:'space-between',width:'80%'}}>
      <div>
        <p>Unit #: {currentUnit.unitNumber}</p>
        <p>Beds: {currentUnit.numBeds}</p>
        <p>Baths: {currentUnit.numBaths}</p>
        <p>Unit Type #: {currentUnit.unitType}</p>
      </div>
      <div>
        <p>Available: {currentUnit.isVacant == true ? 'Yes' : 'No'} </p>
        <p>Sqft: {currentUnit.sqft}</p>
        <p>Price: {currentUnit.rentalPrice}</p>
        <p>Max Occupancy: {currentUnit.numOccupants}</p>
      </div>
      </div>
    </div>
    }
    </>
  );
}

export default UnitsPage;