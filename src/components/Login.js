import React, { useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';


const Login = ({user}) => {
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    birthdate: '',
    role: '',
  });
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = loginData;
      const response = await UserService.login(username, password);

      if (response&& response.role === 'USER') {
        setUserData(response);
        setLoginData({
          username: '',
          password: '',
        });
        localStorage.setItem('user', JSON.stringify({ id: response.id }));
        
        navigate(`/profile/${userData.id}`);
      } else if (response && response.role === 'ADMIN') {
        navigate('/admin');

      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.log('Error during login: ', error);
      setErrorMessage('Login failed');
    }
  };

  return (
    <div className="form shadow border-b">
      <div className="px-10 py-10">
        <div className="font-bold text-2xl text-white bg-black text-center">
          <h1> Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="items-center justify-center h-14 w-full my-4">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={loginData.username}
              onChange={(event) =>
                setLoginData({ ...loginData, username: event.target.value })
              }
              required
            />
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button onClick={(e, id) => handleSubmit(e, user.id)} className="rounded text-white font-semibold w-full bg-green-700 hover:bg-gray-700 py-2 px-16">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;