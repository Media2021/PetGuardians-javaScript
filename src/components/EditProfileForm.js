import React, { useState } from 'react';
import UserService from '../services/UserService';
import "../style/EditProfileForm.css";

const EditProfileForm = ({ userData,onClose}) => {
  const [formData, setFormData] = useState({
    username:userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    address: userData.address,
    phone: userData.phone,
//    adoptedPets:userData.adoptedPets,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await UserService.updateUser(userData.id, formData);
      console.log('User data updated successfully:', response);
    } catch (error) {
      console.log('Error while updating user data: ', error);
    }
  };
  const handleCancel = () => {
    onClose(); // Call the onClose function to close the form
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
           <label htmlFor="firstName">Username :</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username }
        onChange={handleChange}
        required
      />
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      {/* <label htmlFor="adoptedPets">My pets:</label>
      <input
        type="text"
        id="adoptedPets"
        name="adoptedPets"
        value={formData.adoptedPets}
        onChange={handleChange}
        required
      /> */}

      <div className="buttons">
        <button
          type="submit"
          className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-8 mr-2 mt-4"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded text-white font-semibold bg-red-700 hover:bg-gray-500 py-1 px-4 mr-2 mt-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
