import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PetService from "../services/PetService";

function UpdatePet() {
    const { id } = useParams();
  const navigate = useNavigate();
    const [pet, setPet] = useState({
      id: id,
      name:"",
      age: "",
      description: "",
      type: "",
      status: "",
      adopter: {
        id: null,
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        address: null,
        password: null,
        phone: null,
        birthdate: null,
        role: null,
        adoptedPets: []
      },
      gender: ""

      })
      const [message, setMessage] = useState("");


      const handleChange = (e) =>{
        const { id, value } = e.target;
        setPet((prevPet) => ({
          ...prevPet,
          [id]: value || "", // Provide a default value of an empty string if `value` is null or undefined
        }));
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await PetService.getPetById(id);
            const petData = response.data;
            if (petData.id) {
              setPet(petData);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);
    
      const updatePet = (e) => {
        e.preventDefault();
        console.log(pet);
        PetService.updatePet(pet, id)
          .then((response) => {
            setMessage("Pet has been updated successfully!");
            navigate("/admin");
          })
          .catch((error) => {
            console.log(error);
          });
      };

    return (
        <div className="form  shadow border-b">
        <div key={pet.id}  className="px-10 py-10 ">
          <div className="font-bold text-2xl text-white bg-black text-center">
                <h1> Update pet</h1>
               </div> 
         
   
    <div className="items-center justify-center h-12 w-full my-4">
    
    <input
  type="text"
  placeholder="name"
  name="name"
  value={pet.name || ""}
  onChange={(e) => handleChange(e)}
/>
    
      
    </div>
    
    
    <div className="items-center justify-center h-14 w-full my-4">
    <input  type="number"
    
    placeholder=' age'
    name='age'
    value={pet.age || ""}
    onChange={(e)=> handleChange(e)}></input>
    
    </div>
    
   
    <div className="items-center justify-center h-14 w-full my-4">
    
    <input  type="text"
    
    placeholder=' description'
    name='description'
    value={pet.description || ""}
    onChange={(e)=> handleChange(e)}></input>
    
    
    </div>
    <div className="items-center justify-center h-14 w-full my-4">
    
    <input   type="text"
  placeholder="adopter"
  name="adopterId"
  value={pet.adopterId || ""}
  onChange={(e) => handleChange(e)}></input>
    
    
    </div>
    
    <div className="items-center justify-center h-14 w-full my-4">
  <select
   
    name="type"
    value={pet.type || ""}
    onChange={(e) => handleChange(e)}
  >
    <option value="">Select a type</option>
    <option value="DOG">DOG</option>
    <option value="CAT">CAT</option>
    
  </select>
 
</div>

    
   
<div className="items-center justify-center h-14 w-full my-4">
  <select
   
    name='status'
    value={pet.status || ""}
    onChange={(e)=> handleChange(e)}
  >
    <option value="">Select status</option>
    <option value="available">Available</option>
    <option value="pending">Pending</option>
    <option value="adopted">Adopted</option>
  </select>
 
</div>

    
    
<div className="items-center justify-center h-14 w-full my-4">
  <select
  
    name="gender"
    value={pet.gender }
    onChange={(e) => handleChange(e)}
  >
    <option value="">Select gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    
  </select>
 
</div>

  
      
    <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
    <button
     onClick={updatePet} className="rounded text-white font-semibold bg-green-700 hover:bg-gray-700 py-2 px-6"> Edit</button>
    <button  onClick={() => navigate("/admin")} className="rounded text-white font-semibold bg-green-700 hover:bg-gray-700 py-2 px-6"> Cancel</button>
   
    </div>

    {message && <div className="text-center bg-white text-black">{message}</div>}
    </div>
     </div>
  )
}

export default UpdatePet