
import { imageURL } from "../../constants/data";
import { Box, Grid, makeStyles } from "@material-ui/core";


const useStyle = makeStyles(theme=>({
    wrapper: {
        display: 'flex',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    coronaBanner:{
        [theme.breakpoints.down('md')]:{
            objectFit: 'cover',
            height: 130,
        }
    }
}))



const MidSection = () => {

    const classes = useStyle();
    const coronaURL = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';


    return (
        <>
            <Grid lg={12} sm={12}  md={12}  xs={12} container className={classes.wrapper}>
                {
                    imageURL.map(image => (
                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <img src={image} style={{ width: '100%' }} />
                        </Grid>
                    ))
                }
                {/* iamge width is set to 100% so it takes evety portion of the grid item area */}
            </Grid>
            <img src={coronaURL} className={classes.coronaBanner} style={{ width: '100%', marginTop: 20 }}/>
        </>
    )
}

export default MidSection;