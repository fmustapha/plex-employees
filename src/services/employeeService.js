import http from "./httpService";
import { apiUrl } from "../config.json";

const apiPath = apiUrl;

export function getEmployees() {
  return http.get(apiPath);
}

export function saveEmployee(employee) {
  if (!employee.id) {
    return http.post(apiPath);
  }

  const update = { ...employee };
  delete update.id;
  return http.put(apiPath, update);
}

export function deleteEmployee(id) {
  return http.delete(`apiPath/${id}`);
}

export function getEmployee(id) {
  return http.get(`apiPath/${id}`);
}
