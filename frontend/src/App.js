import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ProfilePage from "./components/Profile/ProfilePage";
import PropertiesPage from "./components/Properties/PropertiesPage";
import TenantsPage from "./components/Tenants/TenantsPage";
import UnitsPage from "./components/Units/UnitsPage";
import HomePage from "./components/HomePage/HomePage"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LeasesPage from "./components/Leases/LeasePage";
import PurchasesPage from "./components/Purchases/PurchasesPage";
import VendorsPage from './components/Vendors/Vendors'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className='display-content'>
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/properties">
            <PropertiesPage />
          </Route>
          <Route path="/tenants">
            <TenantsPage />
          </Route>
          <Route path="/leases">
            <LeasesPage />
          </Route>
          <Route path="/units">
            <UnitsPage />
          </Route>
          <Route path="/purchases">
            <PurchasesPage />
          </Route>
          <Route path="/vendors">
            <VendorsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        </div>
      )}
    </>
  );
}

export default App;
