import {Button, ButtonGroup, makeStyles} from '@material-ui/core';
// GroupButton is used to group buttons  , used as GroupButton
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changeCount } from '../../redux/actions/cartActions';
import { useSelector } from 'react-redux';


const useStyle = makeStyles({
    component:{
        marginTop: 30,
    },
    button:{
        borderRadius:'50%',
    }
})


const GroupButtons = ({cartItem})=>{

    const classes = useStyle();

    // .........  modified ....................

    // const { cartItems } = useSelector(state => state.cart);

    const dispatch= useDispatch();
    // useEffect(() => {
    //     console.log(cartItems);
    // })

    // const removeItemFromCart = (id)=>{
    //     dispatch(removeFromCart(id));
    // }

    const modifyCount =(id, count)=>{
        dispatch(changeCount(id,count));
    }


    // ....................
  
    
    const [counter, setCounter] = useState(1);

    const handleDecrement = ()=>{
        setCounter(counter=> counter - 1);
        modifyCount(cartItem.id, -1);
        console.log(counter);
    }
    const handleIncrement = ()=>{
        setCounter(counter=> counter + 1);
        modifyCount(cartItem.id, 1);
        console.log(counter);
    }

    return (
        <ButtonGroup className={classes.component}>
            <Button onClick={()=>handleDecrement()} disabled = {counter==1} className={classes.button}>-</Button>
            <Button>{counter}</Button>
            <Button onClick={()=>handleIncrement()} className={classes.button}>+</Button>
        </ButtonGroup>

    )
}

export default GroupButtons;