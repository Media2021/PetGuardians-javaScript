import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TokenManager from "../Token/TokenManager";



const Navbar = () => {

  const navigate = useNavigate();

  const [ claims,setClaims] = useState(TokenManager.getClaims());
  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
    navigate("/");
    
}

  return (
    <div className="bg py-2 px-2 mb-8">
    <div className="h-16 px-8 flex items-center justify-between">
      <p className="text-white font-bold">Guardians</p>
      <div className="flex items-center">
        <div className="ml-auto">
          <button className="text-white px-8 font-bold" onClick={() => navigate("/login")}>Login</button>
          <button className="text-white px-8  font-bold" onClick={() => navigate("/addUser")}>Sign up</button>
          <button className="text-white px-8  font-bold" onClick={() => navigate("/")}>Home</button>
          <button className="text-white font-bold" onClick={handleLogout}>Logout</button>

        </div>
      </div>
    </div>
  </div>
  

  
  )
}

export default Navbar