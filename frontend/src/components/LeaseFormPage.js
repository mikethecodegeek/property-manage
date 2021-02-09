import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import {createTenant} from '../../store/tenants'
import {getAllProperties} from '../store/properties'
import {getAllTenants} from '../store/tenants'
import {createLease} from '../store/leases'
// import './SignupForm.css';

function LeaseForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const [unitNumber, setUnitNumber] = useState("");
  const [unitId, setUnitId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [depositAmnt, setDepositAmnt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [propData, setPropData] = useState([])
  const [errors, setErrors] = useState([]);
  const [currentProp,setCurrentProp] = useState({})
  const [currentUnit,setCurrentUnit] = useState({})
  const [lastName,setLastName] = useState({})
  const [propertyUnits,setPropertyUnits] = useState([])
  const [tenants, setTenants] = useState()
  const [tenant, setCurrentTenant] = useState()

//   if (sessionUser) return <Redirect to="/" />;
  const sessionTenants = useSelector(state => state.tenants.tenants)


//   if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(sessionActions.signup({ email, username, password }))
        dispatch(createLease({propertyId,unitId,tenantId,startDate,endDate,depositAmnt,unitNumber}, sessionUser.id))
        
        console.log('Form Submitted')
    }

    const findCurrentProp = (id) => {
        if (id !== '0') {
          let current =sessionProperties.properties.find(prop => prop.id==id)
          setCurrentProp(current)
          setPropertyUnits(current.Units)
          setPropertyId(id)
        //   setVacantUnits(current.Units.filter(unit=> unit.isVacant))
          console.log(current.Units)
        } else {
          setCurrentProp(null)
          setCurrentUnit([])
        }
       }
    useEffect(()=>{
        const getTenants = async(id)=>{
          let tenants = await dispatch(getAllTenants(id))
          console.log(tenants.data)
          // let tenantsresp = await tenants.json()
          setTenants(tenants.data)
          // console.log(properties.data)
        } 
        if (sessionUser) {
          getTenants(sessionUser.id)
        }
    },[])   

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

    const handleUnit = (unitId,unitNum) => {
        setUnitId(unitId);
        console.log(unitId)
        console.log(unitNum)
        console.log('somestuff')
        setUnitNumber(parseInt(unitNum))
    }  


  return (
    <>
      <h1>Create A Lease</h1>
      <form className='basic-form' onSubmit={handleSubmit}>
          {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        }
        <label>
          Property
          {sessionProperties &&
          <select onChange={(e)=>findCurrentProp(e.target.value)}>
            <option value='0'>Please select a property</option>
                {sessionProperties.properties.map(prop => <option value={prop.id}>{prop.propertyName}</option>)}
            </select>
        }
        </label>
        <label>
          Unit
          {propertyUnits &&
          <select onChange={(e)=>handleUnit(e.target.value,e.target[e.target.selectedIndex].text)}>
            <option value='0'>Select a Unit</option>
                {propertyUnits.map(prop => <option value={prop.id}>{prop.unitNumber}</option>)}
            </select>
            }
        </label>
        <label>
          Tenant
          {sessionTenants.tenants &&
        <select onChange={(e)=>setTenantId(e.target.value)}>
            <option value='0'>Please select a tenant</option>
            {sessionTenants.tenants.map(prop => <option value={prop.id}>{prop.firstName} {prop.lastName}</option>)}
        </select>
     }   
        </label>
        <label>
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
          Deposit
          <input
            type="number"
            value={depositAmnt}
            onChange={(e) => setDepositAmnt(e.target.value)}
            required
          />
        </label>
      
        <button className='form-button submit-button' type="submit">Create Lease</button>
      </form>
    </>
  );
}

export default LeaseForm;