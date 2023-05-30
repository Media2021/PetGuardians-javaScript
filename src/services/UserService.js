import axios from "axios";
import TokenManager from "../Token/TokenManager";
import jwt_decode from "jwt-decode";


const User_api_base_url = "http://localhost:8081/users";

class UserService {
  saveUser(user) {
    return axios.post(User_api_base_url, user)
      .then(response => response.data)
      .catch(error => {
        console.error("Error while saving user: ", error);
        throw error;
      });
  }
  getUsers(){
    // return axios.get(User_api_base_url, {
    //   headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    // }).then(response => response.data);
    return axios.get(User_api_base_url);
  }
  deleteUser(id) {
    return axios.delete(User_api_base_url + "/" + id, {
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    });
  }

  getUserById(id) {
    return axios.get(User_api_base_url + "/" + id, {
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => {
      console.log(response.data); // this will log the user information in the console
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching user by ID:", error);
      throw error;
    });
  }

  updateUser( id,user) {
    return axios.put(User_api_base_url + "/" + id, user);
  }
  
  login = async (username, password) => {
    try {
    
      const response = await axios.post(`${User_api_base_url}/login`, {
        username: username,
        password: password,
      
      });
  
      const accessToken = response.data.accessToken;
      TokenManager.setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    }
    
  }
  getClaims() {
    const accessToken = TokenManager.getAccessToken();
    if (!accessToken) {
      return undefined;
    }
    return jwt_decode(accessToken);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
