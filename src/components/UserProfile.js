import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import UserService from '../services/UserService';
import EditProfileForm from '../components/EditProfileForm';
import "../style/PetsList.css";





const UserProfile= () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);


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

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  }


  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex justify-center flex-wrap">
      <div className="pet-card">
        <h3 className="text-lg font-bold">Hello {userData.username}</h3>
      
        <p>First Name: {userData.firstName}</p>
        <p>Last Name: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Address: {userData.address}</p>
        <p>Phone: {userData.phone}</p>
        <p>Birthdate: {userData.birthdate}</p>
        {userData.adoptedPets && (
          <p>Pets: {userData.adoptedPets.map((pet) => pet.name).join(', ')}</p>
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
      {showEditProfile && <EditProfileForm  userData={userData} />}
    </div>
  );
};



export default UserProfile