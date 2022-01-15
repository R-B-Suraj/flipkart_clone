import {Card, Box, Typography, Button}  from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';


// component
import GroupButtons from './GroupButtons';


const useStyle = makeStyles({
    component:{
        display:'flex',
        borderRadius: 0,
        borderTop: '1px solid #f0f0f0',
    },
    leftComponent:{
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    rightComponent:{
        margin: 20,

    },
    smallText:{
        fontSize: 14,
    },
    greyText:{
        color: '#878787',
    },
    price:{
        fontSize: 18,
        fontWeight: 600,
    },
    image:{
        height: 110,
        width: 110,

    },
    remove:{
        marginTop:20,
        fontSize: 16,
        fontWeight: 550,
    }
})



const CartItem = ({item,removeItemFromCart})=>{
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const classes = useStyle();

    return (
        <Card className={classes.component}>
            <Box className = {classes.leftComponent}>
                <img src={item.url} className={classes.image } />
                <GroupButtons cartItem={item} />
            </Box>
            <Box className={classes.rightComponent}>
                <Typography>{item.title.longTitle}</Typography>
                {/* fist give className and then give inline style */}
                <Typography className={clsx(classes.smallText, classes.greyText)} style={{marginTop: 10,} }>Seller:SuperComNet
                    <span><img src={fassured} style={{width: 50, marginLeft: 10 }}/></span>
                </Typography>
                <Typography style={{margin:'20px 0'}}>
                    <span className={classes.price}>₹{item.price.cost}</span> &nbsp;&nbsp;&nbsp;
                    <span className={classes.greyText}><strike>₹{item.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{color:'#388e3c'}}>{item.price.discount} off</span>
                </Typography>
                <Button  className={classes.remove} onClick={()=> removeItemFromCart(item.id)}>Remove</Button>
            </Box>
        </Card>
    )
}


export default CartItem;