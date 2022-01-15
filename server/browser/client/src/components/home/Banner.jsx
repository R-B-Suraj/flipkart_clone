


import Carousel from 'react-material-ui-carousel';
import { bannerData } from '../../constants/data';
import { makeStyles } from '@material-ui/core';



const useStyle = makeStyles(theme =>({
    image:{
        width: '100%',
        height: 280,
        [theme.breakpoints.down('sm')] :{
            objectFit: 'cover',
            height: 180,
        }
    },
    // objectFit zoom in important part of image and don't let the image break 
    carousel:{
        marginTop:10,

    }
}))




const Banner = ()=>{

    const classes = useStyle();


    return (
        <Carousel
            autoPlay={true}
            animation='slide'
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            navButtonsProps={{
                style:{
                    background:'#ffffff',
                    color:'#494949',
                    borderRadius:2,
                    margin:0,
                    fontWeight:550,
                    height:60,
                }
            }}
            className={classes.carousel}

        >
            {
                bannerData.map(image =>(
                    <img src={image} className={classes.image} alt="deals"/>
                ))
            }
        </Carousel>
    )
}

export default Banner;