import * as actionType from '../constants/productConstant';



// for safeside take products empty array so that app doesn't break if we get string as payload instead of 
// array and we do map operation on products so we initialize products with empty array
export const getProductsReducer = (prevState = {products: []}, action)=>{
    switch (action.type){
        case actionType.GET_PRODUCT_SUCCESS:
            return {products: action.payload}
        case actionType.GET_PRODUCT_FAIL:
            return {error: action.payload}
        default:
            return prevState ;  
    }
};


// product that we should receive is an object.... so we initialize it with empty object { } to handle 
// error when product received is not an object dure to some reason 
export const getProductDetailsReducer = (prevState = {product:{}} , action) =>{
    switch(action.type){
        case actionType.GET_PRODUCT_DETAIL_SUCCESS:
            return {product: action.payload}
        case actionType.GET_PRODUCT_DETAIL_FAIL:
            return {error: action.payload}
        default:
            return prevState
    }
};