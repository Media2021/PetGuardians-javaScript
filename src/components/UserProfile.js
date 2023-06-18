import React, { useEffect, useState } from 'react';
import PetService from '../services/PetService';
import UserService from '../services/UserService';
import EditProfileForm from '../components/EditProfileForm';
import "../style/PetsList.css";
import { useParams } from 'react-router-dom';
import AdoptionRequestService from '../services/AdoptionRequestService';
import Notifications from '../components/WebSocket/Notifications';
import TokenManager from "../Token/TokenManager";
import UserList from './UserList';
import PetsForAdoption from './PetsForAdoption'; // Import the PetsForAdoption component

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPetInfo, setShowPetInfo] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [displayAdoptionRequests, setDisplayAdoptionRequests] = useState(false);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [petId, setPetId] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [storedPetId, setStoredPetId] = useState(localStorage.getItem("selectedPetId"));
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [message, setMessage] = useState("");
  const [showPetsForAdoption, setShowPetsForAdoption] = useState(false); // Add state for showing PetsForAdoption component

  useEffect(() => {
    const fetchSelectedPet = async () => {
      try {
        const response = await PetService.getPetById(petId);
        setSelectedPet(response);
      } catch (error) {
        console.log('Error while fetching pet data: ', error);
      }
    };

    if (petId) {
      fetchSelectedPet();
    }
  }, [petId]);

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
  }, [id]);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await AdoptionRequestService.getAdoptionRequestsByUserId(id);
        setAdoptionRequests(response);
      } catch (error) {
        console.log('Error while fetching adoption requests: ', error);
      }
    };

    if (displayAdoptionRequests) {
      fetchAdoptionRequests();
    }
  }, [id, displayAdoptionRequests]);

  useEffect(() => {
    const storedPetId = localStorage.getItem("selectedPetId");
    setPetId(storedPetId);
  }, []);

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
    setDisplayAdoptionRequests(false);
    setShowPetInfo(false);
    setShowNotifications(false);
  };

  const handlePetInfoButtonClick = () => {
    setShowPetInfo(true);
    setShowNotifications(false);
    setDisplayAdoptionRequests(false);
    setShowEditProfile(false);
    setShowUserProfile(false);
    setShowPetsForAdoption(false); // Hide PetsForAdoption component when clicking Pet Info button
  };

  const handleNotificationsButtonClick = () => {
    setShowPetInfo(false);
    setShowNotifications(true);
    setDisplayAdoptionRequests(false);
    setShowEditProfile(false);
    setShowUserProfile(false);
    setShowPetsForAdoption(false); // Hide PetsForAdoption component when clicking Notifications button
  };

  const handleFormClose = () => {
    setShowEditProfile(false);
  };

  const handleShowAdoptionRequests = () => {
    setDisplayAdoptionRequests(true);
    setShowPetInfo(false);
    setShowNotifications(false);
    setShowEditProfile(false);
    setShowUserProfile(false);
    setShowPetsForAdoption(false); // Hide PetsForAdoption component when clicking Show Adoption Requests button
  };

  const handleShowUserProfile = () => {
    setDisplayAdoptionRequests(false);
    setShowPetInfo(false);
    setShowNotifications(false);
    setShowUserProfile(true);
    setShowPetsForAdoption(false); // Hide PetsForAdoption component when clicking My Profile button
  };

  const handleDeletePetId = () => {
    localStorage.removeItem("selectedPetId");
    setPetId(null);
    setStoredPetId(null);
    setMessage("Request has been deleted");
    window.location.reload();
  };
  
  const handleShowPetsForAdoption = () => {
    setShowPetInfo(false);
    setShowNotifications(false);
    setDisplayAdoptionRequests(false);
    setShowEditProfile(false);
    setShowUserProfile(false);
    setShowPetsForAdoption(true); // Show PetsForAdoption component when clicking the new button
  };

  const handleSendRequest = async () => {
    if (selectedPet) {
      const request = {
        user: { id: id },
        pet: { id: selectedPet.id },
        status: 'PENDING',
        notes: '',
        requestDate: new Date().toISOString(),
      };

      try {
        const token = TokenManager.getAccessToken();
        const response = await AdoptionRequestService.createAdoptionRequest(request, token);
        console.log('Adoption request created successfully: ', response);
        setMessage("Request has been sent.");
        localStorage.removeItem("selectedPetId");
        setPetId(null);
        setStoredPetId(null);
        
      } catch (error) {
        console.log('Error while creating adoption request: ', error);
        setMessage("Error while creating adoption request.");
      }
    }
  };

  if (!userData) {
    return (
      <div className='session' style={{ fontSize: '20px' }}>
        Session has expired. You need to log in again...
      </div>
    );
  }

  const formattedBirthdate = new Date(userData.birthdate).toLocaleDateString();

  return (
    <div>
      <div className="buttons px-18 user-buttons">
        {/* <button
          onClick={handlePetInfoButtonClick}
          className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8 mt-4"
        >
          Pet Information
        </button> */}
        <button
          onClick={handleShowAdoptionRequests}
          className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8 mt-4"
        >
          Show my Adoption Requests
        </button>
        <button
          onClick={handleNotificationsButtonClick}
          className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8 mt-4 mx-2"
        >
          Chat
        </button>
        <button
          onClick={handleShowUserProfile}
          className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8 mt-4"
        >
          My Profile
        </button>
        <button
          onClick={handleShowPetsForAdoption}
          className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8 mt-4"
        >
         Available  Pets for Adoption
        </button>
      </div>

      {showNotifications && (
        <div className="notification" style={{ marginTop: '30px' }}>
          <Notifications username={userData.username} />
        </div>
      )}

      {showUserProfile && (
        <div className="user-profile-info" style={{ marginTop: '30px' }}>
          <h3 className="text-lg font-bold">Hello {userData.username}</h3>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address}</p>
          <p>Phone: {userData.phone}</p>
          <p>Birthdate: {formattedBirthdate}</p>
          {userData.adoptedPets && (
            <p>Adopted Pets: {userData.adoptedPets.map((pet) => pet.name).join(', ')}</p>
          )}
          <div className="buttons px-18">
            <button
              onClick={handleEditProfileClick}
              className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {displayAdoptionRequests && (
        <div className="requests" style={{ marginTop: '30px' }}>
          <h3 className="text-lg font-bold">My Adoption Requests</h3>
          {adoptionRequests.length === 0 ? (
            <p>No adoption requests found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Request User</th>
                  <th>Request Pet Name</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Request Date</th>
                </tr>
              </thead>
              <tbody>
                {adoptionRequests.map((request) => (
                  <tr className="center-align" key={request.id}>
                    <td>{request.user.username ? request.user.username : 'Unknown'}</td>
                    <td>{request.pet ? request.pet.name : 'Unknown'}</td>
                    <td>{request.status}</td>
                    <td>{request.notes}</td>
                    <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {showPetInfo && selectedPet && (
        <div className="pet-card" style={{ marginTop: '30px' }}>
          <h3 className="text-lg font-bold">Pet Information</h3>
          <p>Pet ID: {selectedPet.id}</p>
          <p>Name: {selectedPet.name}</p>
          <p>Age: {selectedPet.age}</p>
          <p>Status: {selectedPet.status}</p>
          <p>Type: {selectedPet.type}</p>
          {selectedPet.description && <p>Description: {selectedPet.description}</p>}
          <div className="buttons px-18">
            <button
              onClick={handleSendRequest}
              className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8 mt-3 mb-1"
            >
              Send Request
            </button>
            <button
              onClick={handleDeletePetId}
              className="rounded text-white font-semibold bg-red-700 hover:bg-gray-500 py-1 px-4 ml-2"
            >
              Cancel Request
            </button>
            {message && <p className="text-center bg-white text-black">{message}</p>}
          </div>
        </div>
      )}

      {showEditProfile && (
        <div className="edit-profile-form" style={{ marginTop: '30px' }}>
          <h3 className="text-lg font-bold">Edit Profile</h3>
          <EditProfileForm
            userId={id}
            userData={userData}
            onClose={handleFormClose}
            username={userData.username}
            firstName={userData.firstName}
            lastName={userData.lastName}
            email={userData.email}
            address={userData.address}
            phone={userData.phone}
            birthdate={userData.birthdate}
            handleFormClose={handleFormClose}
            
          />
        </div>
      )}

      {showPetsForAdoption && (
        <div className="pets-for-adoption" style={{ marginTop: '30px' }}>
          <PetsForAdoption userData={userData} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
