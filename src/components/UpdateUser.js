import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserService from "../services/UserService";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id:id,
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
    address:"",
    password:"",
    phone:"",
    birthdate:"",
    role:"USER"
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(user.id);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.id]);

  // const updateUser = (e) => {
  //   e.preventDefault();
  //   console.log(user);
  //   UserService.updateUser(user, id)
  //     .then((response) => {
  //       navigate("/UserList");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="form  max-w-2xl mx-auto shadow border-b ">
      <div className="px-8 py-8">
        <div className="font-bold text-2xl bg-black text-white text-center ">
          <h1> Update profile</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder=' first name'
            value={user.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black  text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder=' last name'
            value={user.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black  text-sm font-normal">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder=' username'
            value={user.username}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black  text-sm font-normal">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder=' email'
            value={user.email}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black  text-sm font-normal">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder=' address'
            value={user.address}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        {/* <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black  text-sm font-normal">
            Password
          </label>
          <input
            type="number"
            name="password"
            placeholder=' password'
            value={user.password}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div> */}
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black  text-sm font-normal">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            placeholder=' phone number'
            value={user.phone}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-black  text-sm font-normal">
            Birthdate
          </label>
          <input
            type="date"
            name="birthdate"
            value={user.birthdate}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            // onClick={updateUser}
            className="rounded text-white font-semibold  bg-green-700 hover:bg-gray-700 py-2 px-6">
            Update
          </button>
          <button
            onClick={() => navigate("/UserList")}
            className="rounded text-white font-semibold bg-red-700 hover:bg-gray-700 py-2 px-6">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateUser