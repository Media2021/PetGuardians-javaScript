import React, { useEffect, useState } from "react";
import PetService from "../services/PetService";
import { useNavigate, useParams } from "react-router-dom";
import "../style/PetsList.css";
import AdoptionRequestService from '../services/AdoptionRequestService';
import UserService from '../services/UserService';
import TokenManager from "../Token/TokenManager";

function PetsForAdoption({ userData }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [petId, setPetId] = useState(null);

  useEffect(() => {
    const fetchSelectedPet = async () => {
      try {
        const response = await PetService.getPetById(petId);
        setSelectedPet(response);
      } catch (error) {
        console.log('Error while fetching pet data: ', error);
      }
    };

    if (petId) {
      fetchSelectedPet();
    }
  }, [petId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(id);
       
      } catch (error) {
        console.log('Error while fetching user data: ', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PetService.getAvailablePets();
        setPets(response);
        console.log(response);
      } catch (error) {
        console.error("Error while getting available pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdoptButtonClick = async (petId) => {
    const request = {
     pet:{id: petId},
      user: {id: userData.id},
      status: 'PENDING',
      notes: '',
      requestDate: new Date().toISOString(),
    };

    try {
      
      const token = TokenManager.getAccessToken();
      const response = await AdoptionRequestService.createAdoptionRequest(request, token);
      console.log("Adoption request created successfully: ", response);
      
      window.alert("Request has been sent.");
    } catch (error) {
      console.error("Error while creating adoption request:", error);
    }
  };

  const filterPetsByType = (pets) => {
    let filteredPets = pets;

    if (filterType !== "") {
      filteredPets = filteredPets.filter((pet) =>
        pet.type.toUpperCase().includes(filterType.toUpperCase())
      );
    }

    if (filterAge !== "") {
      filteredPets = filteredPets.filter((pet) => pet.age === parseInt(filterAge));
    }

    return filteredPets;
  };

  return (
    <div className="container justify-center mx-auto my-4">
    <div className="fixed flex">
  <div className="mr-4">
    <label htmlFor="typeFilter">Filter by Type:</label>
    <input
      type="text"
      id="typeFilter"
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
    />
  </div>

  <div className="filter">
    <label htmlFor="ageFilter">Filter by Age:</label>
    <input
      type="text"
      id="ageFilter"
      value={filterAge}
      onChange={(e) => setFilterAge(e.target.value)}
    />
  </div>
</div>

      <div
        className="flex my-16 shadow"
        style={{
          height: "400px",
          overflowY: "scroll",
          boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
        }}
      >
       
        <table className="min-w-50%">
          <thead>
            <tr>
              <th className="text-left font-medium uppercase py-3 px-2">Name</th>
              <th className="text-left font-medium uppercase py-3 px-2">Age</th>
              <th className="text-left font-medium uppercase py-3 px-2">Description</th>
              <th className="text-left font-medium uppercase py-3 px-2">Type</th>
              <th className="text-left font-medium uppercase py-3 px-2">Status</th>
              <th className="text-left font-medium uppercase py-3 px-2">Gender</th>
              <th className="text-right font-medium uppercase py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterPetsByType(pets)?.map((pet) => (
              <tr key={pet.id} style={{ background: "antiquewhite" }}>
                <td style={{ padding: "0.5rem" }}>{pet.name}</td>
                <td style={{ padding: "0.5rem" }}>{pet.age}</td>
                <td style={{ padding: "0.5rem" }}>{pet.description}</td>
                <td style={{ padding: "0.5rem" }}>{pet.type}</td>
                <td style={{ padding: "0.5rem" }}>{pet.status}</td>
                <td style={{ padding: "0.5rem" }}>{pet.gender}</td>
                <td>
                  <button
                    className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-6"
                    onClick={() => handleAdoptButtonClick(pet.id)}
                  >
                    Adopt
                  </button>
                </td>
              </tr>
            )) ?? (
              <tr>
                <td colSpan="7">No pets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
    
  );
}

export default PetsForAdoption;
