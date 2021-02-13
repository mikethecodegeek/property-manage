import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {getAllTenants} from '../../store/tenants'
import {getAllProperties} from '../../store/properties'
import * as sessionActions from "../../store/session";
import TenantsForm from './TenantsForm'
import { useTable,useSortBy, useGlobalFilter } from 'react-table'
import '../Table/Table.css'
import Table from '../Table/Table'
import TableComponent from "../Table/Table";
// import './SignupForm.css';

function TenantsPage() {
  const dispatch = useDispatch();
 
  const sessionUser = useSelector((state) => state.session.user);
  const sessionTenants = useSelector(state => state.tenants.tenants)
  const sessionProps = useSelector(state => state.userProperties.properties)
  
  const [tenants, setTenants] = useState()
  const [tenant, setCurrentTenant] = useState()
  const [newApplicant,setNewApplicant] = useState(false)
  const [data,setData]= useState([])
  const [showTenant, setShowTenant] = useState(false)

//   if (!sessionUser) return <Redirect to="/" />;
  
  // useMemo(() => {
  //   const getTenants = async(id)=>{
  //     let tenants = await dispatch(getAllTenants(id))
    
  //     console.log(tenants.data.tenants)
  //     setTenants(tenants.data)
  //     await dispatch(getAllProperties(id))
  //   } 
  //   if (sessionUser) {
  //     getTenants(sessionUser.id)
  //   }
  // },[])

  useEffect(()=>{
    const getTenants = async(id)=>{
      let tenants = await dispatch(getAllTenants(id))
    
      console.log(tenants.data.tenants)
      setTenants(tenants.data)
      setData(tenants.data.tenants)
      await dispatch(getAllProperties(id))
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
      setShowTenant(true)
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

  const getPropertyName = (id) => {
      // const prop = sessionProps.find({id:id})
      const prop = sessionProps.properties.find(prop => prop.id == id)
      return prop.propertyName
  }

  const columns = React.useMemo(
    () => [
      {
        
        Header: 'First Name',
        accessor: 'firstName', // accessor is the "key" in the data
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Phone #',
        accessor: 'phoneNumber',
      },
      {
        id:'active',
        Header: 'Status',
        accessor: d=> d.active != true ? 'Waiting' : 'Active'
      },
      {
        id:'createdAt',
        Header: 'Application Date',
        accessor: d=>{
          d = new Date(d.createdAt)
          return d.toDateString()
        }
      },
      
    ],
    []
  )


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
    
     <div>
       {showTenant &&
      <div>
        <h2>Tenant Details</h2>
        <p>First Name: {tenant.firstName}</p>
        <p>Last Name: {tenant.lastName}</p>
        <p>Phone: {tenant.phoneNumber}</p>
        <p>Status: {tenant.active !== true ? 'Waitlist' : 'Active'}</p>
        {tenant.active == true && 
        <>
        <p>Unit #: {tenant.unitNumber}</p>
        <p>{getPropertyName(tenant.propertyId)}</p>
        </>
      }
      </div>
      }
      <TableComponent data={data} columns={columns} onClickCallback={(e)=> findCurrentTenant(e)} />
     
     </div>
  
    </div>
}
    </div>
    </>
  );
}

export default TenantsPage;