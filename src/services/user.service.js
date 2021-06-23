import axios from 'axios';
// import http from "../http-common";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserDataService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

//   getAll() {
//     return http.get("/users");
//   }

//   get(id) {
//     return http.get(`/users/${id}`);
//   }

//   create(data) {
//     return http.post("/users", data);
//   }

//   update(id, data) {
//     return http.put(`/users/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/users/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/users`);
//   }

//   findByTitle(username) {
//     return http.get(`/users?username=${username}`);
//   }
}

export default new UserDataService();