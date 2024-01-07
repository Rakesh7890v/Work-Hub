import React, { useEffect, useState } from 'react'
import SideMenu from './SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Settings = ({showMenu, setShowMenu, handleMenu}) => {

  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [managerProfile, setManagerProfile] = useState(null);
  const [mangerShow, setMangerShow] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    role: '',
    salary: '',
    address: '',
  });

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('settingsItems')) || [];
    setItems(storedItems);
    const managProfile = localStorage.getItem('profilePhoto');
    setManagerProfile(managProfile);
    setUpdateData(storedItems.slice(-1));
  }, [managerProfile,setUpdateData]);
  
  const addItem = (id, name, role, salary, address) => {
    const addNewItem = { id, name, role, salary, address };
    const listItems = [...items, addNewItem];
    setItems(listItems);
    localStorage.setItem('settingsItems',JSON.stringify(listItems));
    const storedItems = JSON.parse(localStorage.getItem('settingsItems')) || [];
    setUpdateData(storedItems.slice(-1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem.id || !newItem.name || !newItem.role || !newItem.salary || !newItem.address ) return;
    addItem(newItem.id,newItem.name,newItem.role, newItem.salary, newItem.address);
    setNewItem({id:'',name:'',role:'',salary:'',address:''}); 
    setShowForm(false);    
  };

  const handleShowinfo = () => {
    setMangerShow(true);
  }

  const handleUpdateClick = () => {
    setShowForm(true);
    if (items.length > 0) {
      const updatedvalues = items[items.length - 1];
      setNewItem({
        id: updatedvalues.id,
        name: updatedvalues.name,
        role: updatedvalues.role,
        salary: updatedvalues.salary,
        address: updatedvalues.address,
      });
    } else {
      setNewItem({ id: '', name: '', role: '', salary: '', address: '' });
    }
  };

  const handleTimes = () => {
    setMangerShow(false);
  }  
       
  return (
    <div>
        <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu}/>
        <div className='settings'>
            <div className="settings-container">
                <h1>Settings</h1>
                <div className="setting-details">
                    <div className="setting">
                        <h4 onClick={handleShowinfo}>Personal Information</h4>
                    </div>
                    <div className="setting">
                        <h4>Password & Security</h4>
                    </div>
                    <div className="setting">
                        <h4>Customization</h4>
                    </div>
                    <div className="setting">
                        <h4>Audit & Trail</h4>
                    </div>
                    <div className="setting">
                        <h4>Documents</h4>
                    </div>
                    <div className="setting">
                        <h4>Help & Support</h4>
                    </div>
                </div>
            </div>
        </div>

    {mangerShow && (
        <div className="manager-personal-info">
            <div className="personal-info">
              <FontAwesomeIcon icon={faTimes} className='fatimes' onClick={handleTimes}/>
              <div className="manager-image">
                  <img src={managerProfile} alt="manager-profile" className='manager-photo'/>
              </div>
              {updateData.length >= 0 && (
                <div className="details-button">
                  {updateData.map(update => 
                    <div key={update.id} className="manager-personal-details">
                      <h2>{update.name}</h2>
                      <p style={{color:'black',fontWeight:'500', fontSize:'0.9rem'}}>ROLE: {update.role}</p>
                      <p><b>ID:</b> {update.id}</p>
                      <p><b>SALARY:</b> {update.salary}</p>
                      <p><b>ADDRESS:</b> {update.address}</p>
                    </div>
                  )}
                  <button onClick={handleUpdateClick}>Update</button>
              </div>
            )}
          </div>    
        </div>
    )}

    {showForm && (
      <div className='input-for-mgpi'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='ID' value={newItem.id} onChange={(e) => setNewItem({ ...newItem, id: e.target.value })} />
          <input type='text' placeholder='Name' value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
          <input type='text' placeholder='Role' value={newItem.role} onChange={(e) => setNewItem({ ...newItem, role: e.target.value })} />
          <input type='text' placeholder='Salary' value={newItem.salary} onChange={(e) => setNewItem({ ...newItem, salary: e.target.value })} />
          <input type='text' placeholder='Address' value={newItem.address} onChange={(e) => setNewItem({ ...newItem, address: e.target.value })} />
          <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    )}
    </div>
  )
}

export default Settings