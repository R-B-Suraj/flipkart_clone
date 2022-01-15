
import mongoose from 'mongoose';




const Connection= async (URL)=>{
    // heroku won't serch in code where we have written the connection string.. so we need to pass it in this function
    // heroku checks the server.js file   we need to change file name from index.js to server.js
    // const clusterURL = `mongodb+srv://${userName}:${password}@ecommerceweb.p2kcq.mongodb.net/FLIPKART_CLONE?retryWrites=true&w=majority`;

    try{
    await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    console.log('Database Connected Successfully ! ');
    } catch (error) {
        console.log('Error : ', error.message);
    }
}
 
export default Connection;
