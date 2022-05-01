import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;


const API = axios.create({ baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post("/users/signup", formData);


export const createWorker = (workerData) => API.post("/worker", workerData);
export const getWorkers = () => API.get("/worker");
export const deleteWorker = (id) => API.delete(`/worker/${id}`);
export const updateWorker = (updatedWorkerData, id) =>
  API.patch(`/worker/${id}`, updatedWorkerData);

export const getWorkersByUser = (userId) => API.get(`/worker/userWorkers/${userId}`); // id-> userid

export const getTagWorkers = (tag) => API.get(`/worker/tag/${tag}`); // id-> userid