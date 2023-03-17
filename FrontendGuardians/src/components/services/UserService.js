import axios from "axios";

const User_api_base_url = "http://localhost:8080/users";

class UserService {
  saveUser(user) {
    return axios.post(User_api_base_url, user)
      .then(response => response.data)
      .catch(error => {
        console.error("Error while saving user: ", error);
        throw error;
      });
  }
}

export default new UserService();
