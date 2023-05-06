import React, { useEffect, useState } from 'react';
import AddPet from './AddPet';
import PetsList from './PetsList';
import "../style/AdminDash.css";
import { useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import UserList from './UserList';




const AdminDashboard = () =>{
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
 const [showAddPet, setShowAddPet] = useState(false);
  const [showPetsList , setShowPetsList ] = useState(false);
 const [showUsersList, setShowUsersList] = useState(false);


  const handleButtonClick1 = () => {
    setShowAddPet(true);
    setShowPetsList (false);
    setShowUsersList(false);
  };

  const handleButtonClick2 = () => {
    setShowAddPet(false);
    setShowPetsList (true);
    setShowUsersList(false);
  };

  const handleButtonClick3 = () => {
    setShowAddPet(false);
    setShowPetsList (false);
    setShowUsersList(true);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(id);
        setUserData(response);
      } catch (error) {
        console.log('Error while fetching user data: ', error);
      }
    };
    fetchData();
  }, [id]);
 
  return (
    <div >
      <h1 className='text-3xl '>Admin Dashboard</h1>
      <button onClick={handleButtonClick1}className="btn">Add new Pet</button>
      <button onClick={handleButtonClick2}className="btn">Show Pets  List </button>
      <button onClick={handleButtonClick3}className="btn">Show Users List </button>
      {showAddPet && <AddPet />}
      {showPetsList  && <PetsList  />}
      {showUsersList  && <UserList  />}
    </div>
  );
}

export default AdminDashboard