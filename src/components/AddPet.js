import React, { useState } from 'react'
import PetService from '../services/PetService'
import { useForm } from 'react-hook-form';
import TokenManager from '../Token/TokenManager';




function AddPet() {
  
    const { register,handleSubmit,  formState: { errors } } = useForm();
    const [pet, setPet] = useState({
        id:"",
        name:"",
        age:"",
        description:"",
        type:"",
        status:"",
        gender:"",
       

      })
      const [message, setMessage] = useState("");


      const handleChange = (e) =>{
        const value = e.target.value;
        setPet({...pet, [e.target.name]:value})
    
      }
      const savePet = (e)=>{
  
        console.log(pet);
        const token = TokenManager.getAccessToken();
        PetService.savePet(pet, token).then((response)=>
        {
          console.log(response);
          setMessage("Pet saved successfully!");
      
        }).catch((error)=>
        {
          console.log(error);
        })
      }
      const reset = (e) => {
        e.preventDefault();
        setPet({
            id:"",
            name:"",
            age:"",
            description:"",
            type:"",
            status:"",
            gender:""
        });
      };
    


    return (
        <div className="form  shadow-black border-b ">
        <div className="px-10 py-10 ">
          <div className="font-bold text-2xl text-white bg-black text-center">
                <h1> Add new pet</h1>
               </div> 
          <form onSubmit={handleSubmit( savePet)}>
   
    <div className="items-center justify-center h-12 w-full my-4">
    
    <input type="text"
    {...register("name", { required : true })} 
    placeholder=' name'
    name='name'
    value={pet.name}
    onChange={(e)=> handleChange(e)}/>
    
      {errors.name&& <span className="text-red-500">  name is required</span>}
    </div>
    
    
    <div className="items-center justify-center h-14 w-full my-4">
    <input  type="number"
    {...register("age", { required : true })} 
    placeholder=' age'
    name='age'
    value={pet.age}
    onChange={(e)=> handleChange(e)}></input>
     {errors.age && <span className="text-red-500"> age is required</span>}
    </div>
    
   
    <div className="items-center justify-center h-14 w-full my-4">
    
    <input  type="text"
    {...register("description", { required : true })} 
    placeholder=' description'
    name='description'
    value={pet.description}
    onChange={(e)=> handleChange(e)}></input>
     {errors.description && <span className="text-red-500"> description is required</span>}
    
    </div>
    
    <div className="items-center justify-center h-14 w-full my-4">
  <select
    {...register("type", { required: true })}
    name="type"
    value={pet.type}
    onChange={(e) => handleChange(e)}
  >
    <option value="">Select a type</option>
    <option value="DOG">DOG</option>
    <option value="CAT">CAT</option>
    
  </select>
  {errors.type && <span className="text-red-500">Type is required</span>}
</div>

    
   
<div className="items-center justify-center h-14 w-full my-4">
  <select
    {...register("status", { required : true })}
    name='status'
    value={pet.status}
    onChange={(e)=> handleChange(e)}
  >
    <option value="">Select status</option>
    <option value="AVAILABLE">AVAILABLE</option>
    <option value="PENDING">PENDINGg</option>
    <option value="ADOPTED">ADOPTED</option>
  </select>
  {errors.status && <span className="text-red-500">Status is required</span>}
</div>

    
    
<div className="items-center justify-center h-14 w-full my-4">
  <select
    {...register("gender", { required : true })}
    name="gender"
    value={pet.gender}
    onChange={(e) => handleChange(e)}
  >
    <option value="">Select gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    
  </select>
  {errors.gender && <span className="text-red-500"> Gender is required </span>}
</div>

  
      
    <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
    <button type='submit' className="rounded text-white font-semibold bg-green-700 hover:bg-gray-700 py-2 px-6">Save</button>
    <button className="rounded text-white font-semibold bg-red-700 hover:bg-gray-700 py-2 px-6"
     onClick={reset}>Delete</button>
    </div>
    </form>
    {message && <div className="text-center bg-white text-black">{message}</div>}
    </div>
     </div>
  )
}

export default AddPet