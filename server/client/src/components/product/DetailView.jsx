import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, makeStyles, Typography,Grid, Table,TableRow,TableBody,TableCell } from '@material-ui/core';
import { LocalOffer as Badge} from '@material-ui/icons';
import clsx from 'clsx';
// by default react className doesn't accept multiple classes at a time 
// it only accept the last one mentioned...
// so we use a package clsx   clsx(class1,clss2,etc...)


// components
import ActionItems from "./ActionItems"; 


const useStyle = makeStyles(theme=>({
    component: {
        marginTop: 55,
        backgroundColor: '#f2f2f2',


    },
    container: {
        // margin: '0px 80px',
        backgroundColor: '#ffffff',
        display: 'flex',
        [theme.breakpoints.down('md')]:{
            margin: 0,
        }

    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10,
        },
        [theme.breakpoints.down('md')]:{
            marginLeft: 40
        }
    },
    smallText: {
        fontSize: 14,
        verticalAlign: 'baseline',
        '& > *':{
            fontSize:14,
            marginTop:10,
        }
    },
    grayText: {
        color: '#878787',
    },
    price: {
        fontSize: 28,
        fontWeight: 600,
    },
    badge:{
        fontSize: 15,
        marginRight: 10,
        color: '#00cc00',
    },
    noborder:{
        borderBottom: 'none'
    }
}))



// be default we get accesss to some props of the functional components
const DetailView = ({ match }) => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const sellerURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const { product } = useSelector(state => state.getProductDetails);
    // this is an asynchronous call , so there is high chance that product is undefined and we are trying to 
    // render it's title in Typography component in below code , so app may crash
    // useEffect is run after return statement   in react 
    const dispatch = useDispatch();

    const date = new Date(new Date().getTime()+ (5*24*60*60*1000) );
    // Date returns  timestamp which gives error if we are trying to print it as a string

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
    }, [dispatch]);

    return (
        <Box className={classes.component}>
            {
                product && Object.keys(product).length &&
                <Grid container className={classes.container}>
                    <Grid item lg={5} md={5} sm={8} xs={12} style={{ minWidth:'40%'}}>
                        <ActionItems product = {product} />
                    </Grid>
                    <Grid item lg={7} md ={6} sm={9} xs={12} className={classes.rightContainer}>
                        <Typography>{product.title.longTitle}</Typography>
                        <Typography className={clsx(classes.smallText, classes.grayText)}>
                            8 ratings & 1 review
                            <span><img src={fassured} style={{ width: 77, marginLeft: 20 }} /></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price.mrp}</span> &nbsp;&nbsp;&nbsp;
                            <span className={classes.grayText}><strike>₹{product.price.cost}</strike></span> &nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>{product.price.discount}off</span>
                        </Typography>
                        <Typography style={{marginTop: 20,fontWeight:600}}>Available Offers</Typography>
                        <Box className={classes.smallText}>
                            <Typography><Badge className = {classes.badge} />Special PriceGet extra 5% off (price inclusive of discount)</Typography>
                            <Typography><Badge className = {classes.badge} />Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit Card&C</Typography>
                            <Typography><Badge className = {classes.badge} />Partner OfferSign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100</Typography>
                        </Box>
 
                        <Table>
                            <TableBody>
                                <TableRow className={classes.smallText}>
                                    <TableCell classes={{root:classes.noborder}} className={classes.grayText}>Delivery</TableCell>
                                    <TableCell classes={{root:classes.noborder}}style={{fontWeight:600}}>{date.toDateString()} | ₹40</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell classes={{root:classes.noborder}}className={classes.grayText}>Warranty</TableCell>
                                    <TableCell classes={{root:classes.noborder}}>No Warranty</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell classes={{root:classes.noborder}} className={classes.grayText}>Seller</TableCell>
                                    {/* we made TableRow smalltext  and this is passed to the first child
                                       but we also have the second table cell on which it isn't applied */}
                                    <TableCell classes={{root:classes.noborder}} className={classes.smallText} >
                                        <span style={{color: '#2874f0'}}>SuperComNet</span>
                                        <Typography>GST Invoice Available</Typography>
                                        <Typography>14 Days Return Policy</Typography>
                                        <Typography>View More Sellers Starting From ₹300</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{root:classes.noborder}} colSpan={2}>
                                        <img src = {sellerURL} style={{width: 390}} />
                                    </TableCell> 
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell classes={{root:classes.noborder}} className={classes.grayText}>Description</TableCell>
                                    <TableCell classes={{root:classes.noborder}}>{product.description}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                </Grid>
            }

        </Box>
    )
}


export default DetailView;