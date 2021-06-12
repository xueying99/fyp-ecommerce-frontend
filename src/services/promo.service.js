import http from "../http-common";

class PromoDataService {
  getAll() {
    return http.get("/promos");
  }

  get(id) {
    return http.get(`/promos/${id}`);
  }

  create(data) {
    return http.post("/promos", data);
  }

  update(id, data) {
    return http.put(`/promos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/promos/${id}`);
  }

  deleteAll() {
    return http.delete(`/promos`);
  }

  findByTitle(title) {
    return http.get(`/promos?title=${title}`);
  }
}

export default new PromoDataService();