import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../services/UserService'
import User from "./User";

const UserList = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await UserService.getUsers();
          setUsers(response.data);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);

    const deleteUser= (e, id) => {
        e.preventDefault();
        UserService.deleteEmployee(id).then((res) => {
          if (users) {
            setUsers((prevElement) => {
              return prevElement.filter((user) => user.id !== id);
            });
          }
        });
      };


  return (
    <div className="container mx-auto my-4">
     <div className="h-12 px-2">
        <button onClick={() => navigate("/addUser")} className='rounder bg-slate-600 text-white  px-6 py-2'  >Add user</button>
    </div>
    <div className='flex shadow 'style={{ height: "400px", overflowY: "scroll" }}>
        <table className='min-w-40%' >
            <thead className='bg-gray-50'>
                <tr>
                    <th className='text-left font-medium  uppercase  py-3 px-2'>first name </th>
                    <th className='text-left font-medium uppercase  py-3 px-2'>last name </th>
                    <th className='text-left font-medium uppercase  py-3 px-2'>username </th>
                    <th className='text-left font-medium uppercase  py-3 px-2'>email</th>
                    <th className='text-left font-medium uppercase  py-3 px-2'>address</th>
                    <th className='text-left font-medium uppercase  py-3 px-2'>phone number </th>
                    <th className='text-left font-medium uppercase  py-3 px-2'>birthdate</th>
                    <th className='text-right font-medium uppercase  py-3 px-2'>Actions</th>

                </tr>
            </thead>
            {!loading && (
            <tbody className="bg-white">
              {users.map((user) => (
                <User
                  user={user}
                  deleteUser={deleteUser}
                  key={user.id}></User>
              ))}
            </tbody>
          )}
        </table>

    </div>
    </div>
  )
}

export default UserList