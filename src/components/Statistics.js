import React, { useEffect, useState, useCallback } from 'react';
import PetService from "../services/PetService";
import TokenManager from '../Token/TokenManager';
import { Doughnut } from 'react-chartjs-2';
import { registerables, Chart } from 'chart.js';
import "../style/AdminDash.css";
Chart.register(...registerables);




function Statistics() {
  const [count, setCount] = useState(0);
  const [petCountAll, setPetCountAll] = useState(0);
  const [petCountsAdopted, setPetCountsAdopted] = useState([]);
  const [petCountsAvailable, setPetCountsAvailable] = useState([]);

 



  useEffect(() => {
    fetchAvailablePetCounts();
  }, []);

  const fetchAvailablePetCounts = async () => {
    try {
      const response = await PetService.getCountAvailableByType();
      setPetCountsAvailable(response);
    } catch (error) {
      console.error('Error while getting pet counts: ', error);
    }
  };
 
  useEffect(() => {
    fetchPetCounts();
  }, []);

  const fetchPetCounts = async () => {
    try {
      const response = await PetService.getCountAdoptedByType();
      setPetCountsAdopted(response);
    } catch (error) {
      console.error('Error while getting pet counts: ', error);
    }
  };



  const fetchAllPetCount = useCallback(async () => {
    try {
      const count = await PetService.getCountPets();
      setCount(count);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPetCount();
  }, [fetchAllPetCount]);


  useEffect(() => {
   
    const fetchPetCount = async () => {
      try {
        const count = await PetService.countAvailablePets();
        setPetCountAll(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPetCount();
  }, []); 

 

  const countAvailableCats = petCountsAvailable.find(petCount => petCount['pet Type'] === 'CAT');
  const countAvailableDogs = petCountsAvailable.find(petCount => petCount['pet Type'] === 'DOG');

 
  const countAdoptedCats = petCountsAdopted.find(petCount => petCount['pet Type'] === 'CAT');
  const countAdoptedDogs = petCountsAdopted.find(petCount => petCount['pet Type'] === 'DOG');


  const data = {
    labels: ['Available Pets', 'Adopted Cats', 'Adopted Dogs'],
    datasets: [
      {
        data: [petCountAll, countAdoptedCats?.count || 0, countAdoptedDogs?.count || 0],
        backgroundColor: ['#769353', '#ebbf58', '#364968'], 
        hoverBackgroundColor: ['#b03c3d', '#b03c3d', '#b03c3d'], 
      },
      
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'black',
        },
      },
    },
  };

  return (
    
    <div className="statistic">
      <h3 className="text-lg font-bold">Adoption Statistics</h3>

      {/* <div>
      <h1>Adopted pet </h1>
      {petCounts.length === 0 ? (
        <p>No pet type counts available.</p>
      ) : (
        petCounts.map((petCount, index) => (
          <div key={index}>
            <p>Adopted {petCount['pet Type']} : {petCount.count}  </p>
           
          </div>
        ))
      )}
    </div> */}
    


      <div>
        <p style={{ color: '#364968', fontWeight: 'bold' }}>Count of All Pets: {count}</p>
      </div>
      <div>
        <p style={{ color: '#2b2e4a', fontWeight: 'bold' }}>Count Available Cats: {countAvailableCats?.count || 0}</p>
      </div>
      <div>
        <p style={{ color: '#5b305a', fontWeight: 'bold' }}>Count  Available Dogs: {countAvailableDogs?.count || 0}</p>
      </div>

    
    <div className='chart' style={{ width: '300px', height: '300px',  }}>
        <Doughnut data={data} options={options}/>
      </div>     
      </div>
 
  );
}

export default Statistics;
