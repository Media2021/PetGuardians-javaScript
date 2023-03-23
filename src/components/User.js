import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ user, deleteUser }) => {
  const navigate = useNavigate();
  const editUser = (e, id) => {
    e.preventDefault();
    navigate(`/editUser/${id}`);
  };

  return (
    <tr key={user.id} className="tr">
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.firstName}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.lastName}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.userName}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.address}</div>
      </td>
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.phone}</div>
      </td>
    
    
      <td className="text-left px-2 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.birthdate}</div>
      </td>
      <td className="text-right px-4 py-4 whitespace-nowrap font-medium text-sm">
        <button   onClick={(e, id) => editUser(e, user.id)}
          className="text-green-600 hover:text-black px-4 hover:cursor-pointer"
          >Edit</button>
        
      
        <button   onClick={(e, id) => deleteUser(e, user.id)}
          className="text-red-600 hover:text-black px-4 hover:cursor-pointer"
          >Delete</button>
      </td>
    </tr>
  );
};

export default  User;