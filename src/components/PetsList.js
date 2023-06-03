import React, { useEffect, useState } from "react";
import PetService from "../services/PetService";
import { useNavigate } from "react-router-dom";
import "../style/PetsList.css";
import PetForm from "./PetForm";
import TokenManager from "../Token/TokenManager";

function PetsList({ pet }) {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [message, setMessage] = useState("");

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

  const navigate = useNavigate();

  const editPet = (e, id) => {
    e.preventDefault();
    const selectedPet = pets.find((pet) => pet.id === id);
    setSelectedPet(selectedPet);
  };

  const cancelEdit = () => {
    setSelectedPet(null);
  };

  const updatePet = (updatedPet) => {
    const accessToken = TokenManager.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    PetService.updatePet(updatedPet.id, updatedPet, config)
      .then((response) => {
        setMessage("Pet has been updated successfully!");
        setTimeout(() => {
          setMessage("");
          
        }, 3000); 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        {message && <p className="text-center bg-white text-black ">{message}</p>}
      {selectedPet ? (
        <PetForm  pet={selectedPet} onCancel={cancelEdit} onUpdate={updatePet} />
      ) : (
        <div className="flex justify-center flex-wrap">
          {pets?.length > 0 ? (
            pets.map((p) => (
              <div key={p.id} className="pet-card">
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p>Age: {p.age}</p>
                <p>Description: {p.description}</p>
                <p>Type: {p.type}</p>
                <p>Status: {p.status}</p>
                <p>Gender: {p.gender}</p>
                {p.adopter && <p>Adopter: {p.adopter.username}</p>}
                <div className="buttons px-16">
                  <button
                    onClick={(e) => editPet(e, p.id)}
                    className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-6"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No pets found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PetsList;
