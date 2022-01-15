import axios from 'axios';
import * as actionTypes from '../constants/productConstant';



// const url = 'http://localhost:8000';



export const getProducts = ()=> async (dispatch)=>{
    try{
        const {data} = await axios.get(`/products`);
        // dispatch always calls the reducer which matches the values that we dispatched 
        dispatch({
            type: actionTypes.GET_PRODUCT_SUCCESS,
            payload: data
        })
        // {type: action.GET_PRODUCT_SUCCESS,payload: data} this is called action in redux
    }catch(error){
        dispatch({
            type: actionTypes.GET_PRODUCT_FAIL,
            payload: error.response
        })
        
    }
};

export const getProductDetails = (id)=> async (dispatch)=>{
    try{
        const {data} = await  axios.get(`/product/${id}`);
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAIL_FAIL,
            payload: error.response
        })
    }
}