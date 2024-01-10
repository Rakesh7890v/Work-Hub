import React, {useState, useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import user1 from './images/user1.jpg';
import user2 from './images/user2.jpg';
import user3 from './images/user3.jpg';

const Home = () => {

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        if (password === '' || name === '') {
            setError(true);
        } else if (password === '1234' && name === 'Rakesh') {
           navigate('/manager'); 
           setError(false);
        } else {
            navigate('/employee');
            setError(false);
        }
    }

    const quotes = [
        {
          id: 1,
          user: 'Sangeetha.V',
          text: 'The task notification feature is a productivity boost, keeping me organized. Great job on enhancing the system!',
          image: user1,
        },
        {
          id: 2,
          user: 'Madhavan.V',
          text: 'The intuitive employee directory and customizable themes make navigation seamless and enjoyable. Well done!',
          image: user2,
        },
        {
          id: 3,
          user: 'Vengadesan.V',
          text: 'The new design and quick access links are fantastic workflow. Thank you for the thoughtful improvements!',
          image: user3,
        }
    ];

    const nextQuote = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
          nextQuote();
        }, 2500);
    
        return () => {
          clearInterval(intervalId);
        };
    });
    
    const currentQuote = quotes[currentIndex];

  return (
    <div>
        <div className="home-container">
            <div className="home">
                <div className="quotes-home">
                    <div className="quotes-left">
                        <div className="quotes-top">
                            <h1>Welcome to !...</h1>
                            <p>
                                Our Employee Management System is designed to streamline the process of managing employee information,
                                facilitating communication, and ensuring smooth operations within your organization.
                                Efficiently manage employee records, including personal details, salary, and date of joining.
                            </p>
                        </div>
                        <div className="quotes-middle">
                            <div key={currentQuote.id} className="quote">
                                <div className="quote-top">
                                    <img src={currentQuote.image} alt={`user-face-${currentQuote.id}`} className='users' />
                                    <h2>{currentQuote.user}</h2>
                                </div>
                                <div className="quote-bottom">
                                    <p>{currentQuote.text}</p>
                                </div>
                            </div>
                        </div>
                        <div className="quotes-bottom">
                            <div className="container1">
                                <h2>50,000+</h2>
                                <h6>Employees</h6>
                            </div>
                            <div className="container2">
                                <h2>4,000+</h2>
                                <h6>Users</h6>
                            </div>
                            <div className="container3">
                                <h2>15,000+</h2>
                                <h6>Happy Clients</h6>
                            </div>
                            <div className="container4">
                                <h2>900+</h2>
                                <h6>Industries served</h6>
                            </div>
                        </div>    
                    </div>  
                    <div className="quotes-right">
                        <form onSubmit={handleSubmit}>
                            <h2>Way to 
                                <div className="logo-spans">
                                    <span  className='logo-span1'>W</span>
                                    <span className='logo-span'>O</span>
                                    <span  className='logo-span1'>R</span>
                                    <span className='logo-span'>K</span> &nbsp;
                                    <span  className='logo-span1'>HUB</span>
                                </div>
                            </h2>
                            <input type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type='text' placeholder='Your Pin' value={password} onChange={(e) => setPassword(e.target.value)} />
                            {error && <p>* Enter Required Details</p>}
                            <button type='submit'>Log in</button>
                        </form>
                    </div> 

                </div>
                <div className="start-home"></div>
            </div>
        </div>
    </div>
  )
}

export default Home