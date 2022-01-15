
import { Box, makeStyles } from "@material-ui/core";
// import { products } from '../../constants/data';

// components
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
// slide is a reusable component , but we don't need the timer in each slide...
// so we pass a prop  to the slide component
import MidSection from "./MidSection";
import {useDispatch, useSelector} from 'react-redux'; 
import { useEffect } from "react";
import { getProducts as listProducts } from "../../redux/actions/productActions";



const useStyle = makeStyles(theme=>({
    component: {
        padding: 10,
        background: '#f2f2f2',
    },
    rightWrapper: {
        background: '#ffffff',
        padding: 5,
        margin: '12px 0 0 10px',
        [theme.breakpoints.down('md')]:{
            display:'none',
        }
    },
    leftSlide:{
        width: '83%',
        [theme.breakpoints.down('md')]:{
            width: '100%',
        }
    }
}))


const Home = () => {
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';
    const classes = useStyle();

    const {products} = useSelector(state => state.getProducts);
    // useSelector(controller function )  we can call getProducts directly using state which is available

    const dispatch = useDispatch();
    // we want to call the getProducts   whenever home component is mounted .. using useEffect()
    useEffect(()=>{
        dispatch(listProducts());
    }, [dispatch]);

    // useEffect called only when dispatch changes
    // when useSelector is called.. ie. getProducts is successful 
    // then dispatch = useDispatch()  will change 
    // and if dispatch changes then useEffect is called


    return (
        <div>
            <NavBar />
            <Box className={classes.component} >
                <Banner />
                <Box style={{ display: 'flex' }}>
                    <Box className={classes.leftSlide}>
                        <Slide
                            timer={true}
                            title="Deals Of The Day"
                            products={products}
                        />
                    </Box>
                    <Box className={classes.rightWrapper}>
                        <img src={adURL} style={{ width: 230 }} />
                    </Box>
                </Box>

                <MidSection />

                <Slide
                    timer={false}
                    title="Discounts For You"
                    products={products}
                />
                <Slide
                    timer={false}
                    title="Suggested Items"
                    products={products}
                />
                <Slide
                    timer={false}
                    title="Top Selections"
                    products={products}
                />
                <Slide
                    timer={false}
                    title="Recommended Items"
                    products={products}
                />
                <Slide
                    timer={false}
                    title="Best Sellers"
                    products={products}
                />
                
            </Box>
        </div>


    );
}


export default Home;