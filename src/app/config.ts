export class Config {
  API_URL = "http://localhost:8000/api/";

  getToken() {
    return localStorage.getItem("token");
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
