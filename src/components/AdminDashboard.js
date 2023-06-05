import React, { useEffect, useState } from 'react';
import AddPet from './AddPet';
import PetsList from './PetsList';
import "../style/AdminDash.css";
import { useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import UserList from './UserList';
import AdoptionList from './AdoptionList';
import Notifications from '../components/WebSocket/Notifications';
import Statistics from './Statistics';



const AdminDashboard = () =>{
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
 const [showAddPet, setShowAddPet] = useState(false);
  const [showPetsList , setShowPetsList ] = useState(false);
 const [showUsersList, setShowUsersList] = useState(false);
 const [showAdoptionRequestsList, setAdoptionRequestsList] = useState(false);
 const [showNotifications, setShowNotifications] = useState(false);
 const [refreshFlag, setRefreshFlag] = useState(false);
 const [showStatistics, setShowStatistics] = useState(false);

 const refreshRequests = () => {
  setRefreshFlag(!refreshFlag); 
};

  const handleButtonClick1 = () => {
    setShowAddPet(true);
    setShowPetsList (false);
    setShowUsersList(false);
    setAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(false);
  };

  const handleButtonClick2 = () => {
    setShowAddPet(false);
    setShowPetsList (true);
    setShowUsersList(false);
    setAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(false);
  };

  const handleButtonClick3 = () => {
    setShowAddPet(false);
    setShowPetsList (false);
    setShowUsersList(true);
    setAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(false);
  };
  
  const handleButtonClick4 = () => {
    setShowAddPet(false);
    setShowPetsList (false);
    setShowUsersList(false);
    setAdoptionRequestsList(true);
    setShowNotifications(false);
    setShowStatistics(false);
  };
   
  const handleButtonClick5 = () => {
    setShowAddPet(false);
    setShowPetsList (false);
    setShowUsersList(false);
    setAdoptionRequestsList(false);
    setShowNotifications(true);
    setShowStatistics(false);
  };
  const handleButtonClick6 = () => {
    setShowAddPet(false);
    setShowPetsList(false);
    setShowUsersList(false);
    setAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(true);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(id);
        localStorage.setItem("username", response.username); 
        setUserData(response);
      } catch (error) {
        console.log('Error while fetching user data: ', error);
      }
    };
    fetchData();
  }, [id, refreshFlag]);
 
  return (
    <div >
      <h1 className='text-3xl '>Admin Dashboard</h1>
      <button onClick={handleButtonClick1}className="btn">Add new Pet</button>
      <button onClick={handleButtonClick2}className="btn">Show Pets  List </button>
      <button onClick={handleButtonClick3}className="btn">Show Users List </button>
      <button onClick={handleButtonClick4}className="btn">Show Adoption Requests List </button>
      <button onClick={handleButtonClick5}className="btn">Notifications </button>
      <button onClick={handleButtonClick6} className="btn">Calculate  Statistics</button>

     
      {showAddPet && <AddPet />}
      {showPetsList  && <PetsList  />}
      {showUsersList  && <UserList  />}
      {showAdoptionRequestsList && <AdoptionList refreshRequests={refreshRequests} />}
      {showNotifications && <Notifications username={userData.username}/>}
      {showStatistics && <Statistics />}

     
    </div>
    
  );
}

export default AdminDashboard