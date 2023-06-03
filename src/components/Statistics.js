import React, { useEffect, useState, useCallback } from 'react';
import PetService from "../services/PetService";
import TokenManager from '../Token/TokenManager';
import { Doughnut } from 'react-chartjs-2';
import { registerables, Chart } from 'chart.js';
import "../style/AdminDash.css";
Chart.register(...registerables);




function Statistics() {
  const [petType, setPetType] = useState('DOG');
  const [count, setCount] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [availableCats, setAvailableCats] = useState(0);
  const [availableDogs, setAvailableDogs] = useState(0);
  const [countCats, setCountCats] = useState(0);
  const [countDogs, setCountDogs] = useState(0);

  const fetchPetCount = useCallback(async () => {
    try {
      const count = await PetService.getAdoptedPets(petType);
      setCount(count);
    } catch (error) {
      console.error(error);
    }
  }, [petType]);

  useEffect(() => {
    fetchPetCount();
  }, [fetchPetCount]);


  useEffect(() => {
   
    const fetchPetCount = async () => {
      try {
        const count = await PetService.getCountPets();
        setPetCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPetCount();
  }, []); 

  useEffect(() => {
   
    const fetchAvailableCats = async () => {
      
      try {
        const token = TokenManager.getAccessToken();
        const count = await PetService.getAvailableCats(token);
        setAvailableCats(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvailableCats();
  }, []); 

  useEffect(() => {
   
    const fetchAvailableDogs = async () => {
      try {
        const count = await PetService.getAvailableDogs();
        setAvailableDogs(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvailableDogs();
  }, []); 


  useEffect(() => {
    const fetchCountCats = async () => {
      try {
        const count = await PetService.getAdoptedCats();
        setCountCats(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountCats();
  }, []);

  useEffect(() => {
    const fetchCountDogs = async () => {
      try {
        const count = await PetService.getAdoptedDogs();
        setCountDogs(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountDogs();
  }, []);

  const handlePetTypeChange = (event) => {
    setPetType(event.target.value);
  };


  const data = {
    labels: ['Available Pets', 'Adopted Cats', 'Adopted Dogs'],
    datasets: [
      {
        data: [petCount, countCats, countDogs],
        backgroundColor: ['#769353', '#ebbf58', '#364968'], // Warm colors
        hoverBackgroundColor: ['#b03c3d', '#b03c3d', '#b03c3d'], // Hover colors
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'black',// Set label color to white
        },
      },
    },
  };

  return (
    <div className="statistic">
      <h3 className="text-lg font-bold">Adoption Statistics</h3>
      <div>
        <label className="text-lg font-bold" htmlFor="petType">Pet Type :</label>
        <select id="petType" value={petType} onChange={handlePetTypeChange}>
          <option value="DOG">Dogs</option>
          <option value="CAT">Cats</option>
        </select>
      </div>
      <p style={{ color: '#385b66', fontWeight: 'bold' }}>Count of Adopted {petType}: {count}</p>
      <div>
        <p style={{ color: '#364968', fontWeight: 'bold' }}>Count of All Pets: {petCount}</p>
      </div>
      <div>
        <p style={{ color: '#2b2e4a', fontWeight: 'bold' }}>Count Available Cats: {availableCats}</p>
      </div>
      <div>
        <p style={{ color: '#5b305a', fontWeight: 'bold' }}>Count  Available Dogs: {availableDogs}</p>
      </div>

    
    <div className='chart' style={{ width: '300px', height: '300px',  }}>
        <Doughnut data={data} options={options}/>
      </div>     
      </div>
 
  );
}

export default Statistics;
