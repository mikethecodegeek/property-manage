import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllTenants} from '../../store/tenants'
import {getAllProperties} from '../../store/properties'
import {getAllLeases} from '../../store/leases'
import '../Table/Table.css'
import TableComponent from "../Table/Table";
import LeaseForm from './LeaseFormPage'

function LeasesPage() {
  const dispatch = useDispatch();
 
  const sessionUser = useSelector((state) => state.session.user);
  const sessionTenants = useSelector(state => state.tenants.tenants)
  const sessionProps = useSelector(state => state.userProperties.properties)

  const [lease, setCurrentLease] = useState()
  const [newLease,setNewLease] = useState(false)
  const [data,setData]= useState([])
  const [showLease, setShowLease] = useState(false)

//   if (!sessionUser) return <Redirect to="/" />;

  useEffect(()=>{
    const getLeases = async(id)=>{
      const leases = await dispatch(getAllLeases(id))
    
      console.log(leases.data)  
      setData(leases.data.leases)
    //   await dispatch(getAllProperties(id))
    } 
    if (sessionUser) {
      getLeases(sessionUser.id)
    }
    
  },[])

//   const findCurrentTenant = tennant => {
//     if (tennant !== '0') {
//       let current =sessionTenants.tenants.find(prop => prop.id==tennant)
//       setCurrentTenant(current)
//       console.log(current)
//       setShowTenant(true)
    
//     } else {
//       setCurrentTenant(null)
//     }
//   }

  const showNewLeaseForm = () => {
    setNewLease(!newLease)
    // console.log(newApplicant)
  }

//   const getPropertyName = (id) => {
//       // const prop = sessionProps.find({id:id})
//       const prop = sessionProps.properties.find(prop => prop.id == id)
//       return prop.propertyName
//   }

  const showAllLeases = () => {
    setNewLease(null)
    // setShowLease(false)
  }

  const columns = [
      {
        Header: 'Tenant',
        accessor: 'Tenant.lastName', // accessor is the "key" in the data
        Cell:props =>{
            return `${props.row.original.Tenant.firstName} ${props.row.original.Tenant.lastName}`
        }
      },
      {
        Header: 'Property',
        accessor: 'Property.propertyName',
      },
      {
        Header: 'Unit#',
        accessor: 'unitNumber',
      },
      {
        Header: 'Amount',
        accessor: 'Unit.rentalPrice'
      },
      {
        Header: 'Deposit',
        accessor: 'depositAmnt'
      },
      {
        Header: 'Start Date',
        accessor: 'startDate'
      },
      {
        Header: 'End Date',
        accessor: 'endDate'
      },
     
      
    ]


  return (
    <>
    <div>
      <div className='flex-between'>

        <h1>Leases</h1>
        {!newLease || !showLease &&
            <button className='form-button' onClick={showAllLeases}>All Leases</button>
          }
        <button className='form-button' onClick={showNewLeaseForm}>New Lease</button>
      </div>
      {newLease &&
      
      <div>
          <LeaseForm cancelLease={()=>setNewLease(false)}/>
        </div>
      }
      {!newLease &&
      <div>
    
     <div>
       {showLease &&
      <div>
        {/* <h2>Lease Details</h2>
        <p>First Name: {tenant.firstName}</p>
        <p>Last Name: {tenant.lastName}</p>
        <p>Phone: {tenant.phoneNumber}</p>
        <p>Status: {tenant.active !== true ? 'Waitlist' : 'Active'}</p> */}
      
      
      </div>
      }
      {!newLease && !showLease &&
      
      <TableComponent data={data} columns={columns} onClickCallback={(e)=> console.log(e)} />
      }
     
     </div>
  
    </div>
}
    </div>
    </>
  );
}

export default LeasesPage;