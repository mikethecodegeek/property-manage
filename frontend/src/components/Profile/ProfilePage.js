import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import {getAllProperties} from '../../store/properties'
// import './SignupForm.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector((state) => state.userProperties.properties);
  const [propData, setPropData] = useState([])
  const [numUnits,setNumUnits] = useState(0)

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

  // if (!sessionUser) return <Redirect to="/" />;


  return (
    <>
      <h1 className='profile-username'>{sessionUser.username}</h1>
        {sessionProperties.properties &&
      <div className='profile-quickview'>
        <h2>Quick View</h2>
          <p>{sessionProperties.properties.length} properties</p>
          <p>{sessionProperties.properties.reduce((acc,val) => acc.numUnits+val.numUnits)} units </p>
          {/* <p>{sessionProperties.properties.map(prop => prop.Units.filter(unit => unit.isVacant))} vacant units </p> */}

      </div>
        }
    </>
  );
}

export default ProfilePage;