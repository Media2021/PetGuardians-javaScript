import React, { useEffect, useState } from 'react';
import PetService from '../services/PetService';
import UserService from '../services/UserService';
import EditProfileForm from '../components/EditProfileForm';
import "../style/PetsList.css";
import { useParams } from 'react-router-dom';
import AdoptionRequestService from '../services/AdoptionRequestService';




const UserProfile= () => {
  const { id ,petId } = useParams();
  const [userData, setUserData] = useState(null);
  const [petData, setPetData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [message, setMessage] = useState('');


  

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

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await PetService.getPetById(petId);
        setPetData(response);
      } catch (error) {
        console.log('Error while fetching pet data: ', error);
      }
    };

    if (petId) {
      fetchPetData();
    }
  }, [petId]);

  const handlePetButtonClicked = () => {
    // Assuming petId is defined and contains the pet ID
    const request = {
      id: null, // The server will generate the ID
      user: { id: userData.id }, // Include the user ID in the user object
      pet: { id: petData.id }, // Include the pet ID in the pet object
      status: 'PENDING', // Set the initial status
      notes: 'in progress', // Include any additional notes if necessary
      requestDate: new Date().toISOString(), 
    };
  
    AdoptionRequestService.createAdoptionRequest(request)
      .then(response => {
        setMessage('Adoption request has been  sent!');
      })
      .catch(error => {
        // Error occurred while sending the adoption request
        console.log('Error while sending adoption request:', error);
      });
  };
  

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  }


  if (!userData) {
    return <div>Loading...</div>;
  }
  const handleFormClose = () => {
    setShowEditProfile(false);
  };

  const formattedBirthdate = new Date(userData.birthdate).toLocaleDateString();
  return (
    <div className="flex justify-center flex-wrap">
      <div className="pet-card">
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
          <button className="rounded text-white font-semibold bg-red-700 hover:bg-gray-500 py-1 px-4 mr-2 mt-4 ">
            Delete Account
          </button>
          <button onClick={handleEditProfileClick} className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8">
            Edit Profile
          </button>
        </div>
      </div>
      {showEditProfile && <EditProfileForm  userData={userData} onClose={handleFormClose}/>}

    {petData && (
      <div className="pet-card">
        <h3 className="text-lg font-bold">Pet Information</h3>
        <p>Name: {petData.name}</p>
        <p>Age: {petData.age}</p>
        <p>Gender: {petData.gender}</p>
        <p>Status: {petData.status}</p>
        <p>Type: {petData.type}</p>
        <button
      className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-2 px-8"
      onClick={ handlePetButtonClicked}
    >
      Adopt
    </button>
    {message && <p>{message}</p>}
      </div>
    )}
  </div>
  );
};



export default UserProfile