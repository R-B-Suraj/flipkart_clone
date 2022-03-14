import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';




// components
import LoginDialog from '../login/Login';
import {LoginContext} from '../../context/ContextProvider';
import Profile from './Profile';




const useStyle = makeStyles(theme=>({
    login: {
        background: '#ffffff',
        color: '#2874f0',
        textTransform: 'none',
        // material ui by default applies text-tranform uppercase so log in written in lowercase will appear upper case
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 40px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]:{
            background:'#2874f0',
            color: '#ffffff',
        }


    },
    wrapper: {
       
        display: 'flex',
        // 'we want little gap between components inside wrapper... we can do it by 
        // assiging same class to each of the child components.. or we can write a style
        // inside the parent wrapper class which will get applied to each of the child components
        // this is done by '& > *': 
        '& > *': {
            marginRight: 50,
            fontSize: 14,
            alignItems: 'center',
            textDecoration: 'none',
            color: '#ffffff',
            [theme.breakpoints.down('sm')]:{
                color: '#2874f0',
                alignItems:'center',                
                display:'flex',
                flexDirection: 'column',
                marginTop: 10,
            }

        },
        [theme.breakpoints.down('sm')]:{
            display:'block',
        }

    },
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]:{
            display:'block'
        }
    }
}))


const HeaderButton = ({closeDrawer}) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    // make a state open and initialize with false.. because the material-ui Dialog only opens when open peoperty is set to true
    const { account, setAccount } = useContext(LoginContext);
    // acount, setAccount is the value that we passed to the LoginContext which we returned from ContextProvider.jsx
    console.log(account);

    const {cartItems} = useSelector(state => state.cart);



    const openLoginDialog = () => {
        setOpen(true);
        // value of open is set to true
    }




    return (
        <Box className={classes.wrapper}>
            {/* we should wrap our log in button inside the Link, because the wrapper's each child's style
             '& > *'  is directly applied to its child in this case it is button so the log in text is also
             white.. which makes it invisible as background of the button is also white */}
            {
                account ? <Profile account = {account} setAccount={setAccount} /> :
                    <Link>
                        <Button variant="contained" className={classes.login} onClick={() => openLoginDialog()}> Login</Button>
                    </Link>
            }
            <Link><Typography style={{ marginTop: 5 }}>More</Typography></Link>
            <Link to='/cart' className={classes.container}>
                {/* we should make color to white and textdecoration none.. to remove the default
                css of link as blue underline.. we can do this in the class container
                but it would be better if we did it in the wrapper because in we also have to use
                Link component for login page and then it's style  will also need to be handled separately
                 */}
                <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }} onClick={closeDrawer}>Cart</Typography>
            </Link>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Box>
    );
}


export default HeaderButton;