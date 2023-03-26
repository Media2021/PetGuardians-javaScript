import axios from "axios";

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
    return axios.get( User_api_base_url)
  }
  deleteUser(id) {
    return axios.delete(User_api_base_url + "/" + id);
  }

  getUserById(id) {
    return axios.get(User_api_base_url + "/" + id);
  }

  updateUser(user, id) {
    return axios.put(User_api_base_url + "/" + id, user);
  }
  login = async (username, password) => {
    try {
      const response = await axios.post(`${User_api_base_url}/login`, {
        username: username,
        password: password
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    }
  }}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
