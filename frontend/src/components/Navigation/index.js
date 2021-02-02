import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded, content }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
     '' // <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
      </>
    );
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className='nav-section'>
      <div className='nav-bar'>
            <NavLink className='logo' exact to="/">NO-IDEA</NavLink>
        <ul>
          <li>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
      <div className='content'>
          <div className='side-bar' style={{paddingTop:'30px'}}>
            <div>
              <ul>
                <li className='side-link'><NavLink to="/profile">My Profile</NavLink></li>
                <li className='side-link'><NavLink to="/properties">Properties</NavLink></li>
                <li className='side-link'><NavLink to="/tenants">Tenants</NavLink></li>
                <li className='link-no-decorate'><NavLink to="/units">Units</NavLink></li>
              </ul>
            </div>
            <div>
              <ul>
                {sessionUser &&
                <li onClick={logout}>Logout</li>
                }
              </ul>
            </div>
          </div>

         {content}
      </div>
    </div>
  );
}

export default Navigation;