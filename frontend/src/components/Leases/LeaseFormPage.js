import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import {createTenant} from '../../store/tenants'
import { getAllProperties } from "../../store/properties";
import { getAllTenants } from "../../store/tenants";
import { createLease } from "../../store/leases";
import { useAlert } from "react-alert";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
// import './SignupForm.css';

function LeaseForm({cancelLease}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector(
    (state) => state.userProperties.properties
  );
  const [unitNumber, setUnitNumber] = useState("");
  const [unitId, setUnitId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [depositAmnt, setDepositAmnt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [propData, setPropData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentProp, setCurrentProp] = useState({});
  const [currentUnit, setCurrentUnit] = useState({});
  const [lastName, setLastName] = useState({});
  const [propertyUnits, setPropertyUnits] = useState([]);
  const [tenants, setTenants] = useState();
  const [tenant, setCurrentTenant] = useState();
  const [vacant, setVacant] = useState();
  const [availableProps, setAvailableProps] = useState([])
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#0183BD");

  //   if (sessionUser) return <Redirect to="/" />;
  const sessionTenants = useSelector((state) => state.tenants.tenants);

  const alert = useAlert();
  //   if (!sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    const asyncFunc = async () => {
      try {
        setLoading(true);
        await dispatch(
          createLease(
            {
              propertyId,
              unitId,
              tenantId,
              startDate,
              endDate,
              depositAmnt,
              unitNumber,
            },
            sessionUser.id
          )
        );
        setPropertyId('')
        setUnitId('')
        setTenantId('')
        setStartDate('')
        setEndDate('')
        setDepositAmnt('')
        setUnitNumber('')
        alert.show("Saved!");
        cancelLease()
      } catch {
        alert.error("Save Failed");
      } finally {
        setLoading(false);
      }
     
    };
    asyncFunc();
  };

  const findCurrentProp = (id) => {
    if (id !== "0") {
      let current = sessionProperties.properties.find((prop) => prop.id == id);
      setCurrentProp(current);
      setPropertyUnits(
        Array.from(current.Units).filter((un) => un.isVacant == true)
      );
      setPropertyId(id);
      //   setVacantUnits(current.Units.filter(unit=> unit.isVacant))
     
    } else {
      setCurrentProp(null);
      setCurrentUnit([]);
    }
  };

  const getAvailableProperties = () => {
    console.log(sessionProperties)
    if (sessionProperties.properties) {
      const avail = sessionProperties.properties.map(prop => {
        console.log(prop)
        if (Array.from(prop.Units).filter((un) => un.isVacant == true).length == prop.numUnits) {
          return prop
        } else {
          return
        }
      })
      setAvailableProps(avail)
    }
  }

  useEffect(()=>{
    if (sessionProperties.properties) {
      const avail = sessionProperties.properties.filter(prop => {
        console.log(Array.from(prop.Units).filter((un) => un.isVacant == true).length==prop.numUnits)
        if (Array.from(prop.Units).filter((un) => un.isVacant == false).length < prop.numUnits) {
          return prop
        }
      })
      console.log(avail.length)
      setAvailableProps(avail)
    }
  },[sessionProperties])
  useEffect(() => {
    const getTenants = async (id) => {
      let tenants = await dispatch(getAllTenants(id));
     
      // let tenantsresp = await tenants.json()
      setTenants(
        Array.from(tenants.data.tenants).filter(
          (tenant) => tenant.status != true
        )
      );
     
    };
    if (sessionUser) {
      getTenants(sessionUser.id);
    }
  }, []);

  useEffect(() => {
    const getProperties = async (id) => {
      let properties = await dispatch(getAllProperties(id));
      // let propresp = await properties.json()
      setPropData(properties.data);
      // getAvailableProperties()
      
    };
    if (sessionUser) {
      getProperties(sessionUser.id);
    }
  }, []);

  const handleUnit = (unitId, unitNum) => {
    setUnitId(unitId);
 
    setUnitNumber(parseInt(unitNum));
  };



  const getAvailableTenants = (tenants) => {
    const avail = tenants.filter((ten) => ten.active != true);
   
    return avail;
  };

  return (
    <>
      <h1>Create A Lease</h1>
      <div className="loader">
        <BeatLoader color={"#0183BD"} loading={loading} size={35} />
      </div>
      <form className="basic-form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div>
        <label>
          {/* Property */}
          {sessionProperties && sessionProperties.properties && availableProps.length>0 && (
            <select onChange={(e) => findCurrentProp(e.target.value)}>
              <option value="0">Select a property</option>
              {availableProps.map((prop) => (
                <option value={prop.id}>{prop.propertyName}</option>
              ))}
            </select>
          )}
        </label>
        <label>
        <br />
          {/* Unit */}
          {propertyUnits && (
            <select
              onChange={(e) =>
                handleUnit(
                  e.target.value,
                  e.target[e.target.selectedIndex].text
                )
              }
            >
              {propertyUnits.length > 0 && (
                <option value="0">Select a Unit</option>
              )}
              {propertyUnits.length == 0 && (
                <option value="0">No Available Units</option>
              )}
              {propertyUnits.map((prop) => (
                <option value={prop.id}>{prop.unitNumber}</option>
              ))}
            </select>
          )}
        </label>
        <br />
        <label>
          {/* Tenant */}
          {sessionTenants.tenants && (
            <select onChange={(e) => setTenantId(e.target.value)}>
              <option value="0">Select a tenant</option>
              {getAvailableTenants(sessionTenants.tenants).map((prop) => (
                <option value={prop.id}>
                  {prop.firstName} {prop.lastName}
                </option>
              ))}
            </select>
          )}
        </label>
        {/* <br /> */}
        <label>
          {/* Deposit */}
          <input
            type="number"
            value={depositAmnt}
            placeholder='Deposit Amount'
            onChange={(e) => setDepositAmnt(e.target.value)}
            required 
          />
        </label>
        </div>
        <div>
        <label>
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          End Date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        </div>
        </div>

        <button className="form-button submit-button" type="submit">
          Create Lease
        </button>
      </form>
    </>
  );
}

export default LeaseForm;
