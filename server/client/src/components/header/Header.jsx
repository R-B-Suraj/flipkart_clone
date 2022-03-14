import {AppBar, Toolbar, makeStyles,withStyles, Typography, Box, IconButton,Drawer, StepButton, List, ListItem} from '@material-ui/core';
// makeStyles component helps in changing the css of material ui components
import {Link} from 'react-router-dom';
import { useState } from 'react';
// // components
import SearchBar from './SearchBar';
import {Menu} from '@material-ui/icons';
import HeaderButtons from './HeaderButtons';

// these styles we apply to our components... from material ui
const useStyle = makeStyles(theme=>(
    {
        root: {
            flexGrow: 1,
        },
        header:{
            background:'#2874f0',
            height: 55,
        },
        title: {
            flexGrow:1 
        },
        logo: {
            width: 75
        },
        subURL:{
            width: 10,
            marginLeft: 4,
            height: 10
        },
        container:{
            display: 'flex',
           
        },
        component:{
            marginLeft: '12%',
            lineHeight: 0,
            textDecoration: 'none',
            color:'#ffffff',
            
        },
        subheading:{
            fontSize: 10,
            fontStyle: 'italic',
        },
        list:{
            width: 250,
        },
        menuButton:{
            display: 'none',
            [theme.breakpoints.down('sm')]:{
                display: 'block',
            }
        },
        customButtons:{
            margin: '0 7% 0 auto',
            [theme.breakpoints.down('sm')]:{
                display: 'none',
            }
        }
    }
))


const ToolBar = withStyles({
    root:{
        minHeight: 55
    }
})(Toolbar);
// apply on Toolbar component... from material ui 
// out ToolBar is modified version of the material ui Toolbar
// now we need to use our ToolBar


const Header = () =>{


    const classes = useStyle();
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);

    const handleClose = ()=>{
        setOpen(false);
    }
    const handleOpen = ()=>{
        setOpen(true);
    }

    const list = ()=>(
        <Box className={classes.list}  >
            <List>
                <ListItem>
                <HeaderButtons closeDrawer={handleClose}/>
                </ListItem>
            </List>
        </Box>
    );


    return (
        <div className={classes.root}>


            <AppBar className={classes.header}>
                <ToolBar>
                    <IconButton
                        color = 'inherit'
                        className={classes.menuButton}
                        onClick={handleOpen}
                    >
                        <Menu />
                    </IconButton>
                    <Drawer  open={open} onClose={handleClose}>
                        {list()}
                    </Drawer>
                    <Link to='/' className={classes.component} >
                        <img src={logoURL} className={classes.logo} />
                        <Box className={classes.container}>
                            <Typography className={classes.subheading}>Explore <Box component="span" style={{color:"#FFE500"}}>Plus</Box></Typography>
                            <img src={subURL} className={classes.subURL} />
                        </Box>
                        
                    </Link>
                    <SearchBar />
                    <span className={classes.customButtons} ><HeaderButtons /></span>
                </ToolBar>
                
            </AppBar>
        </div>
    );
}

export default Header;