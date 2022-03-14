

import axios from 'axios';

// const url = 'http://localhost:8000';
// backend url , but this is for local machine not for production, there we need to use heroku's url
const url = 'http://localhost:8000';

export const authenticateSignup = async(user)=>{
    try{
    return await axios.post(`${url}/signup` , user);
    }catch(error){
        console.log('Error while calling signup api   :  ', error);
    }
}


export const authenticateLogin = async(loginUser)=>{
    try{
        return await axios.post(`${url}/login` , loginUser);
    }catch(error){
        console.log('Error while calling login api  : ', error);
    }
}


export const payUsingPaytm = async (body_data)=>{
    try{
      let response = await axios.post(`${url}/payment`, body_data);
      return response.data;

    }catch(error){
        console.log('Error while calling paytm  api', error);
    }
}