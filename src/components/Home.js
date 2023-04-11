import React, { useEffect, useState } from "react";
import PetService from "../services/PetService";

import "../style/PetsList.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [pets, setPets] = useState(null);
    const [searchInput, setSearchInput] = useState("");
  
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

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value.toUpperCase());
      };
    
      const filteredPets = pets?.filter(
        (pet) => pet.type.toUpperCase() === "CAT" || pet.type.toUpperCase() === "DOG"
      );
    
      const searchedPets =
        searchInput !== ""
          ? filteredPets.filter((pet) =>
              pet.type.toUpperCase().includes(searchInput)
            )
          : filteredPets;
   
  
    return (
        <div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="             Search by pet type (CAT or DOG)"
            className="p-5 rounded-lg"
            style={{ width: "300px" }}
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        
      <div className="flex  justify-center py-8 flex-wrap">
        {searchedPets?.map((pet) => (
          <div key={pet.id} className="pet-card">
            <h3 className="text-lg font-bold">{pet.name}</h3>
            <p>Age: {pet.age}</p>
            <p>Description: {pet.description}</p>
            <p>Type: {pet.type}</p>
            <p>Status: {pet.status}</p>
            <p>Gender: {pet.gender}</p>
            <div className="buttons px-16">
              <button className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-6">
                Adopt
              </button>
            </div>
          </div>
        )) ?? <p>No pets found</p>}
      </div>
      </div>
    );
}

export default Home