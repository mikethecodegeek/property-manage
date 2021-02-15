import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../store/properties";
import { Redirect } from "react-router-dom";
import {format} from 'date-fns'
import PropertiesForm from "./PropertiesForm";
import PropertyFeaturesForm from "./PropertyFeaturesForm";
import ImageUpload from "../PhotoUpload/PhotoUpload";
import { uploadImg } from "../../store/properties";
import TableComponent from "../Table/Table";
import "./Properties.css";

function PropertiesPage() {
  //   const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);

  //   if (!sessionUser) return <Redirect to="/" />;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
  const [viewFeatures, setViewFeatures] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [data, setData] = useState([]) 

  useEffect(() => {
    const getProperties = async (id) => {
      let properties = await dispatch(getAllProperties(id));
      setPropData(properties.data);
      console.log(properties.data)
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

  const findCurrentProp = (id) => {
    if (id !== "0" && sessionProperties && sessionProperties.properties) {
     
      let current = sessionProperties.properties.find((prop) => prop.id == id);
      setCurrentProp(current);
      setPropertyUnits(current.Units);
      setVacantUnits(current.Units.filter((unit) => unit.isVacant));
      setRentedUnits(current.Units.filter((unit) => !unit.isVacant));
      setImgUrl('');
     
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

  useEffect(()=>{
    // setData(sessionProperties.properties.data.properties)
  
    if (sessionProperties.properties ) {
      let totUnits = 0;
      sessionProperties.properties.forEach((prop) => (totUnits += prop.numUnits));
     
      setNumUnits(totUnits);
      // console.log(sessionProperties.properties)
      setData(sessionProperties.properties)
    }
    if (!currentProp) return
    findCurrentProp(currentProp.id)
    
  },[sessionProperties.properties])


  const columns = React.useMemo(
    () => [
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
      
    ],
    []
  )

  return (
    <>
      <div className="flex-between">
        <h1>Properties</h1>
        
        {/* {sessionProperties && sessionProperties.properties && (
          <select onChange={(e) => findCurrentProp(e.target.value)}>
            <option value="0">Please select a property</option>
            {sessionProperties.properties.map((prop) => (
              <option value={prop.id}>{prop.propertyName}</option>
            ))}
          </select>
        )} */}

        {currentProp && (
          <>
          <button
            className="form-button"
            onClick={() => setViewFeatures(!viewFeatures)}
          >
            {viewFeatures == false ? "View Features" : "View Property"}
          </button>
          <button
            className="form-button"
            onClick={() => setCurrentProp(null)}
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
            setViewFeatures(false)}
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
              {!viewFeatures &&
                <div className="prop-top-section">
                  <div className="prop-img">
                    <img
                      src={imgUrl || currentProp.photo}
                      style={{ maxHeight: "150px" }}
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
              {!viewFeatures &&
                <div
                  className="prop-units"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  {/* {rentedUnits.length + vacantUnits.length == currentProp.numUnits ? currentProp.numUnits : 'More unit data needed'} */}
                  <h3>Total Units: {propertyUnits.length} </h3>
                  <h3>Rented Units: {rentedUnits.length} </h3>
                  <h3>Vacant Units: {vacantUnits.length} </h3>
                  {/* <h3>Units Rented: {currentProp.Units.filter(unit => unit.isVacant)} </h3> */}
                </div>
          }
              </div>
                  
              {viewFeatures && (
                <div>
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
