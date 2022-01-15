import {Box, Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {ShoppingCart,FlashOn} from '@material-ui/icons';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { payUsingPaytm } from '../../service/api';
// if we want to push an item in dom... unmount something else and mount something else
// we need to initialize useHistory
import { post } from '../../utils/paytm';



const useStyle = makeStyles(theme=>({
    leftContainer:{
        padding: '40px 20px 0 80px',
        [theme.breakpoints.down('md')]:{
            padding: '20px 20px 0 40px',
            
        }

    },
    image:{
        padding: '15px 20px',  
        borderLeft: '1px solid #f0f0f0',
        width: '95%'

    },
    button:{
        height: 50,
        width: '46%',
        borderRadius: 2,
     
    },
    addToCart:{
        color: '#fff',
        background: '#ff9f00',
        marginRight: '3%'
    },
    buyNow:{
        background: '#fb641b',
        color: '#fff',
        marginLeft: '3%'
    }
}))


const ActionItems = ({product})=>{
    
    const classes = useStyle();
    const history = useHistory();

    // to use dispatch
    const dispatch = useDispatch();
    const addToCartBtn = ()=>{
        dispatch(addToCart(product.id)); 
        history.push('/cart');
    }


    const buyNow = async ()=>{
        let response = await payUsingPaytm({amount: 500, email: 'suraj@gmail.com'});
        let information = {
            action:'https://securegw-stage.paytm.in/order/process',
            params: response
        }

        post(information);
    }    

    return (
        <Box className={classes.leftContainer}>
            <img src={product.detailUrl} className={classes.image} /> <br/>
            {/* if we don't provide br break row here large mage flows out of container and over the badges on right side */}
            <Button onClick={()=>addToCartBtn()} variant="contained" className={clsx(classes.button, classes.addToCart)}><ShoppingCart />Add To Cart</Button>
            <Button onClick={()=>buyNow()} variant="contained" className={clsx(classes.button, classes.buyNow)}><FlashOn />Buy Now </Button>
        </Box>
    )
}






export default ActionItems;