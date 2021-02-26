import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllVendors, createVendor, deleteVendor} from '../../store/vendors'
import TableComponent from '../Table/Table'
import '../Table/Table.css'
import { useAlert } from 'react-alert'
import BeatLoader from "react-spinners/BeatLoader";
import VendorForm from './VendorForm'


function VendorsPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const vendors = useSelector((state) => state.vendors);
 
  const [vendorName,setVendorName] = useState('')
  const [phone,setPhone] = useState('')
  const [vendorDescription,setVendorDescription] = useState('')
  const [vendorType,setVendorType] = useState(1)
  const [vendorContactName,setVendorContactName] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [address,setAddress] = useState('')
  const [zipCode,setZipcode] = useState('')
  const [email,setEmail] = useState('')
  const [data,setData]= useState([])
  const [newVendor, setNewVendor] = useState(false)
 
  let [loading, setLoading] = useState(false);
 


//   if (!sessionUser) return <Redirect to="/" />;


useEffect(()=>{
  const getData = async(id)=>{
    await dispatch(getAllVendors(id))
  } 

  if(sessionUser) {
    getData(sessionUser.id)
  }
},[])

useEffect(()=>{
  if (vendors) {
    setData(vendors)
  }
},[vendors])


const alert = useAlert();

const handleSubmit = (e) => {
  e.preventDefault();

  const asyncHandle = async () => {
    setLoading(!loading)
    try {
      await dispatch(createVendor({  
        vendorName,
        phone,
        vendorDescription,
        vendorType,
        vendorContactName,
        city,
        state,
        address,
        email,
        zipCode},
        sessionUser.id))
      alert.show('Saved!')
    } catch {
      alert.error('Failed') 
    } finally {
      
      setLoading(false)
    }
  }
  asyncHandle()
}

const deleteVendorButton = async(id) => {

  if (window.confirm('Are you sure you wish to delete this item?')) {

    try {
      setLoading(true)
      await dispatch(deleteVendor(id))
      alert.show('Saved!')
    } catch {
      alert.error('Error')
    } finally {
      setLoading(false)
    }
  }

}

const columns =  [
    {
      
      Header: 'Name',
      accessor: 'vendorName', // accessor is the "key" in the data
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Description',
      accessor: 'vendorDescription',
    },
    {
      Header: 'Type',
      accessor: 'VendorType.description',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    // {
    //     Header: 'Remove',
    //     Cell: props => {
    //       if (props.row.original.active != true) {
    //         return <button style={{backgroundColor:'#f5776c', color:'white',padding:'5px',border:'none',cursor:'pointer', width:'85%'}}  onClick={(e) => {
    //           e.stopPropagation()
    //           console.log(props.row.original.id)
    //           deleteVendorButton(props.row.original.id)
            
    //         }}>Remove</button>
    //       } else {return 'N/A'} 
          
    //     } 
        
    //   },
    
  ]

  return (
    <>
      <div className='flex-between'>
        <h1>Vendors</h1>
        <button className='form-button' onClick={()=>setNewVendor(!newVendor)}>New Vendor</button>
      </div>
        
      
      {!newVendor && data.length > 0 &&
      
        <TableComponent data={data} columns={columns} onClickCallback={(e)=> console.log(e)} />
      }
      {newVendor &&
        <VendorForm />
      }
     
     
    </>
  );
}

export default VendorsPage;