
import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';

import AddUser from './components/AddUser';


function App() {


  
  return (
    <>
      <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/addUser' element={<AddUser/>}/>
      <Route path='/editUser/:id' element={<UpdateUser/>}/>
      <Route path='/profile/:id' element={<UserProfile/>}/>
      <Route path='/admin/:id' element={<AdminDashboard/>}/>
      
    </Routes>
  
    </BrowserRouter>
  </>
 
  );
}

export default App;
