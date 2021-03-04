import axios from 'axios'

const URL = 'http://192.168.0.23:3010/api/company';
const fetcher = axios ;

const GetCompany = async () => {
  try{
    let rs = await fetcher.post(URL)
    return rs.data.data.items
  }
  catch(e){
    return console.log("ERR");
  }
}

const AddCompany = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher.put(URL,d)
    return rs.data.data
  }
  catch(e){
    return console.log("ERR");
  }
}

const UpdateCompany = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher.patch(URL,d)
    return rs.data.data
  }
  catch(e){
    return console.log("ERR", e);
  }
}

export  { GetCompany , AddCompany , UpdateCompany};