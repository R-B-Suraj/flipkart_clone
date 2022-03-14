
import {Box, Typography, makeStyles} from '@material-ui/core';
import { useEffect, useState } from 'react';


const useStyle = makeStyles({
    component:{
  
        background: '#fff',
        marginLeft: 15,
        marginRight:10,

    },
    header:{
        padding: '15px 24px',
        borderBottom: '1px solid #f0f0f0',

    },
    container:{
        padding: '16px 24px',
        '& > *':{
            marginTop: 20,
            fontSize: 14,
        }
    },
    greyText:{
        color: '#878787',

    },
    price:{
        float: 'right',

    },
    totalAmount:{
        fontSize: 18,
        fontWeight: 600,
        borderTop: '1px dashed #e0e0e0',
        padding: '20px 0',
        borderBottom: '1px dashed #e0e0e0',
    }
})

const TotalView = ({cartItems})=>{


    const classes = useStyle();
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    
    useEffect(()=>{
        totalAmount();
    },[cartItems]);
    // totalAmount is called everytime the component is mounted  added condition is when cartItems changes

    const totalAmount= ()=>{
        // we can't directly change the price  by price = 30  
        let price = 0, discount = 0;
        cartItems.map(item => {
            console.log(item.count);
            price += item.price.mrp * item.count;
            discount += (item.price.mrp - item.price.cost)* item.count;
        })

        setPrice(price);
        setDiscount(discount);
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.header}>
                <Typography className={classes.greyText}>PRICE_DETAILS</Typography> 
            </Box>
            <Box className={classes.container}>
                <Typography>Price ({cartItems.length} items)<span className={classes.price}>₹{price}</span></Typography> 
                <Typography>Discount <span className={classes.price} style={{color:'green',fontWeight:600}}>-₹{discount}</span></Typography>
                <Typography>Delivery Charge<span className={classes.price}>₹40</span></Typography>
                <Typography className={classes.totalAmount}>Total Amount<span className={classes.price}>₹{price - discount+40}</span></Typography>
                <Typography style={{color: 'green', fontWeight:600}}>You will save<span className={classes.price}>₹{discount - 40} on this order</span></Typography>
            </Box>
        </Box>
    )
}

export default TotalView;