import React, { useState } from 'react';
import AddPet from './AddPet';
import PetsList from './PetsList';
import "../style/AdminDash.css";



function AdminDashboard() {


 const [showAddPet, setShowAddPet] = useState(false);
  const [showPetsList , setShowPetsList ] = useState(false);

  const handleButtonClick1 = () => {
    setShowAddPet(true);
    setShowPetsList (false);
  };

  const handleButtonClick2 = () => {
    setShowAddPet(false);
    setShowPetsList (true);
  };

  return (
    <div >
      <h1 className='text-3xl '>Admin Dashboard</h1>
      <button onClick={handleButtonClick1}className="btn">Add new Pet</button>
      <button onClick={handleButtonClick2}className="btn">Show Pets  List </button>
      {showAddPet && <AddPet />}
      {showPetsList  && <PetsList  />}
    </div>
  );
}

export default AdminDashboard