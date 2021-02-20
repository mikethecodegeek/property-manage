import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getAllProperties } from "../../store/properties";
import { getAllTenants } from "../../store/tenants";
import { getUserUnits } from "../../store/units";
// import LeaseForm from '../LeaseFormPage'
import { useAlert } from "react-alert";
import { getAllPurchases } from "../../store/purchases";
// import './SignupForm.css';
import './Profile.css'


function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProperties = useSelector(
    (state) => state.userProperties.properties
    );
    const sessionTenants = useSelector((state) => state.tenants.tenants);
    const sessionPurchases = useSelector((state) => state.purchases);
    const unitData = useSelector((state) => state.propertyUnits.units);
    // if (!sessionUser) return <Redirect to="/" />;

  // const ownerUnits = useSelector(state => state.units.units)
  const [propData, setPropData] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [numUnits, setNumUnits] = useState(0);
  const [numVacant, setNumVacant] = useState(0);
  const [rentedUnits, setRentedUnits] = useState([]);
  const [activeTenants, setActiveTenants] = useState([]);

  useEffect(() => {
    const getProperties = async (id) => {
      let properties = await dispatch(getAllProperties(id));
      // let propresp = await properties.json()
      setPropData(properties.data);
      setAllProperties(properties.data.properties);
      dispatch(getAllTenants(id));
      dispatch(getUserUnits(id));
      await dispatch(getAllPurchases(id));
   
    };
    if (sessionUser) {
      getProperties(sessionUser.id);
    }
  }, []);

  useEffect(() => {
    if (propData.properties) {
      let totUnits = 0;
      propData.properties.forEach((prop) => (totUnits += prop.numUnits));
      
      setNumUnits(totUnits);
     
    }
  }, [propData]);

  useEffect(() => {
   
    if (sessionTenants.tenants) {
      let active = sessionTenants.tenants.filter((tenant) => {
       
        return tenant.active == true;
      });
      
      setActiveTenants(active.length);
    }
  }, [sessionTenants]);

  useEffect(() => {
    
    if (unitData.units) {
      let vacant = unitData.units.filter((unit) => {
        return unit.isVacant == true;
      });
      let rented = unitData.units.filter((unit) => {
        return unit.isVacant != true;
      });
      
      setRentedUnits(rented);
      setNumVacant(vacant.length);
    }
  }, [unitData.units]);
  if (!sessionUser) return <Redirect to="/" />;
  const calculateIncome = (arr) => {
    let starting = 0;
    arr.forEach((unit) => {
      starting += unit.rentalPrice;
    });
    return starting;
  };

  const calculateExpense = (propArray) => {
    let unitTot = 0;
    let propTot = 0;

    const props = Array.from(sessionPurchases.propertyPurchases);
    const units = Array.from(sessionPurchases.unitPurchases);
    units.forEach((un) => (unitTot += un.amount));
    props.forEach((prop) => (propTot += prop.amount));
   

    let expense = 0;
    propArray.forEach((prop) => (expense += prop.monthlyPayment));
    return expense + unitTot + propTot;
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const calcAllPurchases = (unitPurchases, propertyPurchases) => {
    let unitTot = 0;
    let propTot = 0;
    unitPurchases.forEach((purchase) => (unitTot += purchase.amount));
    propertyPurchases.forEach((purchase) => (propTot += purchase.amount));
    return unitTot + propTot;
  };

  return (
    <>
      <h1 className="profile-username" style={{textAlign:'center'}}>{sessionUser.username}</h1>
      {sessionProperties.properties && (
        <div className="">
          {/* <h2>Quick View</h2> */}

          <div className="flex-even" style={{flexWrap:'wrap'}}>
            <div class="card">
              <div class="header">
                <p>Properties</p>
              </div>
              <div class="container center-div thing1">
                <p>Properties: {sessionProperties.properties.length} </p>
                {unitData.units && (
                  <>
                    <p>Units: {unitData.units.length}</p>
                    <p>Vacant: {numVacant} </p>
                  </>
                )}
              </div>
            </div>

            {sessionTenants.tenants && (
              <div class="card thing2" >
                <div class="header">
                  <p>Applicants / Tenants</p>
                </div>
                <div class="container center-div thing4" >
                  {unitData.units && (
                    <>
                      <p> Tenants: {activeTenants}</p>
                      <p>Applicants: {sessionTenants.tenants.length - activeTenants}{" "}
                        
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {allProperties.length > 0 && sessionPurchases.unitPurchases && (
            <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
              <div style={{width:'50%'}}class="card">
                <div class="header">
                  <p>Income / Expenses</p>
                </div>
                <div class="container center-div">
                  
                  {unitData.units && (
                    <>
                      <p>Income: <span className='green'>{formatter.format(calculateIncome(rentedUnits))} </span> 
                      </p>
                      <p>Expenses: <span className='red'>{formatter.format(calculateExpense(allProperties))}{" "} </span>
                       
                      </p>
                      { calculateIncome(rentedUnits) -
                            calculateExpense(allProperties) >= 0 ? 
                      <p className='text-center green'>
                        {formatter.format(
                          calculateIncome(rentedUnits) -
                            calculateExpense(allProperties)
                        )}{" "}
                        
                      </p> :  <p className='text-center red'>
                        {formatter.format(
                          calculateIncome(rentedUnits) -
                            calculateExpense(allProperties)
                        )}{" "}
                        
                      </p>
                          
                          }
                    </>
                  )}
                </div>
              </div>
              </div>
           
          )}

          {/* {sessionPurchases &&
        <p>{calcAllPurchases(Array.from(sessionPurchases.unitPurchases),Array.from(sessionPurchases.propertyPurchases))}</p>
        } */}
          {/* {sessionPurchases && calcAllPurchases(1,2)} */}
        </div>
      )}
    </>
  );
}

export default ProfilePage;
