import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllTenants} from '../../store/tenants'
import {getAllProperties} from '../../store/properties'
import {format} from 'date-fns'
import {getAllLeases, deleteLease} from '../../store/leases'
import '../Table/Table.css'
import TableComponent from "../Table/Table";
import LeaseForm from './LeaseFormPage'
import { useAlert } from "react-alert";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

function LeasesPage() {
  const dispatch = useDispatch();
 
  const sessionUser = useSelector((state) => state.session.user);
  const sessionTenants = useSelector(state => state.tenants.tenants)
  const sessionProps = useSelector(state => state.userProperties.properties)
  const leases = useSelector(state => state.leases.leases)

  const [lease, setCurrentLease] = useState()
  const [newLease,setNewLease] = useState(false)
  const [data,setData]= useState([])
  const [showLease, setShowLease] = useState(false)
  const [loading, setLoading] = useState(false)

  const alert = useAlert();

//   if (!sessionUser) return <Redirect to="/" />;

  useEffect(()=>{
    const getLeases = async(id)=>{
      const leases = await dispatch(getAllLeases(id))
    
     
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
//      
//       setShowTenant(true)
    
//     } else {
//       setCurrentTenant(null)
//     }
//   }

  const showNewLeaseForm = () => {
    setNewLease(!newLease)
    
  }

  useEffect(()=>{
    if(leases.leases) {
     
      setData(leases.leases)
    }
  },[leases])

//   const getPropertyName = (id) => {
//       // const prop = sessionProps.find({id:id})
//       const prop = sessionProps.properties.find(prop => prop.id == id)
//       return prop.propertyName
//   }

  const showAllLeases = () => {
    setNewLease(null)
    // setShowLease(false)
  }

  const removeLease = async (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {

      try {
        setLoading(true)
        await dispatch(deleteLease(id))
        alert.show('Saved!')
      } catch {
        alert.error('Error')
      } finally {
        setLoading(false)
      }
    }

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
        accessor: 'startDate',
        Cell: ({value}) => {return format(new Date(value),'MM/dd/yyyy')}
      },
      {
        Header: 'End Lease',
        Cell: props => {
          return <button style={{backgroundColor:'#f5776c', color:'white',padding:'5px',border:'none',cursor:'pointer', width:'85%'}}  onClick={(e) => {
            e.stopPropagation()
            console.log(props.row.original.id)
            removeLease(props.row.original.id)
          
          }}>Remove</button>
          
        } 
        
      },
    
      // {
      //   Header: 'Start Date',
      //   Cell:  _getTdProps = (state, rowInfo, column, instance) => ({
      //     onClick: (e, handleOriginal) => {
      //       console.log(e)
      //    },
      // }),
    // }
      
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
      <div className="loader">
        <BeatLoader color={"#0183BD"} loading={loading} size={35} />
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