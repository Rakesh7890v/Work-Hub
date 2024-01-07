import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Employee from './Employee';
import Manager from './Manager';
import React, {useState, useEffect} from 'react';
import Attendance from './Attendance';
import Settings from './Settings';
import Dashboard from './Dashboard';
import Home from './Home';

function App() {
  const storedItems = JSON.parse(localStorage.getItem('employee'));
  const [items, setItems] = useState(storedItems || []);

  const [message, setMessage] = useState({id:'',message:''});
  const [messageId, setMessageId] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [barShow, setBarShow] = useState(true);
  const [barcrossShow, setBarcrossShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [messagetoAdmin, setMessagetoAdmin] = useState(false);

  const handleToggle = () => {
    setShowMenu(true);
    setBarShow(false);
    setBarcrossShow(true);
  }

  const handleMenu = () => {
    setShowMenu(false);
    setBarcrossShow(false);
    setBarShow(true);
  }

  const handleCrossToggle = () => {
    setShowMenu(false);
    setBarcrossShow(false);
    setBarShow(true);
  }

  const handleMessageShow = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    },5000);
  }

  const handleMessagetoAdmin = () => {
    setMessagetoAdmin(true);
    setTimeout(() => {
      setMessagetoAdmin(false);
    },5000);
  }

  return (
    <Router>
      <div>
        <Header barShow={barShow} handleToggle={handleToggle} successMessage={successMessage} messagetoAdmin={messagetoAdmin}  barcrossShow={barcrossShow} handleCrossToggle={handleCrossToggle}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/employee' element={<Employee items={items} setItems={setItems} message={message} setMessage={setMessage} messageId={messageId} handleMessageShow={handleMessageShow}/>} />
          <Route path='/manager' element={<Manager items={items} message={message} setMessage={setMessage} messageId={messageId} setMessageId={setMessageId} handleMessagetoAdmin={handleMessagetoAdmin} showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu}/>} />
          <Route path='/manager/dashboard' element={<Dashboard showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu}/>} />
          <Route path='/manager/attendance' element={<Attendance showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu}/>} />
          <Route path='/manager/settings' element={<Settings showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;