import * as actionTypes from '../constants/cartConstant';
import axios from 'axios';


// const url = 'http://localhost:8000';
// not for production
const url = 'http://localhost:8000';

export const addToCart = (id) => async (dispatch)=> {
    try {
        const { data } = await axios.get(`${url}/product/${id}`);
        dispatch({ type: actionTypes.ADD_TO_CART, payload: {...data,count:1} });
    } catch (error) {
        console.log('Error while calling add to cart api');
    }
} 


export const removeFromCart = (id) => (dispatch) =>{
    dispatch({type: actionTypes.REMOVE_FROM_CART, payload:id});
}



//  modified................

export const changeCount = (id,count)=> (dispatch)=>{
    try{
        dispatch({type: actionTypes.CHANGE_COUNT, payload:{id: id, count: count}});
    }catch(error){
        console.log('ERROR WHILE CHANGING COUNT OF CART ITEM   ::   ', error.message);
    }
}

// ..............