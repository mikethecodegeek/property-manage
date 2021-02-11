import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllProperties} from '../../store/properties'
import {getAllUnits} from '../../store/units'
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import UnitsForm from "./UnitsForm";
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
  const [newUnit, setNewUnit] = useState(false)

//   if (!sessionUser) return <Redirect to="/" />;
// const sessionProperties = useSelector((state) => state.userProperties.properties);

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
   setCurrentUnit(null)
   setNewUnit(false)
  //  findCurrentUnit(0)
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
  } else {
    setCurrentUnit(0)
  }
}

const showUnitForm = () => {
  setNewUnit(!newUnit)
}

  return (
    <>
      <div className='flex' style={{display:'flex', alignItems:'center'}}>
        <h1>Units Page</h1>
        <div>
        {sessionProperties && sessionProperties.properties &&
        <select onChange={(e)=>findCurrentProp(e.target.value)}>
        <option value='0'>Please select a property</option>
          {sessionProperties.properties.map(prop => <option value={prop.id}>{prop.propertyName}</option>)}
        </select>
        }
        </div>

        {propertyUnits &&
        <div>
          {/* <h2>Select a Unit</h2> */}
          <select onChange={(e)=>findCurrentUnit(e.target.value)}>
          <option value='0' >Please select a unit</option>
          {propertyUnits.map(unit => <option value={unit.id}>{unit.unitNumber}</option>)}
        </select>
        </div>
    }
      </div>
   
     {!newUnit &&
      <div>
      <div style={{display:'flex',justifyContent:'space-between',width:'80%'}}>
    </div>
    {currentUnit &&
    <div>

      <UnitsForm current={currentUnit} property={currentProp}  />
    </div>

    }
    </div>
    }
    </>
  );
}

export default UnitsPage;