import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import { getProducts as listProducts } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem} from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

  search: {
    borderRadius: 2,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 5,
    width: '38%',
    display: 'flex',

  },

  searchIcon: {
    padding: 5,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',

  },
  inputRoot: {
    fontSize: 'unset',
    width: '100%',
    paddingLeft: 20,

  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

  },
  list:{
    position:'absolute',
    color: '#000',
    backgroundColor: '#fff',
    marginTop: 36,
  }
}));

const SearchBar = () => {
  const classes = useStyles();
  const [text, setText] = useState();
  const [hide, setHide] = useState(true);

  const getText = (text) => {
    setText(text);
    setHide(false);
    // console.log(text);
  }



  const { products } = useSelector(state => state.getProducts);
  // useSelector(controller function )  we can call getProducts directly using state which is available

  const dispatch = useDispatch();
  // we want to call the getProducts   whenever home component is mounted .. using useEffect()
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);



  return (


    <div className={classes.search}>

      <InputBase
        placeholder="Search for products, brands and more"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => getText(e.target.value)}
      />
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      {
        text &&
        <List className={classes.list} hidden={hide}>
          {
            products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
              <ListItem>
                <Link 
                to={`product/${product.id}`} 
                style={{textDecoration:'none', color: 'inherit'}}
                onClick={()=>setHide(true)}
                >
                {product.title.longTitle}
                </Link>
              </ListItem>
            ))
            
          }      

        </List>
      }
    </div>

  );
}



export default SearchBar;