import axios from "axios";
import TokenManager from "../Token/TokenManager";



const Adoption_api_base_url = "http://localhost:8081/adoption";

class AdoptionRequestService {
    createAdoptionRequest(request) {
      const headers = {
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
        "Content-Type": "application/json",
    };
        return axios.post(Adoption_api_base_url, request,{headers})
          .then(response => response.data)
          .catch(error => {
            throw error.response.data;
          });
      }

      getAllAdoptionRequests() {
        return axios.get(Adoption_api_base_url)
          .then(response => response.data)
          .catch(error => {
            throw error.response.data;
          });
      }

      getAdoptionRequestById(id) {
        return axios.get(`${Adoption_api_base_url}/adoption/${id}`)
          .then(response => response.data)
          .catch(error => {
            throw error.response.data;
          });
      }

      updateAdoptionRequestById(id, updatedRequest) {
        return axios.put(`${Adoption_api_base_url}/${id}`, updatedRequest)
          .then(response => response.data)
          .catch(error => {
            throw error.response.data;
          });
      }
    
      acceptAdoptionRequest(id) {
        return axios.put(`${Adoption_api_base_url}/${id}/accept`)
          .then(response => response.data)
          .catch(error => {
            throw error.response.data;
          });
      }
    
      declineAdoptionRequest(id) {
        return axios.put(`${Adoption_api_base_url}/${id}/decline`)
          .then(response => response.data)
          .catch(error => {
            throw error.response.data;
          });
      }
      getAdoptionRequestsByUserId(userId) {
        return axios.get(`${Adoption_api_base_url}/${userId}/adoption-requests`)
          .then(response => response.data)
          .catch(error => {
            throw error.response.data;
          });
      }

      getAdoptedPetsSize(petType)
      {
        return axios.get(`${Adoption_api_base_url}/count/${petType}`)
        .then(response => response.data)
        .catch(error => {
          throw error.response.data;
        });
      }

      }
    // eslint-disable-next-line import/no-anonymous-default-export

    export default new AdoptionRequestService ();
