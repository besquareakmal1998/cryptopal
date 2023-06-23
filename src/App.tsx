import * as React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SignUp from '../src/Components/SignUp';
import Home from '../src/Pages/Home'
import Help from '../src/Pages/Help';
import AboutUs from '../src/Pages/AboutUs';
import NavBar from '../src/Components/Navigationbar';
import SignIn from '../src/Components/SignIn';
import Consolepage from '../src/Pages/Consolepage';
import { Container } from 'react-bootstrap';
import RealTimeChart from '../src/Components/Realtimechart';
import Features from '../src/Pages/Features';


const App: React.FC =() => {

  return (
    <>

    <Routes>
          <Route path="/" element={<Consolepage />} />
    </Routes>
    
     {/* <NavBar />  */}
    <Routes>
     <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/features" element={<Features />} />

    </Routes>

  
  </>
   
  );
}

export default App;
