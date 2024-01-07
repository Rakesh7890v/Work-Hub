import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SideMenu from './SideMenu';


const Dashboard = ({showMenu, setShowMenu, handleMenu}) => {

    const [projects, setProjects] = useState({ id: '', name: '', status: '', l1: false, l2: false, l3: false });
    const storedItems = JSON.parse(localStorage.getItem('project')) || [];
    const [items, setItems] = useState(storedItems);   

    const [growth, setGrowth] = useState({ id: '', amount: '', status: '', l1: false, l2: false, l3: false });
    const storedGrowth = JSON.parse(localStorage.getItem('growth')) || [];
    const [itemsg, setItemsg] = useState(storedGrowth);

    const [showFormp, setShowFormp] = useState(false);
    const [showFormg, setShowFormg] = useState(false);

    const [progress, setShowProgress] = useState(0);
    const [growthprog, setGrowthProg] = useState(0);

    useEffect(() => {
        const totalProjects = items.length;
        const finishedProjects = items.filter(item => item.status === 'Finished').length;
    
        const calculatedProgress = totalProjects === 0 ? 0 : parseFloat((finishedProjects / totalProjects) * 100).toFixed(2);
        
        setShowProgress(calculatedProgress);

    }, [items]);

    useEffect(() => {
        const totalGrowth = itemsg.length;
        const finishedGrowth = itemsg.filter(item => item.status === 'Finished').length;
    
        const calculatedProgress = totalGrowth === 0 ? 0 : parseFloat((finishedGrowth / totalGrowth) * 100).toFixed(2);
        
        setGrowthProg(calculatedProgress);
    }, [itemsg]);

    const addItem = (id, name, l1, l2, l3) => {
        let addNewItem = {};
        if (l1) {
          addNewItem = { id, name, status: 'Waiting' };
        } else if (l2) {
          addNewItem = { id, name, status: 'Processing' };
        } else if (l3) {
          addNewItem = { id, name, status: 'Finished' };
        }
        const listItems = [...items, addNewItem];
        setItems(listItems);
        localStorage.setItem('project', JSON.stringify(listItems));
    };

    const addItem1 = (id, amount, l1, l2, l3) => {
        let addNewItem = {};
        if (l1) {
          addNewItem = { id, amount, status: 'Waiting' };
        } else if (l2) {
          addNewItem = { id, amount, status: 'Processing' };
        } else if (l3) {
          addNewItem = { id, amount, status: 'Finished' };
        }
        const listItems = [...itemsg, addNewItem];
        setItemsg(listItems);
        localStorage.setItem('growth', JSON.stringify(listItems));
    };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!projects.id || !projects.name) return;
        addItem(projects.id,projects.name,projects.l1,projects.l2,projects.l3);
        setProjects({id:'',name:'',status:''}); 
    };

    const handleSubmitProgress = (e) => {
        e.preventDefault();
        if(!growth.id || !growth.amount) return;
        addItem1(growth.id,growth.amount,growth.l1,growth.l2,growth.l3);
        setGrowth({id:'',amount:'',status:''}); 
    };

    const handleShowp = () => {
        setShowFormp(true);
    }
    const handleShowg = () => {
        setShowFormg(true);
    }

    const handleTimesp = () => {
        setShowFormp(false);
    }
    const handleTimesg = () => {
        setShowFormg(false);
    }

  return (
    <div>
        <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu}/>
        <div className="dashboard-container">
           <div className="dashboards">

            <div className="button-inputs">
                <div className="buttons-for-dashboard">
                    <button className="add-project" onClick={handleShowp}>Add Projects</button>
                    <button className="add-finance" onClick={handleShowg}>Add Finance</button>
                </div>

               <div className="inputs-container-for-all">   
                {showFormp && (<div className="employee-container manager-input">
                    <FontAwesomeIcon  className='fatimes' onClick={handleTimesp} icon={faTimes} />
                    <form onSubmit={handleSubmit}>  
                        <input type='text' placeholder='Project Id' value={projects.id || ''} onChange={(e) => setProjects({...projects,id: e.target.value})}/>
                        <input type='text' placeholder='Project Name'  value={projects.name || ''} onChange={(e) => setProjects({...projects,name: e.target.value})}/>
                        <label>Project Status</label>
                        <div className="radios">
                            <label>
                                Waiting
                                <input type='checkbox' name='projectStatus' checked={projects.l1 || false} onChange={(e) => setProjects({ ...projects, l1: e.target.checked })} />
                            </label>
                            <label>
                                On Going
                                <input type='checkbox' name='projectStatus' checked={projects.l2 || false} onChange={(e) => setProjects({...projects, l2: e.target.checked})}/>
                            </label>
                            <label>
                                Finished
                                <input type='checkbox' name='projectStatus' checked={projects.l3 || false} onChange={(e) => setProjects({...projects, l3: e.target.checked})}/>
                            </label>
                        </div>
                        <button type='submit' className='submit' onClick={handleSubmit}>Submit</button> 
                        </form>
                </div>)}
                </div>

                {/* Progress-Form */}
                <div className="inputs-container-for-all">   
                {showFormg && (<div className="employee-container manager-input">
                    <FontAwesomeIcon  className='fatimes' onClick={handleTimesg} icon={faTimes} />
                    <form onSubmit={handleSubmitProgress}>  
                        <input type='text' placeholder='Amount Id' value={growth.id || ''} onChange={(e) => setGrowth({...growth, id: e.target.value})}/>
                        <input type='text' placeholder='Amount'  value={growth.amount || ''} onChange={(e) => setGrowth({...growth, amount: e.target.value})}/>
                        <label>Project Status</label>
                        <div className="radios">
                            <label>
                                Waiting
                                <input type='checkbox' name='projectStatus' value={growth.l1 || false} onChange={(e) => setGrowth({...growth, l1: e.target.checked})}/>
                            </label>
                            <label>
                                Processing
                                <input type='checkbox' name='projectStatus' value={growth.l2 || false} onChange={(e) => setGrowth({...growth, l2: e.target.checked})}/>
                            </label>
                            <label>
                                Finished
                                <input type='checkbox' name='projectStatus' value={growth.l3 || false} onChange={(e) => setGrowth({...growth, l3: e.target.checked})}/>
                            </label>
                        </div>
                        <button type='submit' className='submit' onClick={handleSubmitProgress}>Submit</button> 
                    </form>
                </div>)} 
                </div>

            </div>

            <div className="dashboard-left-right">        
                <div className="dashboard-left">
                    <div className="project-details">
                        <h3>Projects</h3>
                        <table className='project-table dashboard'>
                            <thead>
                                <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (<tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <p className={`status ${item.status.toLowerCase()}`}>{item.status}</p>
                                </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className="growth-details">
                        <h3>Finance Growth</h3>
                        <table className='project-table'>
                            <thead>
                                <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsg.map((growth) => (<tr key={growth.id}>
                                <td>{growth.id}</td>
                                <td>{growth.amount}</td>
                                <td><p className={`status ${growth.status.toLowerCase()}`}>{growth.status}</p></td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="dashboard-right">
                    <div className="percentage">
                        <div className="outer">
                            <div className="inner">
                            <div id="number">
                                {progress}%
                            </div>
                            </div>
                        </div>

                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width="160px" height="160px">
                            <defs>
                                <linearGradient id="GradientColor">
                                    <stop offset="0%" stopColor='#0008ff' />
                                    <stop offset="100%" stopColor='#ff0066' />
                                </linearGradient>
                            </defs>
                            <circle cx="80" cy="80" r="70" strokeLinecap='round' style={{
                                strokeDasharray: '440', 
                                strokeDashoffset: `calc(440 - (440 * ${progress}) / 100)`,
                                stroke: 'url(#GradientColor)',
                            }}/>
                        </svg>
                        <h3>Projects</h3>
                    </div>

                    <div className="percentage">
                        <div className="outer">
                            <div className="inner">
                            <div id="number">
                                {growthprog}%
                            </div>
                            </div>
                        </div>
                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width="160px" height="160px">
                            <defs>
                                <linearGradient id="GradientColor">
                                    <stop offset="0%" stopColor='#e91e63' />
                                    <stop offset="100%" stopColor='#673ab7' />
                                </linearGradient>
                            </defs>
                            <circle cx="80" cy="80" r="70" strokeLinecap='round' style={{
                                strokeDasharray: '440', 
                                strokeDashoffset: `calc(440 - (440 * ${growthprog}) / 100)`,
                                stroke: 'url(#GradientColor)',
                            }}/>                        
                        </svg>
                        <h3>Finance</h3> 
                    </div>
                    
                </div>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default Dashboard