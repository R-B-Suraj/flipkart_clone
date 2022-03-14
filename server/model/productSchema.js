import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    id: String,
        url: String,
        detailUrl: String,
        title: Object, 
        price: Object,
        description: String,
        discount: String,
        tagline: String
});




const products = mongoose.model('product', productSchema);
// mongodb by default searches for collection name after pluralising it..
// in this case it will search for products collection   model(collection name , schema)


export default products;