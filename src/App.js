
import './App.css';
import Navbar from './components/Navbar';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';

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
    </Routes>
  
    </BrowserRouter>
  </>
 
  );
}

export default App;
