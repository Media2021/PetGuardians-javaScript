
import './App.css';
import Navbar from './components/Navbar';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route index element={<UserList/>}/>
      <Route path='/' element={<UserList/>}></Route>
      <Route path='/userList' element={<UserList/>}/>
      <Route path='/addUser' element={<AddUser/>}/>
      <Route path='/editUser/:id' element={<UpdateUser/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
    </Routes>
  
    </BrowserRouter>
  </>
 
  );
}

export default App;
