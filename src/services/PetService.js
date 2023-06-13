import axios from "axios";
import TokenManager from "../Token/TokenManager";
import jwt_decode from "jwt-decode";

const Pet_api_base_url = "http://localhost:8081/pets";
class PetService {
  savePet(pet) {
    const headers = {
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
        "Content-Type": "application/json",
    };
    
    return axios
        .post(Pet_api_base_url, pet, { headers })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error while saving pet: ", error);
            throw error;
        });
}
        getPets(){
            return axios.get( Pet_api_base_url)
          }
          
        getAvailablePets(){
      return axios.get(`${Pet_api_base_url}/available`)
      
      .then(response => response.data)
      
      .catch(error => {
        console.error('Error while getting available pets: ', error);
        throw error;
      });
  
  }
  countAvailablePets(){
    return axios.get(`${Pet_api_base_url}/available/count`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error while getting available pets: ', error);
      throw error;
    });

}
  getCountPets(){
    return axios.get(`${Pet_api_base_url}/all/count`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error while getting available pets: ', error);
      throw error;
    });

}
// getAvailableCats(){
//   const headers = {
//     Authorization: `Bearer ${TokenManager.getAccessToken()}`,
//     "Content-Type": "application/json",
// };
//   return axios.get(`${Pet_api_base_url}/available/cats`,{ headers })
//   .then(response => response.data)
//   .catch(error => {
//     console.error('Error while getting available pets: ', error);
//     throw error;
//   });

// }  
// getAvailableDogs(){
//   return axios.get(`${Pet_api_base_url}/available/dogs`)
//   .then(response => response.data)
//   .catch(error => {
//     console.error('Error while getting available pets: ', error);
//     throw error;
//   });

// }   

// getAdoptedDogs(){
//   return axios.get(`${Pet_api_base_url}/adopted/dogs`)
//   .then(response => response.data)
//   .catch(error => {
//     console.error('Error while getting available pets: ', error);
//     throw error;
//   });
// }

// getAdoptedCats(){
//   return axios.get(`${Pet_api_base_url}/adopted/cats`)
//   .then(response => response.data)
//   .catch(error => {
//     console.error('Error while getting available pets: ', error);
//     throw error;
//   });

// }


// getAdoptedPets(){
//   return axios.get(`${Pet_api_base_url}/adopted/count`)
//   .then(response => response.data)
//   .catch(error => {
//     console.error('Error while getting available pets: ', error);
//     throw error;
//   });

// }  

// countByTypeAdopted(){
//   return axios.get(`${Pet_api_base_url}/count-by-type`)
//   .then(response => response.data)
//   .catch(error => {
//     console.error('Error while getting adopted pets: ', error);
//     throw error;
//   });
// }
getCountAdoptedByType() {
  return axios
    .get(`${Pet_api_base_url}/count-adopted-by-type`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error while getting pet counts: ', error);
      throw error;
    });
}

getCountAvailableByType() {
  return axios
    .get(`${Pet_api_base_url}/count-available-by-type`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error while getting pet counts: ', error);
      throw error;
    });
}


          getPetById(id) {
            return axios.get(Pet_api_base_url + "/" + id)
            .then(response => response.data)
            .catch(error => {
              throw error;
            });
          }
        
          updatePet(id, updatedPet, config) {
            return axios.put(`${Pet_api_base_url}/${id}`, updatedPet, config)
              .then(response => response.data)
              .catch(error => {
                throw error.response.data;
              });
          }
          
        }
    // eslint-disable-next-line import/no-anonymous-default-export
    export default new PetService();