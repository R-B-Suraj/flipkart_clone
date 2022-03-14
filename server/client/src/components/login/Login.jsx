
import { useState } from "react";
import { Dialog, DialogContent, makeStyles, Box, Typography, TextField, Button } from "@material-ui/core";
import { authenticateSignup, authenticateLogin } from "../../service/api";


const useStyle = makeStyles({
    //  when component width is set to 90vh we get a scroll bar because material-ui put a div in between
    // container dialog and  component dialog which we can't access... and its max-height is set to 600, we need to overwrite this
    // we can overwrite css either globally or locally.. globally overwrite we use createMuiTheme

    // or we can go to developer options in browser and check for the propertyname that Mui used inside
    // by default reference goes to the root element/class 
    // .MuiDialogContent-root:first-child {
    //   padding-top: 20px;
    // }  this is what is shows for the element style
    // by default we are in root.. of MuiDialogContent  which uses the component class here
    // we accessed the first child and set paddingTop to 0
    // changing style of child from parent  using '& > *':
    component: {
        height: '70vh',
        width: '90vh',
        padding: 0,
        '&:first-child': {
            paddingTop: 0
        },


    },
    image: {
        backgroundImage: `url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        height: '70vh',
        backgroundRepeat: 'no-repeat',
        background: '#2674f0',
        width: '40%',
        boxSizing: 'border-box',
        backgroundPosition: 'center 85%',
        padding: '45px 35px',
        '& > *': {
            color: '#ffffff',
            fontWeight: 600,
        }
    },
    login: {
        padding: '14px 35px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '& > *': {
            marginTop: 20,
        }
    },
    text: {
        color: '#878787',
        fontSize: 12,
    },
    loginBtn: {
        textTransform: 'none',
        background: '#fb641b',
        color: '#ffffff',
        height: 48,
        borderRadius: 2,

    },
    requestBtn: {
        textTransform: 'none',
        background: '#ffffff',
        color: '#2874f0',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    createText: {
        textAlign: 'center',
        marginTop: 'auto',
        fontSize: 14,
        color: '#2874f0',
        fontWeight: 600,
        cursor: 'pointer',

    },
    error:{
        color: '#ff6161',
        fontSize: 10,
        marginTop:10,
        fontWeight: 600,
        lineHeight:0
    }

})


const initialValue={
    login:{
        view:'login',
        heading:'Login',
        subHeading:'Get access to your Orders, Wishlist and Recommendations'
    },
    signup:{
        view:'signup',
        heading:'Looks Like You\'re new here!',
        subHeading:'Sign up with your mobile number to get started'
    }
}


const signupInitialValues = {
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password:'',
    phone:''
}

const loginInitialValues = {
    username:'',
    password:'',
   
}


const Login = ({ open, setOpen ,setAccount}) => {

    const classes = useStyle();

    const [account, setUserAccount] = useState(initialValue.login);
    // account is the state variable, setUserAccount is a function to set it's value, useState('login') 
    // account is initialized with login
    const [signup,setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    // {open}  is destructuring the property open from props object
    const [error, setError] = useState(false);
    
    
    
    
    const handleClose = () => {
        // props are read only , we can't set open = false and change the actual state
        setOpen(false);
        setUserAccount(initialValue.login);
        // while closing set it to login else when we click on login button it'll show signup page
    }

    const toggleAccount=()=>{
        setUserAccount(initialValue.signup);
    }

    const signupUser = async (signup)=>{
        // a asynchronous function... if post is successful response won't be undef... then close the login dialog
        let response = await authenticateSignup(signup);
        if(!response)  return;
        handleClose();
        setAccount(signup.username);
    }

    const loginUser = async (login)=>{
        let response = await authenticateLogin(login);
        if(!response){
            setError(true);
            return;
        }
        handleClose();
        setAccount(login.username);
    }

    const onInputChange =(e)=>{
        // destructure the signup state and update some values...
        // we put [] for key value pair
        setSignup({...signup,[e.target.name]:e.target.value});
        console.log('signup info .  ',signup);
    }
    const onValueChange = (e)=>{
        setLogin({...login, [e.target.name]: e.target.value});
        console.log('login info.  ',login);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth='false'>
            <DialogContent className={classes.component}  >
                <Box style={{ display: 'flex' }}>
                    {/* something is written on the log in image.. so better not to use
                        img tag for image.. add image using css class */}
                    <Box className={classes.image}>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ?
                            <Box className={classes.login}>
                                {/* in material ui placeholder comes as label */}
                                <TextField onChange={(e)=>onValueChange(e)} name='username' label='Enter username' />
                                <TextField onChange={(e)=>onValueChange(e)}name='password' label='Enter Password' />
                                {error && <Typography className={classes.error} >Invalid username or password</Typography>}
                                
                                <Typography className={classes.text}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                                <Button onClick={()=>loginUser(login) }variant='contained' className={classes.loginBtn}>Login</Button>
                                <Typography className={classes.text} style={{ textAlign: 'center' }}>OR</Typography>
                                <Button variant='contained' className={classes.requestBtn}>Request OTP</Button>
                                <Typography onClick={()=>toggleAccount()} className={classes.createText}>New to Flipkart? Create an account</Typography>

                            </Box> :

                            <Box className={classes.login}>
                                {/* in material ui placeholder comes as label , we can access name property 
                                 of the target where event has occured to differentiate whether it is 
                                 email field or firstname etc*/}
                                <TextField onChange={(e)=>onInputChange(e)} name='firstname' label='Enter Firstname' />
                                <TextField onChange={(e)=>onInputChange(e)} name='lastname' label='Enter Lastname' />
                                <TextField onChange={(e)=>onInputChange(e)} name='username' label='Enter Username' />
                                <TextField onChange={(e)=>onInputChange(e)} name='email' label='Enter Email' />
                                <TextField onChange={(e)=>onInputChange(e)} name='password' label='Enter Password' />
                                <TextField onChange={(e)=>onInputChange(e)} name='phone' label='Enter Phone' />
                                <Button variant='contained'onClick={()=>signupUser(signup)} className={classes.loginBtn}>Signup</Button>
                                

                            </Box>

                    }

                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Login;