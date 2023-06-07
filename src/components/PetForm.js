import React, { useState } from "react";

function PetForm({ pet, onCancel, onUpdate }) {
  const [updatedPet, setUpdatedPet] = useState({ ...pet });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedPet);
  };

  return (
    <div className="form  box-shadow: 0 4px 18px rgba(6, 6, 6, 0.8); mt-12" style={{ backgroundColor: "antiquewhite", border: "1px solid #ddd", borderRadius: "8px" }}>
      
      <form  className="px-10 py-8 mt-1 " onSubmit={handleSubmit}>
       <div className="items-center justify-center h-12 w-full my-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedPet.name}
            onChange={handleChange}
          />
        </div>
         <div className="items-center justify-center h-14 w-full my-4">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={updatedPet.age}
            onChange={handleChange}
          />
        </div>
         <div className="items-center justify-center h-14 w-full my-4">
          <label>Description:</label>
          <textarea
            name="description"
            value={updatedPet.description}
            onChange={handleChange}
          />
        </div>
      
        <div className="items-center justify-center h-14 w-full my-4">
          <label>Status:</label>
          <select
            name="status"
            value={updatedPet.status}
            onChange={handleChange}
          >
            <option value="{updatedPet.status}">Select Status</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="ADOPTED">ADOPTED</option>
            <option value="DECLINED">DECLINED</option>
            <option value="AVAILABLE">AVAILABLE</option>

          </select>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label>Gender:</label>
          <select
            name="gender"
            value={updatedPet.gender}
            onChange={handleChange}
          >
            <option value="{updatedPet.gender}">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        <button type="submit" className="rounded text-white font-semibold bg-green-700 hover:bg-gray-700 py-2 px-6 items-center justify-center h-14  my-4 space-x-4 pt-4 mr-2">Update</button>
        <button onClick={onCancel} className="rounded text-white font-semibold bg-red-700 hover:bg-gray-700 py-2 px-6 items-center justify-center h-14  my-4 space-x-4 pt-4">Cancel</button>
     
     
      </form>
    </div>
  );
}

export default PetForm;
