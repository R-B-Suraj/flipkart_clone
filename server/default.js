
import { products } from "./constants/products.js";
import Product from './model/productSchema.js';

const DefaultData = async ()=>{
    // mongodb is an external entity , so it can cause error.. we need to handle.. else finding it will be difficult
    try{
        // model.insertMany(array of objects of a perticular model schema)
        // it's an asynchronous function so we have to hold the execution and for that async await 
        // deleteMany({}) deletes all files in database so that we can sae new data, else it will repeat after
        // each restart of server... data gets duplicated
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Data imported successfully');
    }catch(error){
        console.log("Error :  ", error.message);
    }
}

export default DefaultData;