import React, { useState } from 'react'
import UserService from './services/UserService';
import { useForm } from 'react-hook-form';
import bgImg from '../assets/pet.jpg';


const AddUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState({
    id:"",
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
    address:"",
    password:"",
    phone:"",
    birthdate:"",
    role:"User"
  })

  const handleChange = (e) =>{
    const value = e.target.value;
    setUser({...user, [e.target.name]:value})

  }
const saveUser = (e)=>{
  e.preventDefault();
  console.log(user);
  UserService.saveUser(user).then((response)=>
  {
    console.log(response);

  }).catch((error)=>
  {
    console.log(error);
  })
}
// const onSubmit = (data) => {
//   setUser(data);
//   console.log(data);
// };
  return (
    <section className="section">
    <div className="register">
        <div className="col-1">
            <h1> Add New User</h1>
            <form id='form' className='flex flex-col' onSubmit={handleSubmit(saveUser)}>
      
{/* <label className='block text-black text-sm font-normal'>First name</label> */}
<input type="text"
{...register("firstName", { required : true })} 
placeholder='first name'
name='firstName'
value={user.firstName}
onChange={(e)=> handleChange(e)}/>
  {/* {errors.firstName?.type === "required" && "username is required" } */}
  {errors.firstName && <span className="text-red-500">First name is required</span>}


{/* <label className='block text-black text-sm font-normal'>Last name</label> */}
<input  type="text"
{...register("lastName", { required : true })} 
placeholder='last name'
name='lastName'
value={user.lastName}
onChange={(e)=> handleChange(e)}></input>
 {errors.lastName && <span className="text-red-500">last  name is required</span>}


{/* <label className='block text-black text-sm font-normal'>User name</label> */}
<input  type="text"
{...register("userName", { required : true })} 
placeholder='username'
name='userName'
value={user.userName}
onChange={(e)=> handleChange(e)}></input>
 {errors.userName && <span className="text-red-500">username is required</span>}


{/* <label className='block text-black text-sm font-normal'>Email</label> */}
<input type="text"
{...register("email", { required : true })} 
placeholder='email'
name='email'
value={user.email}
onChange={(e)=> handleChange(e)}></input>
 {errors.email && <span className="text-red-500">email is required</span>}


{/* <label className='block text-black text-sm font-normal'>Address</label> */}
<input  type="text"
{...register("address", { required : true })} 
placeholder='address'
name='address'
value={user.address}
onChange={(e)=> handleChange(e)}></input>
 {errors.firstName && <span className="text-red-500">address is required</span>}


{/* <label className='block text-black text-sm font-normal'>Password</label> */}
<input  type="text"
{...register("password", { required : true, minLength: 4, maxLength:8 })}
placeholder='password'
name='password'
value={user.password}
onChange={(e)=> handleChange(e)}></input>
 {errors.firstName && <span className="text-red-500">minimum password length  is 4 digits and maximum is 8 digits</span>}


{/* <label className='block text-black text-sm font-normal'>Phone</label> */}
<input type="text"
{...register("phone", { required : true, minLength: 10, maxLength:10 })}
placeholder='phone number'
name='phone'
value={user.phone}
onChange={(e)=> handleChange(e)}></input>
 {errors.firstName && <span className="text-red-500"> phone number is exactly 10 digits</span>}



{/* <label className='block text-black text-sm font-normal'>Birthdate</label> */}
<input  type="text"

{...register("birthdate", { required : true})}
placeholder='birthdate'
name='birthdate'
value={user.birthdate}
onChange={(e)=> handleChange(e)}></input>
 {errors.firstName && <span className="text-red-500">in format yyy-mmm-ddd</span>}


  

<button type='submit' className='btn'>Save</button>
<button className='btn'>Delete</button>

</form>

</div>
        <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
   </div>
    </section>
  );
};

export default AddUser