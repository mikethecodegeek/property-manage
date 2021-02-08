import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {getAllTenants} from '../../store/tenants'
import * as sessionActions from "../../store/session";
import TenantsForm from './TenantsForm'
// import './SignupForm.css';

function TenantsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionTenants = useSelector(state => state.tenants.tenants)
  const [tenants, setTenants] = useState()
  const [tenant, setCurrentTenant] = useState()
  const [newApplicant,setNewApplicant] = useState(false)

//   if (!sessionUser) return <Redirect to="/" />;
  
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

  const findCurrentTenant = tennant => {
    if (tennant !== '0') {
      let current =sessionTenants.tenants.find(prop => prop.id==tennant)
      setCurrentTenant(current)
      console.log(current)
      // setPropertyUnits(current.Units)
      // setVacantUnits(current.Units.filter(unit=> unit.isVacant))
      // console.log(current.Units)
    } else {
      setCurrentTenant(null)
    }
  }

  const showApplicantForm = () => {
    setNewApplicant(!newApplicant)
    console.log(newApplicant)
  }

  return (
    <>
    <div>
      <div className='flex-between'>

        <h1>Applicants and Tenants</h1>
        <button className='form-button' onClick={showApplicantForm}>New Applicant</button>
      </div>
      {newApplicant &&
      
      <div>
          <TenantsForm cancelTenant={()=>setNewApplicant(false)}/>
        </div>
      }
      {!newApplicant &&
      <div>
      {sessionTenants.tenants && !newApplicant &&
      <select onChange={(e)=>findCurrentTenant(e.target.value)}>
        
        <option value='0'>Please select a tenant</option>
        {sessionTenants.tenants.map(prop => <option value={prop.id}>{prop.firstName} {prop.lastName}</option>)}
      </select>
     }   
    {tenant &&
     <div>
      <h2>Tenant Details</h2>
      <p>First Name: {tenant.firstName}</p>
      <p>Last Name: {tenant.lastName}</p>
      <p>Phone: {tenant.phoneNumber}</p>
      <p>Status: {tenant.status}</p>
     </div>
    }
    </div>
}
    </div>
    </>
  );
}

export default TenantsPage;