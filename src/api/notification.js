import axios from "axios";

const URL = "http://localhost:3003/api/notification/";
const fetcher = axios;

const GetNotification = async () => {
  try {
    let rs = await fetcher.post(URL);
    return rs.data.data;
  } catch (e) {
    return console.log("ERR");
  }
};

const AddNotification = async (data) => {
  let d = { ...data };
  try {
    let rs = await fetcher.put(URL, d);
    return rs.data.data;
  } catch (e) {
    return console.log("ERR");
  }
};

const UpdateNotification = async (data) => {
  let d = { ...data };
  try {
    let rs = await fetcher.post(`${URL}/update`, d);
    console.log("RS", rs);
    return rs.data.data;
  } catch (e) {
    return console.log("ERR");
  }
};

export { GetNotification, AddNotification, UpdateNotification };
