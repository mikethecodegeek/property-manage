import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../store/properties";
import { Redirect } from "react-router-dom";
import {format} from 'date-fns'
import {getAllPurchases,getPropertyPurchases} from '../../store/purchases'
import {getAllVendors} from '../../store/vendors'
import PropertiesForm from "./PropertiesForm";
import PropertyFeaturesForm from "./PropertyFeaturesForm";
import ImageUpload from "../PhotoUpload/PhotoUpload";
import { uploadImg } from "../../store/properties";
import TableComponent from "../Table/Table";
import "./Properties.css";

function PropertiesPage() {
  //   const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);

    // if (!sessionUser) return <Redirect to="/" />;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const propPurchases = useSelector((state) => state.purchases);
  const vendors = useSelector( state => state.vendors)
  const sessionProperties = useSelector(
    (state) => state.userProperties.properties
  );
  const [propData, setPropData] = useState([]);
  const [numUnits, setNumUnits] = useState(0);
  const [currentProp, setCurrentProp] = useState(null);
  const [propertyUnits, setPropertyUnits] = useState(null);
  const [vacantUnits, setVacantUnits] = useState([]);
  const [rentedUnits, setRentedUnits] = useState([]);
  const [newProperty, setNewProperty] = useState(false);
  const [viewFeatures, setViewFeatures] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [data, setData] = useState([]) 
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const getProperties = async (id) => {
      let properties = await dispatch(getAllProperties(id));
      // await dispatch(getAllVendors(id))
      setPropData(properties.data);
     
      setData(properties.data.properties)
    };
    if (sessionUser) {
      getProperties(sessionUser.id);
    }
  }, [sessionUser]);


  // useEffect(() => {
  //   if (propData.properties) {
  //     let totUnits = 0;
  //     propData.properties.forEach((prop) => (totUnits += prop.numUnits));
     
  //     setNumUnits(totUnits);
      
  //   }
  // }, [propData]);

  const findCurrentProp = async (id) => {
   
    if (id !== "0" && sessionProperties && sessionProperties.properties) {
   
      const purchases = await dispatch(getPropertyPurchases(id))
   
      setData([...purchases.data.allPurchases.unitPurchases,...purchases.data.allPurchases.propertyPurchases])
      let current = sessionProperties.properties.find((prop) => prop.id == id);
      setCurrentProp(current);
      setPropertyUnits(current.Units);
      setVacantUnits(current.Units.filter((unit) => unit.isVacant));
      setRentedUnits(current.Units.filter((unit) => !unit.isVacant));
      setImgUrl('');
      setColumns( [
       
        {
          Header: 'Type',
          accessor: d => d.unitId ? 'Unit' : 'Property'
        },
        {
          id: 'unitId',
          Header: 'Unit',
          accessor: 'unitId'
        },
        {
          Header: 'Description',
          accessor: 'description',
        },
        {
          id:'vendorId',
          Header: 'Vendor',
          accessor: 'Vendor.vendorName'
          }
        ,
        {
          Header: 'Amount',
          accessor: 'amount',
        },
      
        
      ])
     
    } else {
      setCurrentProp(null);
    }
  };

  const showPropertiesForm = () => {
    setNewProperty(!newProperty);
  };

  const uploadPhoto = (imgUrl) => {
    const id = currentProp.id;
    dispatch(uploadImg({ imgUrl }, id))
    setCurrentProp({...currentProp,photo:imgUrl})
      
  };

  const setPropsTable = () => {
    setData(sessionProperties.properties)
    setColumns([
      {
        
        Header: 'Property Name',
        accessor: 'propertyName', // accessor is the "key" in the data
      },
      {
        Header: 'Type',
        accessor: 'propertyType',
      },
      {
        Header: '# of Units',
        accessor: 'numUnits',
      },
      {
        Header: 'Mortgage',
        accessor: 'monthlyPayment'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'City',
        accessor: 'city'
      },
      {
        Header: 'State',
        accessor: 'state'
      },
      {
        Header: 'Zip',
        accessor: 'zipCode'
      },
      
    ])
    setCurrentProp(null)
  }

  useEffect(()=>{
    // setData(sessionProperties.properties.data.properties)
  
    if (sessionProperties.properties ) {
      let totUnits = 0;
      sessionProperties.properties.forEach((prop) => (totUnits += prop.numUnits));
     
      setNumUnits(totUnits);
      
      setColumns([
        {
          
          Header: 'Property Name',
          accessor: 'propertyName', // accessor is the "key" in the data
        },
        {
          Header: 'Type',
          accessor: 'propertyType',
        },
        {
          Header: '# of Units',
          accessor: 'numUnits',
        },
        {
          Header: 'Mortgage',
          accessor: 'monthlyPayment',
          Cell: ({value}) => formatter.format(value),
        },
        {
          Header: 'Address',
          accessor: 'address'
        },
        {
          Header: 'City',
          accessor: 'city'
        },
        {
          Header: 'State',
          accessor: 'state'
        },
        {
          Header: 'Zip',
          accessor: 'zipCode'
        },
        
      ])
      setData(sessionProperties.properties)
      
    }
    if (!currentProp) return
    findCurrentProp(currentProp.id)
    
  },[sessionProperties.properties])

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  
  if (!sessionUser) return <Redirect to="/" />;
  return (
    <>
      <div className="flex-between">
        <h1>Properties</h1>
        

        {currentProp && (
          <>
         
          <button
            className="form-button"
            onClick={() => setPropsTable() }
          >
            All Properties
          </button>
          </>
        )}
        <button className="form-button" onClick={showPropertiesForm}>
          New Property
        </button>
      </div>
      {newProperty && (
        <div>
          <PropertiesForm saved={() => {
            setNewProperty(false)
            setViewFeatures(true)}
            } />
        </div>
      )}



      {!newProperty && (
        <div>
          {!currentProp && 
          
<TableComponent data={data} columns={columns} onClickCallback={(e)=> findCurrentProp(e)} />
          }
          {currentProp && propertyUnits && (
            <div>
              <div className="property-page-details">
              {viewFeatures &&
                <div className="prop-top-section">
                  <div className="prop-img">
                    <img
                      src={imgUrl || currentProp.photo}
                      style={{ maxHeight: "100px" }}
                    ></img>
                    <ImageUpload
                      onNewImageBase64={(img) => setImgUrl(img)}
                      onSave={(photo) => uploadPhoto(photo)}
                    />
                  </div>

                  <div
                    className="prop-name"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <p>{currentProp.propertyName}</p>
                    <p>{currentProp.propertyType}</p>
                  </div>

                  <div
                    className="prop-address"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <p>{currentProp.address}</p>
                    <p>
                      {currentProp.city} {currentProp.state}{" "}
                      {currentProp.zipCode}
                    </p>
                  </div>
                  
                </div>
              }
              {viewFeatures &&
                <div
                  className="prop-units"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    position:'relative',
                    
                  }}
                >
                  {/* {rentedUnits.length + vacantUnits.length == currentProp.numUnits ? currentProp.numUnits : 'More unit data needed'} */}
                  <h3>Total Units: {propertyUnits.length} </h3>
                  <h3>Rented Units: {rentedUnits.length} </h3>
                  <h3>Vacant Units: {vacantUnits.length} </h3>
                  {/* <h3>Units Rented: {currentProp.Units.filter(unit => unit.isVacant)} </h3> */}
                </div>
                
              }
              {/* <TableComponent data={data} columns={columns} onClickCallback={(e)=> console.log(e)} height='150px' /> */}
              </div>
                  
              {viewFeatures && (
                <div style={{position:'relative',top:'-20px'}}>
                  <h2>Property Features</h2>
                  {currentProp.PropertyFeature && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "80%",
                      }}
                    >
                      <div>
                        <p>
                          Lot size: {currentProp.PropertyFeature.size} acres
                        </p>
                        <p>
                          Gym: {currentProp.PropertyFeature.gym ? "Yes" : "No"}
                        </p>
                        <p>
                          Pool:{" "}
                          {currentProp.PropertyFeature.pool ? "Yes" : "No"}
                        </p>
                        <p>
                          WIFI:{" "}
                          {currentProp.PropertyFeature.wifi ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p>
                          Clubhouse:{" "}
                          {currentProp.PropertyFeature.clubhouse ? "Yes" : "No"}
                        </p>
                        <p>
                          Pets:{" "}
                          {currentProp.PropertyFeature.petsAllowed
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>
                          Covered Parking:{" "}
                          {currentProp.PropertyFeature.overheadParking
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>
                          Parking: {currentProp.PropertyFeature.numParkingSpots}{" "}
                          spot (per unit)
                        </p>
                      </div>
                    </div>
                  )}
                  {!currentProp.PropertyFeature && currentProp.id && (
                    <div>
                      <h3>Please add some features to this property</h3>
                      <PropertyFeaturesForm propertyId={currentProp.id} finished={(e)=> findCurrentProp(e)} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PropertiesPage;
