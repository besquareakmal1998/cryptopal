import React, { useState,useEffect } from "react";
import { auth } from "../services/firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



const AuthDetails: React.FC = () => {
    const[authUser,setAuthUser]=useState(null);
    let navigate=useNavigate();
   useEffect(()=>{
    const listen=onAuthStateChanged(auth,(user:any)=>{
        if(user){
            setAuthUser(user);
            navigate("/home"); 
        }else{
            setAuthUser(null);
        }
    });
    return ()=>{
        listen();
    }
   },[]);

   const userSignOut=()=>{
    signOut(auth).then(()=>{
        console.log('sign out successful');
        navigate("/signin")
    }).catch(error=>console.log(error))
   }
return(
    <div>
        {authUser? <><p>{`Signed in as ${authUser}`}</p> <button onClick={userSignOut}>Sign out</button></>:<p></p>}
    </div>
)
}

export default AuthDetails;