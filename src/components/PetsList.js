import React, { useEffect, useState } from "react";
import PetService from "../services/PetService";
import { useNavigate } from "react-router-dom";
import "../style/PetsList.css";

function PetsList({pet}) {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await PetService.getPets();
        setPets(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deletePet = (e, id) => {
    e.preventDefault();
    PetService.deletePet(id).then((res) => {
      if (pets) {
        setPets((prevElement) => {
          return prevElement.filter((pet) => pet.id !== id);
        });
      }
    });
  };
 const navigate = useNavigate();
  const editPet = (e, id) => {
    e.preventDefault();
    navigate(`/editPet/${id}`);
  };




  return (
    <div className="flex  justify-center  flex-wrap">
      {pets?.map((pet) => (
        <div key={pet.id} className="pet-card">
          <h3 className="text-lg font-bold">{pet.name}</h3>
          <p>Age: {pet.age}</p>
          <p>Description: {pet.description}</p>
          <p>Type: {pet.type}</p>
          <p>Status: {pet.status}</p>
          <p>Gender: {pet.gender}</p>
          <div className="buttons px-16">
            <button
              className="rounded text-white  font-semibold bg-red-700 hover:bg-gray-500 py-1 px-4 mr-2"
              onClick={(e) => deletePet(e, pet.id)}
            >
              Delete
            </button>
            <button  onClick={(e, id) => editPet(e, pet.id)} className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-6">
              Edit
            </button>
          </div>
        </div>
      )) ?? <p>No pets found</p>}
    </div>
  );
}

export default PetsList;
