import axios from "axios";

const Pet_api_base_url = "http://localhost:8081/pets";
class PetService {
    savePet(pet) {
      return axios.post(Pet_api_base_url, pet)
        .then(response => response.data)
        .catch(error => {
          console.error("Error while saving pet: ", error);
          throw error;
        });
    }
        getPets(){
            return axios.get( Pet_api_base_url)
          }
          deletePet(id) {
            return axios.delete(Pet_api_base_url + "/" + id);
          }
        
          getPetById(id) {
            return axios.get(Pet_api_base_url + "/" + id);
          }
        
          updatePet(pet, id) {
            return axios.put(Pet_api_base_url + "/" + id, pet);
          }
    }

    // eslint-disable-next-line import/no-anonymous-default-export
    export default new PetService();