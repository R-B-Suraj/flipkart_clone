import { BrowserRouter, Switch, Route } from 'react-router-dom';

// components
import Header from './components/header/Header';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import Contextprovider from './context/ContextProvider';
import DetailView from './components/product/DetailView';
import { Box } from '@material-ui/core';



function App() {
  return (
    // we applied contextProvider to whole project because we may need the login context/information anywhere in our app
    <Contextprovider>
      <BrowserRouter>
        {/* BrowserRouter  wraps our app and enables routing within our app */}
        <Header />
        <Box style={{ marginTop: 54 }} >
          <Switch>
            {/* switch is used to switch between routes which will create different components and render it ie a different page
            here we want our header to be intact but if we click on the cart the orders cart page should come 
            under the header of the app instead of the home components 
            but if we use Route we have to change url, if we use Link 
            in buttons or any element that will change the url accordingly as the to='path' is provided*/}
            <Route exact path='/' component={Home} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/product/:id' component={DetailView} />

          </Switch>
        </Box>
      </BrowserRouter>
    </Contextprovider>
  );
}

export default App;
