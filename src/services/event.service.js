import http from "../http-common";

class EventDataService {
  getAll() {
    return http.get("/events");
  }

  getAllPublished() {
    return http.get("/events/published");
  }

  get(id) {
    return http.get(`/events/${id}`);
  }

  create(data) {
    return http.post("/events", data);
  }

  update(id, data) {
    return http.put(`/events/${id}`, data);
  }

  delete(id) {
    return http.delete(`/events/${id}`);
  }

  deleteAll() {
    return http.delete(`/events`);
  }

  findByEventname(eventname) {
    return http.get(`/events?eventname=${eventname}`);
  }
}

export default new EventDataService();