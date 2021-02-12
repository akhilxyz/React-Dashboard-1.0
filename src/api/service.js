import axios from 'axios'

const URL = 'http://localhost:3003/api/service/';
const fetcher = axios ;

const GetService = async () => {
  try{
    let rs = await fetcher.post(URL)
    return rs.data.data
  }
  catch(e){
    return console.log("ERR");
  }
  
}

const AddService = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher.put(URL,d)
    return rs.data.data
  }
  catch(e){
    return console.log("ERR");
  }
}


const UpdateService = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher.post(URL,d)
    return rs.data.data
  }
  catch(e){
    return console.log("ERR");
  }
}

export  {GetService, AddService, UpdateService};