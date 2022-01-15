
import * as actionTypes from '../constants/cartConstant';

// as cart contains array of objects take by default as empty array.. 
export const cartReducer = (state = {cartItems: []}, action)=>{
    switch(action.type){
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const exist = state.cartItems.find(product=>product.id === item.id);
            // find returns the object for which it evaluates to be true out of the array of objects

            if(exist) return;
        // if it doesn't exist then keep all other items in the cart state and also push the new item inside
            return {...state, cartItems: [...state.cartItems, item]}

        case actionTypes.REMOVE_FROM_CART:
            return {...state, cartItems: state.cartItems.filter(product=> product.id !== action.payload)};

        // ...  modified.....................
        case actionTypes.CHANGE_COUNT:
            const temp = state.cartItems.find(product=> product.id === action.payload.id);
            const remaining = state.cartItems.filter(product => product.id !== temp.id);
            return {...state, cartItems: [...remaining, {...temp, count: temp.count+action.payload.count}]}


        //...............................    
        default:
            return state;
    }
}