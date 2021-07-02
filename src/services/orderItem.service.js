import http from "../http-common";
import authHeader from './auth-header';

class OrderItemDataService {
  getAll() {
    return http.get("/orderItems", { headers: authHeader() });
  }

  create(data) {
    return http.post("/orderItems/create", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/orderItems/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/orderItems/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/orderItems`, { headers: authHeader() });
  }
}

export default new OrderItemDataService();