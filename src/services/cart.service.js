import http from "../http-common";
import authHeader from './auth-header';

class CartDataService {
  getAll() {
    return http.get("/carts", { headers: authHeader() });
  }

  create(data) {
    return http.post("/carts/create", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/carts/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/carts/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/carts`, { headers: authHeader() });
  }
  
  checkout(data) {
    return http.post("/carts/checkout", data, { headers: authHeader() });
  }
}

export default new CartDataService();