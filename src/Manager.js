import React, { useState } from 'react';
import './App.css';
import SideMenu from './SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';

const ManagerPage = ({items, message, setMessage,messageId, setMessageId, handleMessagetoAdmin ,showMenu ,setShowMenu, handleMenu}) => {

  const [showForm, setShowForm] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (message) {
      const storedMessages = JSON.parse(localStorage.getItem("MessagetoAdmin")) || [];
      const updatedMessages = [...storedMessages, { id: messageId, message }];
      localStorage.setItem("MessagetoAdmin", JSON.stringify(updatedMessages));
    }
    setShowForm(false);
  };

  const handleMessage = (id) => {
    const updatedMessage = items.find((item) => item.id === id)?.message || '';
    setMessage(updatedMessage);
    setShowForm(true);
    setMessageId(id);
  };

  const handleTimes = () => {
    setShowForm(false);
  }

  return (
    <div>
        <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu}/>

      <div className="Menu-Manager">

        <div className="input-details-manager">
          <div className="inputs-container-for-all">
            {showForm && (<div className="employee-container manager-input">
              <FontAwesomeIcon onClick={handleTimes} className='fatimes' icon={faTimes} />
                <form className='message-container' onSubmit={handleSend}>  
                  <textarea type='text' placeholder='Message to Admin' value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button type='submit' className='send' onClick={handleMessagetoAdmin}>send</button> 
                </form>
            </div>)}
          </div>

        <div className="details-container">
          <div className="table-employee">
            <table className='employee-table '>
              <thead>
                <tr>
                  <th>ID.No</th>
                  <th>Name</th>
                  <th>Salary</th>
                  <th>DOJ</th>
                  <th>MTA</th>
                </tr>
              </thead>
              <tbody>
                {items && items.map((item, index) => (
                  <tr key={index} className='employee-row'>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.salary}</td>
                    <td>{item.dob}</td>
                    <td>
                    <button type='submit' className='message' onClick={() => handleMessage(item.id)}><FontAwesomeIcon icon={faComment}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div> 

    </div>
  );
}

export default ManagerPage;
