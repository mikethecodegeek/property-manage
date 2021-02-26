import React from 'react';
import { NavLink, Redirect , useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded, content }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
     '' // <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        {/* <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink> */}
      </>
    );
  }

  const logout = (e) => {
    e.preventDefault();
    // history.push('/')
    dispatch(sessionActions.logout());
    return <Redirect to="/" />;
  
 
  };

  return (
    <div className='nav-section'>
      <div className='nav-bar'>
            <NavLink className='logo' exact to="/">PropertEye</NavLink>
        <ul>
          <li className='me'>
           <span><a href='mailto: mikethecodegeek@gmail.com'>Michael Sanford </a></span>
           <span><a target="_blank" href='https://github.com/mikethecodegeek'><i class="fab fa-github"></i></a></span>
           <span><a target="_blank" href='https://www.linkedin.com/in/michael-sanford-1180b3115/'><i class="fab fa-linkedin"></i></a></span>
          </li>
          <li>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
      <div className='content'>
          <div className='side-bar' style={{paddingTop:'30px'}}>
            <div>
              <ul>
                <li className='side-link mono'><NavLink to="/profile">My Profile</NavLink></li>
                <li className='side-link mono'><NavLink to="/properties">Properties</NavLink></li>
                <li className='side-link mono'><NavLink to="/units">Units</NavLink></li>
                <li className='side-link mono'><NavLink to="/tenants">Tenants</NavLink></li>
                <li className='side-link mono'><NavLink to="/leases">Leases</NavLink></li>
                <li className='side-link mono'><NavLink to="/purchases">Purchases</NavLink></li>
                <li className='link-no-decorate mono'><NavLink to="/vendors">Vendors</NavLink></li>
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
     
      </div>
    </div>
  );
}

export default Navigation;