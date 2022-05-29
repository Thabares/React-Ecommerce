import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from './pages/Success';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  const quantity = useSelector(state => state.cart.quantity)
  return <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products/:category">
        <ProductList />
      </Route>
      <Route path="/product/:id">
        <Product />
      </Route>
      <Route path="/cart">
        {user && quantity > 0 ?
          <Cart /> : <Redirect to="/" />
        }
      </Route>
      <Route path="/success">
        <Success />
      </Route>
      <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/signup">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/admin/login">
        <Login />
      </Route>
    </Switch>
  </Router>
};

export default App;
