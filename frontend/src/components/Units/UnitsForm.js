import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createUnit } from "../../store/units";
import { getAllProperties } from "../../store/properties";
import { editUnit } from "../../store/units";
import BeatLoader from "react-spinners/BeatLoader";
import { useAlert } from "react-alert";
// import './SignupForm.css';

function UnitsForm({current, property}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [propertyId, setPropertyId] = useState(current.id);
  const [sqft, setSqft] = useState();
  const [isVacant, setIsVacant] = useState(current.isVacant);
  const [rentalPrice, setRentalPrice] = useState();
  const [numOccupants, setNumOccupants] = useState();
  const [numBeds, setNumBeds] = useState();
  const [numBaths, setNumBaths] = useState();
  const [unitNumber, setUnitNumber] = useState();
  const [unitType, setUnitType] = useState(current.unitType);
  const [available, setIsAvailable] = useState(current.isVacant)
  const [unitId, setUnitId] = useState(current.id)
  const [loading, setLoading] = useState(false);

  //   const [propList, setPropList] = useState([])
  const [errors, setErrors] = useState([]);

  const sessionProperties = useSelector(
    (state) => state.userProperties.properties
  );
  console.log(property)

  //   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const asyncFunc = async () => {
      setLoading(true);
      try {
        await dispatch(
          editUnit(
            {
              propertyId,
              sqft,
              isVacant,
              rentalPrice,
              numOccupants,
              numBaths,
              numBeds,
              unitNumber,
              unitType,
              unitId,
            },
            sessionUser.id
          )
        );
        alert.show("Saved!");
      } catch {
        alert.error("Failed");
      } finally {
        setLoading(false);
      }
    };
    asyncFunc()
  };

  useEffect(() => {
    //   const getTheProperties = async () => {
    dispatch(getAllProperties(sessionUser.id));
    //       setPropList(properties)
    //   }
    //   getTheProperties()
  }, []);
  const alert = useAlert();

  // let currentProps =
  return (
    <>
      {/* <h3>Add Unit Property</h3> */}
      <div className="loader">
        <BeatLoader color={"#0183BD"} loading={loading} size={35} />
      </div>
      <form
        className="basic-form"
        style={{ width: "300px" }}
        onSubmit={handleSubmit}
      >
        {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <div className="flex-between">
          <div>
            <label>
              Property
              {/* {sessionProperties && (
                <select onChange={(e) => setPropertyId(e.target.value)}>
                  <option value="0">Please select a property</option>
                  {sessionProperties.properties.map((prop) => (
                    <option value={prop.id}>{prop.propertyName}</option>
                  ))}
                </select>
              )} */}
              <input type='text' value={property.propertyName} disabled />
              {/* <input
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            required
          /> */}
            </label>{" "}
            <br />
            <label>
              Rental Price
              <input
                type="number"
                value={rentalPrice || current.rentalPrice}
                onChange={(e) => setRentalPrice(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Square Feet
              <input
                type="number"
                value={sqft || current.sqft}
                onChange={(e) => setSqft(e.target.value)}
                required
              />
            </label>{" "}
            <br />
            <label>
              Max Occupants
              <input
                type="number"
                value={numOccupants || current.numOccupants}
                onChange={(e) => setNumOccupants(e.target.value)}
                required
              />
            </label>{" "}
            <br />
          </div>
          <div>
            <label>
              Unit Number
              <input
                type="number"
                disabled
                value={unitNumber || current.unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
            <label>
              Available
              <input
                type="text"
                value={available != true ? 'No' : 'Yes'}
                disabled
                onChange={(e) => setUnitType(e.target.value)}
                required
              />
            </label>
            <br />
              Number of Beds
              <input
                type="number"
                value={numBeds || current.numBeds}
                onChange={(e) => setNumBeds(e.target.value)}
                required
              />
            </label>{" "}
            <br />
            <label>
              Number of Baths
              <input
                type="number"
                value={numBaths || current.numBaths}
                onChange={(e) => setNumBaths(e.target.value)}
                required
              />
            </label>
            <br />
          </div>
        </div>
        <button className="form-button submit-button" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default UnitsForm;
