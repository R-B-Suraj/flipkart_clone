
import express from "express";
import { userSignup , userLogin} from "../controller/user-controller.js";
import { getProducts , getProductById} from "../controller/product-controller.js";
import { addPaymentGateway , paymentResponse } from "../controller/payment-controller.js";

const router = express.Router();

// follow MVC structure...  here we don't write what's the logic inside of the router function
// here we only write the routes.. logic is inside the controller 

router.post('/signup',userSignup);
router.post('/login', userLogin);
// in case of login also client sends user information through url so it is a post api
router.get('/products', getProducts); 
router.get('/product/:id', getProductById);
router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);
 

export default router;