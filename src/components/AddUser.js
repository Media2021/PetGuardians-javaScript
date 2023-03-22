import React, { useState } from 'react'
import UserService from '../services/UserService'
import { useForm } from 'react-hook-form';



const AddUser = () => {
  const { register,handleSubmit,  formState: { errors } } = useForm();
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
  
  console.log(user);
  UserService.saveUser(user).then((response)=>
  {
    console.log(response);

  }).catch((error)=>
  {
    console.log(error);
  })
}
const reset = (e) => {
  e.preventDefault();
  setUser({
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
  });
};
  return (
    
    <div className="form  shadow border-b">
    <div className="px-10 py-10 ">
      <div className="font-bold text-4xl ">
            <h1> Sign up</h1>
           </div> 
      <form onSubmit={handleSubmit(saveUser)}>
{/* <label className='block text-black text-sm font-normal'>First name</label> */}
<div className="items-center justify-center h-12 w-full my-4">

<input type="text"
{...register("firstName", { required : true })} 
placeholder=' first name'
name='firstName'
value={user.firstName}
onChange={(e)=> handleChange(e)}/>
  {/* {errors.firstName?.type === "required" && "username is required" } */}
  {errors.firstName && <span className="text-red-500">First name is required</span>}
</div>

{/* <label className='block text-black text-sm font-normal'>Last name</label> */}
<div className="items-center justify-center h-14 w-full my-4">
<input  type="text"
{...register("lastName", { required : true })} 
placeholder=' last name'
name='lastName'
value={user.lastName}
onChange={(e)=> handleChange(e)}></input>
 {errors.lastName && <span className="text-red-500">last  name is required</span>}
</div>

{/* <label className='block text-black text-sm font-normal'>User name</label> */}
<div className="items-center justify-center h-14 w-full my-4">

<input  type="text"
{...register("userName", { required : true })} 
placeholder=' username'
name='userName'
value={user.userName}
onChange={(e)=> handleChange(e)}></input>
 {errors.userName && <span className="text-red-500">username is required</span>}

</div>
{/* <label className='block text-black text-sm font-normal'>Email</label> */}
<div className="items-center justify-center h-14 w-full my-4">

<input type="text"
{...register("email", { required : true })} 
placeholder=' email'
name='email'
value={user.email}
onChange={(e)=> handleChange(e)}></input>
 {errors.email && <span className="text-red-500">email is required</span>}
</div>

{/* <label className='block text-black text-sm font-normal'>Address</label> */}

<div className="items-center justify-center h-14 w-full my-4">
<input  type="text"
{...register("address", { required : true })} 
placeholder=' address'
name='address'
value={user.address}
onChange={(e)=> handleChange(e)}></input>
 {errors.address && <span className="text-red-500">address is required</span>}
</div>

{/* <label className='block text-black text-sm font-normal'>Password</label> */}
<div className="items-center justify-center h-14 w-full my-4">
<input  type="password"

{...register("password", { required : true, minLength: 4, maxLength:8 })}
placeholder=' password'
name='password'
value={user.password}
onChange={(e)=> handleChange(e)}></input>
 {errors.password && <span className="text-red-500">minimum password length  is 4 character</span>}

</div>
{/* <label className='block text-black text-sm font-normal'>Phone</label> */}

<div className="items-center justify-center h-14 w-full my-4">
<input type="number"
{...register("phone", { required : true, minLength: 9, maxLength:10 })}
placeholder=' phone number'
name='phone'
value={user.phone}
onChange={(e)=> handleChange(e)}></input>
 {errors.phone && <span className="text-red-500"> phone number is exactly 10 digits</span>}
</div>


{/* <label className='block text-black text-sm font-normal'>Birthdate</label> */}

<div className="items-center justify-center h-14 w-full my-4">
<input  type="date"

{...register("birthdate", { required : true})}


name='birthdate'
value={user.birthdate}
onChange={(e)=> handleChange(e)}></input>
 {errors.birthdate && <span className="text-red-500">date should be in the past</span>}

</div>
  
<div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
<button type='submit' className="rounded text-white font-semibold bg-green-700 hover:bg-gray-700 py-2 px-6">Save</button>
<button className="rounded text-white font-semibold bg-red-700 hover:bg-gray-700 py-2 px-6" onClick={reset}>Delete</button>
</div>
</form>
</div>
 </div>
    


   
  );
};

export default AddUser