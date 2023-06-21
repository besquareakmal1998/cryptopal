import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Container } from 'react-bootstrap';
import React, { useState,useEffect } from "react";
import { auth } from "../services/firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Features  from '../Pages/Features';

const NavBar: React.FC =() =>{
    let navigate=useNavigate();
    const userSignOut=()=>{
        signOut(auth).then(()=>{
            console.log('sign out successful');
            navigate("/")
        }).catch(error=>console.log(error))
       }

return(
    <nav className="navbar">
      <div className="container">
        <div className="logo">
         
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/features">Features</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus">About</NavLink>
            </li>
            <li>
              <NavLink to="/help">Contact us</NavLink>
            </li>

           
          </ul>
          
        </div>
        <button onClick={userSignOut}>Sign out</button>
      </div>
    </nav>
)
}

export default NavBar;