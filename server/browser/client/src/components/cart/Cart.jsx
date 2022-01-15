
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Box, Typography ,Grid, Button} from '@material-ui/core';
import {removeFromCart} from '../../redux/actions/cartActions';
import { post } from '../../utils/paytm';
import { payUsingPaytm } from '../../service/api';




// components
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import TotalView from './TotalView';



const useStyle = makeStyles(theme=>({
    component: {
        // marginTop:55,
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('sm')]:{
            padding: '15px 0px',
        }
    },
    leftComponent: {
        // width: '67%',
        paddingRight: 10,
        paddingLeft:15,
        [theme.breakpoints.down('sm')]:{
            marginBottom: 15
        }
    },
    header:{
        padding: '15px 24px',
        background:'#fff',
    },
    cart:{
        backgroundColor: '#f1f2f3',
         height:'100vh',
         padding: 25 ,
         [theme.breakpoints.down('sm')]:{
            padding: '25px 0px',
        }
    },
    bottom:{
        padding:'16px 27px',
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
        boxShadow:'0 2px 10px 0 rgb(0 0 0 /10%)',
        
    },
    placeOrder:{
        background:'#fb641b',
        color: '#fff',
        borderRadius:2,
        width: 250,
        height: 50,
        display:'flex',
        marginLeft: 'auto',
    }
    
}))


const Cart = () => {


    const classes = useStyle();
    
    const { cartItems } = useSelector(state => state.cart);

    const dispatch= useDispatch();
    useEffect(() => {
        console.log(cartItems);
    })

    const removeItemFromCart = (id)=>{
        dispatch(removeFromCart(id));
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
        <Box className={classes.cart}>
            {
                cartItems.length ?
                    <Grid container className={classes.component}>
                        <Grid item lg={9} md={8} sm={12} xs={12} className={classes.leftComponent}>
                             <Box className={classes.header}>
                                 <Typography style={{fontSize: 18, fontWeight: 600}}>My Cart ({cartItems.length}) </Typography>
                             </Box>
                             {
                                 cartItems.map(item =>(
                                    <CartItem item = {item} removeItemFromCart = {removeItemFromCart}/>
                                 ))
                             }
                             <Box className={classes.bottom}>
                                 <Button onClick={()=>buyNow()} className={classes.placeOrder} variant='contained'>Place Order</Button>
                             </Box>
                        </Grid>

                        <Grid item lg={3} md={4} sm={12} xs={12}>
                        <TotalView cartItems = {cartItems} />
                        </Grid>

                    </Grid> 
                    
                    
                    :  <EmptyCart />
            }
        </Box>
    )
}


export default Cart;