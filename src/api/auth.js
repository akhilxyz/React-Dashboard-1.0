import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const AuthUserRoute = async(props) => {
    try{
        let rs = await axios.post('http://localhost:3003/api/admin/login', {
        email: props.email,
        password: props.password
    })
    const token = rs.data.data.token
    localStorage.setItem('Token', token)
    return true
    }
    catch(e){
        NotificationManager.error(JSON.parse(e.request.response).message,'Error',2000)
        return false
    }
}

export default AuthUserRoute;