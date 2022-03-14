
import { useState } from 'react';

import { Typography, Menu,MenuItem , makeStyles} from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
// adding Link will make the cursor a pointer


const useStyle = makeStyles({
    component: {
        marginTop: 40,

    },
    logout:{
        marginLeft: 15,
        fontSize: 14,
    }
})


const Profile = ({ account, setAccount }) => {


    const classes = useStyle();

    const [open, setOpen] = useState(false);

    const handleClose = ()=>{
        setOpen(false);
    }

    const handleOpen = (event)=>{
        setOpen(event.currentTarget);
    }

    const logout=()=>{
        setAccount('');
    }


    return (
        <>
            <Link><Typography onClick={handleOpen} style={{ marginTop: 4 }}>{account}</Typography></Link>
            <Menu
           
                anchorEl={open}
                className = {classes.component}  
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={()=>{handleClose(); logout(); }}>
                    <PowerSettingsNewIcon fontSize="small" color="primary"/>
                    <Typography className={classes.logout}>Logout</Typography>
                </MenuItem>
             
            </Menu>
        </>
    )
}

export default Profile;