import axios from 'axios'

const URL = 'http://localhost:3003/api/notification/';
const fetcher = axios ;

const GetNotification = (successcallback, errorcallback) => {
    fetcher.post(URL)
    .then(response => {
      if(successcallback != null){        
      successcallback(response.data.data);
    }
    })
    .catch(err => {
      if(errorcallback != null){
         errorcallback(err);
      }
    })
}
export  { GetNotification };