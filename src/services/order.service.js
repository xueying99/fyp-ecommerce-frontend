import http from "../http-common";
import authHeader from './auth-header';

class OrderDataService {
  getAll() {
    return http.get("/orders", { headers: authHeader() });
  }

  create(data) {
    return http.post("/orders/create", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/orders/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/orders/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/orders`, { headers: authHeader() });
  }
}

export default new OrderDataService();