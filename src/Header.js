import React from 'react'
import './App.css';
import logo from './images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

const Header = ({barShow, handleToggle, successMessage, messagetoAdmin, barcrossShow, handleCrossToggle}) => {

  return (
    <div className='head'>
        <img src={logo} alt='profile'/>
        {barShow && <FontAwesomeIcon onClick={handleToggle} className='head-toggle' icon={faBars} />}
        {barcrossShow && <FontAwesomeIcon onClick={handleCrossToggle} className='head-toggle' icon={faTimes} />}
        {successMessage && (<p className='success-message'>Successfully Added.</p>)}
        {messagetoAdmin && (<p className='success-message'>Successfully sent.</p>)}
    </div>
  )
}

export default Header