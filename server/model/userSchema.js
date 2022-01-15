

import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
   firstname:{
       type: String,
       required: true,
       trim: true,
       min: 5,
       max: 20
   },
   lastname:{
       type: String, 
       required: true,
       trim: true,
       min: 5,
       max: 20
   },
   username:{
       type: String,
       required: true,
       trim: true,
       unique: true,
       index: true,
       lowercase: true
   },
   email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
   }, 
   password:{
       type: String,
       required: true,
   },
   phone:{
       type: String
   },
  
});

// we set index true in username  which is unique and indexing of the data should be done based
// on username  for faster search in database



const user = mongoose.model('user', userSchema);
// a collection named 'users' will get created in database with userSchema

export default user;