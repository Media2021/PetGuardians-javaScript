import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ user, deleteUser }) => {
  // const navigate = useNavigate();
  // const editUser = (e, id) => {
  //   e.preventDefault();
  //   navigate(`/editUser/${id}`);
  // };
  const petNames = user.adoptedPets ? user.adoptedPets.map((pet) => pet.name).join(", ") : "";

  const formattedBirthdate = new Date(user.birthdate).toLocaleDateString();
  return (
    <tr key={user.id} className="tr">
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm bg-white text-black text-center">{user.firstName}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm bg-white text-black text-center">{user.lastName}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm bg-white text-black text-center">{user.username}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm bg-white text-black text-center">{user.email}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm bg-white text-black text-center">{user.address}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm bg-white text-black text-center">{user.phone}</div>
      </td>
    
    
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm bg-white text-black text-center">{formattedBirthdate}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
      <div className="text-sm bg-white text-black text-center">
      {petNames}
        </div>
      </td>
      {/* <td className="text-right px-4 py-4 whitespace-nowrap font-medium text-sm">
        <button   onClick={(e, id) => editUser(e, user.id)}
          className="text-green-600  bg-white hover:text-black px-4 hover:cursor-pointer"
          >Edit</button>
        <button   onClick={(e, id) => deleteUser(e, user.id)}
          className="text-red-600  bg-white hover:text-black px-4 hover:cursor-pointer"
          >Delete</button>
    </td> */}
    </tr>
  );
};

export default  User;