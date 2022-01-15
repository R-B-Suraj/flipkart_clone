import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'; 
import { getProductsReducer, getProductDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

// thunk is a middleware used for api calls 
const middleware = [thunk];


const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer,
})

// createStore takes two arguments... first is reducer another is a middleware
// if multiple reducers are there  we use combineReducers
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store;