import axios from 'axios'

const URL = 'http://192.168.0.23:3010/api/fetch/country';
const fetcher = axios ;

const GetCountry = async () => {
  let d = {"limit" : 300};
  try{
    let rs = await fetcher.post(URL, d)
    return rs.data.data.items
  }
  catch(e){
    return console.log("ERR");
  }
}



export  { GetCountry};