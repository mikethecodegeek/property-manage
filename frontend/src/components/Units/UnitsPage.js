import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllProperties} from '../../store/properties'
import {getAllUnits, getUserUnits} from '../../store/units'
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import TenantsForm from './TenantsForm'
import UnitsForm from "./UnitsForm";
import TableComponent from "../Table/Table";
// import './SignupForm.css';

function UnitsPage() {
//   const dispatch = useDispatch();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const units = useSelector((state) => state.propertyUnits.units);
  const [propData, setPropData] = useState([])
  const [numUnits,setNumUnits] = useState(0)
  const [currentProp,setCurrentProp] = useState({})
  const [currentUnit,setCurrentUnit] = useState()
  const [propertyUnits,setPropertyUnits] = useState([])
  const [vacantUnits, setVacantUnits] = useState([])
  const [newUnit, setNewUnit] = useState(false)
  const [editingUnit,setEditingUnit] = useState(false)
  const [data,setData] = useState([])

//   if (!sessionUser) return <Redirect to="/" />;
// const sessionProperties = useSelector((state) => state.userProperties.properties);
const allUnits = useSelector((state) => state.propertyUnits.units);

useEffect(()=>{
  const getProperties = async(id)=>{
    let properties = await dispatch(getAllProperties(id))
    let units = await dispatch(getUserUnits(id))
    console.log(units.data.units)
    console.log(properties.data)
    setData(units.data.units)
    // let propresp = await properties.json()
    setPropData(properties.data)
  } 
  if(sessionUser) {
    getProperties(sessionUser.id)
  }
},[])

useEffect(()=>{
  if (allUnits.units){
    console.log(allUnits.units)
    setData(allUnits.units)
  }
},[allUnits])

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
  if (id !== 0 && units.units) {
    
    let current = units.units.find(unit => unit.id==id)
    const currProp = sessionProperties.properties.find(prop => prop.id == current.propertyId)
    // setCurrentProp(current)
    // setPropertyUnits(current.Units)
    // setVacantUnits(current.Units.filter(unit=> unit.isVacant))
    setCurrentProp(currProp)
    setCurrentUnit(current)
    setEditingUnit(true)
    console.log(current)
  } else {
    setCurrentUnit(0)
  }
}

const showUnitForm = () => {
  setNewUnit(!newUnit)
}


const columns = [
    {
      id: 'propertyId',
      Header: 'Property',
      accessor: d => {
          // console.log(propData)
          let prop = sessionProperties.properties.find(prop => prop.id==d.propertyId)
          return prop.propertyName
      }
    },
    {
      Header: 'Unit #',
      accessor: 'unitNumber',
    },
    {
      Header: 'Type',
      accessor: 'unitType',
    },
    {
      Header: 'Beds',
      accessor: 'numBeds',
    },
    {
      Header: 'Baths',
      accessor: 'numBaths',
    },
    {
      Header: 'Price',
      accessor: 'rentalPrice'
    },
    {
      id: 'isVacant',
      Header: 'Status',
      accessor: d => d.isVacant != true ? 'Rented' : 'Vacant'
    },
    
  ]


  return (
    <>
      <div className='flex-between'>
        <h1>Units</h1>
        {editingUnit &&
            <button className='form-button' onClick={() =>setEditingUnit(false)}>All Units</button>
          }
        {/* <button className='form-button' onClick={showApplicantForm}>New Applicant</button> */}
       



      </div>
   
     {!newUnit &&
      <div>
      <div style={{display:'flex',justifyContent:'space-between',width:'80%'}}>
    </div>
    {currentUnit && editingUnit &&
    <div>

      <UnitsForm current={currentUnit} property={currentProp} onSave={()=>setEditingUnit(false)}  />
    </div>

    }
   
    {!editingUnit &&
    
  <TableComponent data={data} columns={columns} onClickCallback={(e)=> findCurrentUnit(e)} />
    }
    </div>
    }
    </>
  );
}

export default UnitsPage;