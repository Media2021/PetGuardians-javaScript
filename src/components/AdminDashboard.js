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
import TokenManager from "../Token/TokenManager";

const AdminDashboard = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showPetsList, setShowPetsList] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [showAdoptionRequestsList, setShowAdoptionRequestsList] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const refreshRequests = () => {
    setRefreshFlag(!refreshFlag);
  };

  const handleButtonClick1 = () => {
    setShowAddPet(true);
    setShowPetsList(false);
    setShowUsersList(false);
    setShowAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(false);
  };

  const handleButtonClick2 = () => {
    setShowAddPet(false);
    setShowPetsList(true);
    setShowUsersList(false);
    setShowAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(false);
  };

  const handleButtonClick3 = () => {
    setShowAddPet(false);
    setShowPetsList(false);
    setShowUsersList(true);
    setShowAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(false);
  };

  const handleButtonClick4 = () => {
    setShowAddPet(false);
    setShowPetsList(false);
    setShowUsersList(false);
    setShowAdoptionRequestsList(true);
    setShowNotifications(false);
    setShowStatistics(false);
  };

  const handleButtonClick5 = () => {
    setShowAddPet(false);
    setShowPetsList(false);
    setShowUsersList(false);
    setShowAdoptionRequestsList(false);
    setShowNotifications(true);
    setShowStatistics(false);
  };

  const handleButtonClick6 = () => {
    setShowAddPet(false);
    setShowPetsList(false);
    setShowUsersList(false);
    setShowAdoptionRequestsList(false);
    setShowNotifications(false);
    setShowStatistics(true);
  };

  const handleLogout = () => {
    TokenManager.clear();
    setSessionExpired(true);
    // Redirect the user to the login page
    // Replace the 'login' route with the actual route to your login page
    window.location.href = '/login';
  };

  useEffect(() => {
    const checkSessionExpiration = async () => {
      // Check if the session is expired here
      const isSessionExpired = await checkSessionExpiration(); // Replace with your session expiration check logic

      if (isSessionExpired) {
        setSessionExpired(true);
        handleLogout();
      }
    };

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
    checkSessionExpiration();

    const sessionCheckInterval = setInterval(checkSessionExpiration, 60000); // Check session expiration every minute
    return () => clearInterval(sessionCheckInterval);
  }, [id]);

  if (sessionExpired) {
    return (
      <div className='session' style={{ fontSize: '20px' }}>
        Session has expired. Please log in again.
      </div>
    );
  }

  return (
    <div>
      <div className='admin-buttons'>
        <button onClick={handleButtonClick1} className="btn">Add new Pet</button>
        <button onClick={handleButtonClick2} className="btn">Show Pets List</button>
        <button onClick={handleButtonClick3} className="btn">Show Users List</button>
        <button onClick={handleButtonClick4} className="btn">Show Adoption Requests List</button>
        <button onClick={handleButtonClick5} className="btn">Chat</button>
        <button onClick={handleButtonClick6} className="btn">Calculate Statistics</button>
      </div>
      <div>
        {showAddPet && <AddPet />}
        {showPetsList && <PetsList />}
        {showUsersList && <UserList />}
        {showAdoptionRequestsList && <AdoptionList refreshRequests={refreshRequests} />}
        {showNotifications && <Notifications username={userData.username} />}
        {showStatistics && <Statistics />}
      </div>
    </div>
  );
};

export default AdminDashboard;
