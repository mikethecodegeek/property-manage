import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {getAllTenants} from '../../store/tenants'
import {getAllProperties} from '../../store/properties'
import * as sessionActions from "../../store/session";
import TenantsForm from './TenantsForm'
import { useTable,useSortBy, useGlobalFilter } from 'react-table'
import '../Table/Table.css'
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
        Header: 'App Date',
        accessor: d=>{
          d = new Date(d.createdAt)
          return d.toDateString()
        }
      },
      
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({ columns, data },useGlobalFilter,useSortBy)

  const {globalFilter} = state
  return (
    <>
    <div>
      <div className='flex-between'>

        <h1>Applicants and Tenants</h1>
        <input type='text' onChange={(e) =>setGlobalFilter(e.target.value)}></input>
        <button className='form-button' onClick={showApplicantForm}>New Applicant</button>
      </div>
      {newApplicant &&
      
      <div>
          <TenantsForm cancelTenant={()=>setNewApplicant(false)}/>
        </div>
      }
      {!newApplicant &&
      <div>
      {/* {sessionTenants.tenants && !newApplicant &&
      <select onChange={(e)=>findCurrentTenant(e.target.value)}>
        
        <option value='0'>Please select a tenant</option>
        {sessionTenants.tenants.map(prop => <option value={prop.id}>{prop.firstName} {prop.lastName}</option>)}
      </select>
     }    */}
    {/* {tenant && */}
     <div>
        {/* <h2>Tenant Details</h2>
      <p>First Name: {tenant.firstName}</p>
      <p>Last Name: {tenant.lastName}</p>
      <p>Phone: {tenant.phoneNumber}</p>
      <p>Status: {tenant.active !== true ? 'Waitlist' : 'Active'}</p>
      {tenant.active == true && 
      <>
      <p>Unit #: {tenant.unitNumber}</p>
      <p>{getPropertyName(tenant.propertyId)}</p>
      </>
      } */}

<table className='table' {...getTableProps()} style={{ border: 'none',height:'350px',overflowY:'scroll', display:'inline-block'}}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                //  style={{
                //    borderBottom: 'solid 3px red',
                //    background: 'aliceblue',
                //    color: 'black',
                //    fontWeight: 'bold',
                //  }}
               >
                 {column.render('Header')}
                 <span>{column.isSorted ? (column.isSortedDesc ? '%' : '^') : ''}</span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()} onClick={() => findCurrentTenant(row.original.id)}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                    //  style={{
                    //    padding: '10px',
                    //    border: 'solid 1px gray',
                    //    background: 'papayawhip',
                    //  }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>



     
     </div>
  
    </div>
}
    </div>
    </>
  );
}

export default TenantsPage;