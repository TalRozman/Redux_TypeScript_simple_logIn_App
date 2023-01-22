import { credential, MY_SERVER } from '../../env';
import axios from 'axios';

export const sendCredentials = async (credentials:credential) => {
    const res =  await axios.post(MY_SERVER+"login",{"userName":credentials.userName,"password":credentials.password})
    return res
}

export const addUser = async (credentials:credential)=>{
    const res = await axios.post(MY_SERVER+"signup",{"userName":credentials.userName,"password":credentials.password})
    return res
}