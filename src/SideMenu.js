import React , { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCogs, faLineChart, faUserTie } from '@fortawesome/free-solid-svg-icons';

const SideMenu = ({showMenu, handleMenu}) => {

  const [show, setShow] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedProfilePhoto = localStorage.getItem('profilePhoto');
    if (storedProfilePhoto && storedProfilePhoto.startsWith('data:')) {
      setProfilePhoto(storedProfilePhoto);
    }
    const storedItems = JSON.parse(localStorage.getItem('settingsItems')) || [];
    setItems(storedItems.slice(-1));
  }, []);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      setProfilePhoto(dataURL);
      localStorage.setItem('profilePhoto', dataURL);
    };
  
    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };
  
    reader.readAsDataURL(file);
    setShow(false);
  }

  const handleClickPhoto = () => {
    setShow(true);
  }  

  return (
    <div>
        {showMenu && <div className="Menu-container">
          <div className="head-details">
            <div className="manager-profile-icon" onClick={handleClickPhoto}>
              {profilePhoto === null && (<p style={{cursor:'pointer'}}>No Profile</p>)}
              {profilePhoto && <div className="manager-profile">
                <img src={profilePhoto} alt='Profile' className='manager-photo' onClick={handleClickPhoto}/>
              </div>}
              {show && (<div className='profile-menu'> 
                <h4>Profile Photo</h4>
                <input type='file' onChange={handleFileChange} />
              </div>)}
            </div>  
            <div className="manager-detail">
              {items.map(item => <h2>{item.name}</h2>)}
              {items.map(item => <p>{item.role}</p>)}
            </div>  
          </div>
          <Link to='/manager/dashboard' className='line' onClick={handleMenu}><div className="details" style={{background:'blue', color:'white'}}>
            <h4>Dashboard</h4>
            <FontAwesomeIcon icon={faLineChart} />
          </div></Link>
          <Link to='/manager' className='line' onClick={handleMenu}><div className="details">
            <h4>Manager</h4>
            <FontAwesomeIcon icon={faUserTie} />
          </div></Link>
          <Link to='/manager/attendance' className='line' onClick={handleMenu}><div className="details">
            <h4>Attendance</h4>
            <FontAwesomeIcon icon={faCheckCircle} />
          </div></Link>
          <Link to='/manager/settings' className='line' onClick={handleMenu}><div className="details">
            <h4>Settings</h4>
            <FontAwesomeIcon icon={faCogs} />
          </div></Link>
        </div>}

    </div>
  )
}

export default SideMenu