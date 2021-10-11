import axios from 'axios'


const fetcher = async (data) =>{

    try{
        const token = localStorage.getItem('token');

    let Request = {
        method: data.method,
        url : `http://localhost:3014/api/web${data.url}`,
        header: {"x-access-token": token }
    }

    if(data.data != null){
        Request.data = data.data;
    }
    if(data.header !=null){
        Request.header = {
            "x-access-token": token,
            ...data.header
        }
    }

    let rs = await axios(Request);
    console.log("RS:", rs)

    return rs;
    }
    catch(e){
        return e;
    }
}


export default fetcher;
