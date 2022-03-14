// // // usually we import like this in node.js  but if we have latest version of the node then
// // // we also can use the modern syntax of importing
// // const express = require('express');


// // import express from 'express';
// // but this is not recognized by node untill we have  "type":"module" inside package.json file

// import express from 'express';
// import mongoose from 'mongoose';




// const app = express();

// const PORT = 8000;

// const clusterURL = 'mongodb+srv://admin_SURAJ:nimeiCHARAN@ecommerceweb.p2kcq.mongodb.net/PROJECT 0?retryWrites=true&w=majority';

// const Connection= async ()=>{
//     // userNewUrlParser:true tells mongodb that the string they are using to connect to the database now
//     // is depricated and may be they might get removed in future so user the new string for the url parsing
//     // useUnifiedTopology:true   current server discovery and monitoring engine is depricated and may be removed in future so use the new ones
//     // useFindAndModify:false  mongodb by default uses the useFindAndModify function to interact with teh documents
//     // we are telling it that don't use that and use the new modified functions for update and modify
//     // like findOneAndModify
//     // connection is an asychronous call and returns a promise..
//     // to hold code execution till we get connected to the database... we can use the traditional method
//     // .then  and catch... but  es6  we can use  await and async...
//     // await can be used only if a function is declared async  so we declare Connection async
    
//     try{
//     await mongoose.connect(clusterURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
//     // after successful connection we print
//     console.log('Database Connected Successfully ! ');
//     // but await is an external call ... now mongodb is not in our code  there is a change to throw exception
//     // so we use try and catch...
//     } catch (error) {
//         console.log('Error : ', error.message);
//     }
// }
 
// Connection();

// app.listen(PORT, ()=>console.log(`server is listening at port  ${PORT}`));



































import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import {v4 as uuid} from 'uuid';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name', __dirname);

// components
import Connection from './database/db.js';
import DefaultData from './default.js';
import Routes from './routes/routes.js';


dotenv.config();
// to be able to use dotenv file data, it initializes all configurations of .env file

const userName= process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const app = express();

// body-parser is used to parse the body of the post api for sighup
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
// cors is used to check for csrf attacks..
app.use(cors());

app.use('/', Routes);



const PORT = process.env.PORT || 8000;
// if heroku couldn't find PORT in .env file it assigns port on its own.
// use process.env.PORT in production mode and 8000 in development mode 
const URL = `mongodb+srv://${userName}:${password}@ecommerceweb.p2kcq.mongodb.net/FLIPKART_CLONE?retryWrites=true&w=majority`;


// in production mode use process.env.MONGODB_URI   and in local use the URL mentioned
Connection(process.env.MONGODB_URI || URL);

// we need to give client's reference in this file , because first heroku picks this index.js file
// we are telling heroku to run the front end along with the backend.
// in heroku NODE_ENV is production while deployed.... and browser can't understand react/jsx etc..
// we need to convert it to build(javascript).. in package.json client we can find the build script
// if(process.env.NODE_ENV == 'production' ){
//     app.use(express.static(path.join(__dirname, 'client/build')));
// }




app.listen(PORT, ()=>console.log(`server is listening at port  ${PORT}`));


// send data to database after connections is established
DefaultData();

app.use(express.static(path.join(__dirname, 'client/build')));


export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams= {};

paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
// ORDER_ID SHOULD BE UNIQUE    uuid  generates a unique number each time we call it
paytmParams['ORDER_ID'] = uuid();
// TAXATION AMOUNT  100 RUPEES  AS A STRING 
paytmParams['TXN_AMOUNT'] = '100';
// IN CALLBACK URL THE WHOLE checkSum is validated  
paytmParams['CALL_BACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'radgadfg@gmail.com';
paytmParams['MOBILE_NO'] = '9337750594';
