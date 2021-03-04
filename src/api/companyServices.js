import axios from "axios";

const URL = "http://localhost:3003/api/companyServices";
const fetcher = axios;

const GetCompanyServices = async () => {
  try {
    let rs = await fetcher.post(URL);
    return rs.data.data;
  } catch (e) {
    return console.log("ERR");
  }
};

const AddCompanyServices = async (data) => {
  let d = { ...data };
  try {
    let rs = await fetcher.put(URL, d);
    return rs.data.data;
  } catch (e) {
    return console.log("ERR");
  }
};

const UpdateCompanyServices = async (data) => {
  let d = { ...data };
  try {
    let rs = await fetcher.patch(URL, d);
    return rs.data.data;
  } catch (e) {
    return false;
  }
};

export { GetCompanyServices, AddCompanyServices, UpdateCompanyServices };
