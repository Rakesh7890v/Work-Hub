import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';


const EmployeePage = ({items, setItems, message, handleMessageShow}) => {

  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSlectedItem] = useState(null);
  const [newItem,setNewItem] = useState({id:'',name:'',salary:'',dob:''});
  const [managerMessages, setManagerMessages] = useState([]);
  const [showMessage, setShowMessage] = useState({state:''});
  const [messageClick, setMessageClick] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('MessagetoAdmin')) || [];
    setManagerMessages(storedMessages);
  }, [message]);

  const addItem = (id,name,salary,dob)=> {
    const addNewItem = {id,name,salary,dob};
    const listItems = [...items,addNewItem];
    setItems(listItems);
    localStorage.setItem("employee",JSON.stringify(listItems))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem.id || !newItem.name || !newItem.salary || !newItem.dob ) return;
    addItem(newItem.id,newItem.name, newItem.salary, newItem.dob);
    setNewItem({id:'',name:'',salary:'',dob:''}); 
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item)=> item.id !== id)
    setItems(listItems)
    localStorage.setItem("employee",JSON.stringify(listItems))
  }

  const handleUpdateClick = (item) => {
    setShowForm(true);
    setSlectedItem(item);
    setNewItem({
       id:item.id, name: item.name, salary: item.salary, dob: item.dob
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if(!newItem.id || !newItem.name || !newItem.salary || !newItem.dob) return;

    const updatedItems = items.map(item => {
       if(item.id === selectedItem.id) {
         return {
           ...item,id: newItem.id, name:newItem.name, salary: newItem.salary, dob: newItem.dob,
         };
       }
       return item;
    })
    setItems(updatedItems);
    localStorage.setItem("employee",JSON.stringify(updatedItems));

    setSlectedItem(null);
    setNewItem({id:'',name: '',salary:'',dob:''});
  }  

  const handleDeleteMessage = (id) => {
    const updatedMessages = managerMessages.filter((msg) => msg.id !== id);
    setManagerMessages(updatedMessages);
    const updateShowMessage = managerMessages.filter((msg) => (msg.id === id) ? false : true) 
    setShowMessage(...updateShowMessage);
    localStorage.setItem('MessagetoAdmin', JSON.stringify(updatedMessages));
  };

  const handleTimes = () => {
    setShowForm(false);
  }

  const handleMessage = (id) => {
    const clickedMessage = managerMessages.find((msg) => msg.id === id);
    setMessageClick(clickedMessage ? [clickedMessage] : []);
  }

  const handleTimesmess = (id) => {
    const click = messageClick.find((msg) => (msg.id === id) ? false : true);
    setMessageClick(click);
  }

  return (
    <div className='employee-page'>
      <div className='top'>
        <button onClick={()=> setShowForm(true)}>Add Employee</button>
      </div>
        {showForm && (<div className="employee-container">
          <FontAwesomeIcon onClick={handleTimes} className='fatimes' icon={faTimes} />
          <form onSubmit={selectedItem ? handleUpdateSubmit: handleSubmit}>  
            <input type='text' placeholder='Employee ID' value={newItem.id} onChange={(e) => setNewItem({...newItem,id: e.target.value})} />
            <input type='text' placeholder='Employee Name' value={newItem.name} onChange={(e)=> setNewItem({...newItem,name: e.target.value})}/>
            <input type='text' placeholder='Employee Salary' value={newItem.salary} onChange={(e) => setNewItem({ ...newItem, salary: e.target.value })} />
            <input type='date' value={newItem.dob} onChange={(e) => setNewItem({ ...newItem, dob: e.target.value })}/>
            <button type='submit' className='submit' onClick={handleMessageShow}>{selectedItem ? 'Update': 'Submit'}</button> 
          </form>
        </div>)}

      <div className="details-container">
        <div className="table-employee">
        <table className='employee-table'>
          <thead>
            <tr>
              <th>ID.No</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Date of Join</th>
              <th>Changes</th>
              <th></th>
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
                <button type='submit' className='update' onClick={()=> handleUpdateClick(item)}><FontAwesomeIcon icon={faUpload}/></button>
                <button type='submit' className='delete' onClick={()=>handleDelete(item.id)}><FontAwesomeIcon icon={faTrash}/></button>
                </td>
               <td>
                {managerMessages.map((msg) => msg.id === item.id && (
                  <div className="container" key={msg.id}>
                  {showMessage && ( 
                    <div className="message-pointer" onClick={() => {handleMessage(item.id)}}></div>)}
                    {messageClick && messageClick.map((mess) => mess.id === item.id && <div className="mfm" key={item.id}>
                        <FontAwesomeIcon onClick={() => handleTimesmess(item.id)} className='fatimes' icon={faTimes} />
                        <p>{msg.message}</p>
                        <button type='submit' className='msg-button' onClick={() => handleDeleteMessage(item.id)}>Delete</button>
                    </div>)}
                </div>))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default EmployeePage;
