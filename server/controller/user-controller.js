
import UserModel from "../model/userSchema.js";

export const userSignup = async (request, response)=>{


    try{

        const exist = await UserModel.findOne({username: request.body.username});
        if(exist)
            return response.status(401).json('Username already exists ')    ;  
        const user = request.body;
        const newUser = new UserModel(user);
        await newUser.save();
        response.status(200).json('User  is successfully registered');

    }catch(error){
        console.log('Error : ',error.message);
    }
    
}

export const userLogin = async (request, response)=>{
    try{
        const user = await UserModel.findOne({username: request.body.username, password: request.body.password});
        // we need to match both... username and password to be correct... and find one document with these parameters which is not undef
        if(user)
         return response.status(200).json(`${request.body.username} login successful`);
        else 
         return response.status(401).json('invalid email or password');
        
    }catch(error){
        console.log('Error : ', error.message);
    }
}