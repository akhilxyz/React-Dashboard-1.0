import axios from 'axios'; 
import { handleResponse, handleError } from '../response'; 


//TODO put Base url in .env file
const BASE_URL = 'http://127.0.0.1:3333/api/v1'; 

const getCompany = (resource) => { 
  return axios 
    .get(`${BASE_URL}/${resource}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 


const updateCompany = (resource, id) => { 
  return axios 
    .get(`${BASE_URL}/${resource}/${id}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 


const addCompany = (resource, model) => { 
  return axios 
    .post(`${BASE_URL}/${resource}`, model) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

const deletCompany = (resource, id) => { 
  return axios 
    .delete(`${BASE_URL}/${resource}`, id) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const companyProvider = { 
    getCompany, 
    updateCompany, 
    addCompany, 
    deletCompany, 
};