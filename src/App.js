import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './css/themify-icons/themify-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/layouts.css';
import './App.css';
import "./css/style.css";

import UserHeader from './layouts/user-header';
import AdminHeader from './layouts/admin-header';
import Footer from './layouts/footer';    
import MainPage from "./layouts/main-page";
import SearchPage from './layouts/search-products';
import Status from "./layouts/status";
import Product from "./components/product.component";
import Women from './components/women-list.component';
import Event from './components/event.component';
import EventList from './components/event-list.component';
import Cart from './components/cart.component';
import Checkout from './components/checkout.component';
import Vroom from './components/vroom.component';
import Payment from './components/payment.component';

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Logout from "./layouts/logout";

import ProductManagement from "./components/product-mgt.component";
import EventManagement from "./components/event-mgt.component";
import OrderManagement from "./components/order-mgt.component";
import UploadImages from "./components/upload-files.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logout() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg"  variant="dark" sticky="top" className="bg-transparent affix">
          <Navbar.Brand href="/">
            <img src='/images/fortry-logo-transparent.png' alt='Fortry Logo' className='fortry-logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link className='nav-btn' href="/home">HOME</Nav.Link>
              <UserHeader />
            </Nav> 
            
            {showModeratorBoard && (
              <li className="nav-item">
                {/* <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link> */}
              </li>
            )}

            {showAdminBoard && (
              <Nav className="ml-0 mr-auto">
                <AdminHeader />
              </Nav>
            )}
            
            {/* {currentUser && ( 
               <Nav className="mr-auto">
                 <UserHeader /> 
               </Nav>
             )} */}
            {currentUser ? (
              <Nav className="home-nav">
                <Nav.Link className='nav-link fa fa-user-circle-o' aria-hidden="true" href="/profile"></Nav.Link>
                <label className='nav-username'>Hi, {currentUser.username} !</label>
                <Nav.Link className='nav-link fa fa-search' aria-hidden="true" href="/search"></Nav.Link>
                <Nav.Link className='nav-link fa fa-shopping-cart' aria-hidden="true" href="/cart"></Nav.Link>
                <Nav.Link href="/logout" onClick={this.logout}>Log Out</Nav.Link>
              </Nav>
            ) : (
              <Nav className="home-nav">
                <Nav.Link className='nav-link fa fa-search' aria-hidden="true" href="/products"></Nav.Link>
                <Nav.Link className='nav-home' href="/login">Login</Nav.Link>
                <Nav.Link className='nav-home' href="/register">Sign Up</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path={["/", "/home"]} component={MainPage} />  
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/products" component={Women} />
          <Route exact path="/events" component={EventList} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route exact path="/v-fitting-room" component={Vroom} />
          <Route path="/status" component={Status} />
          
          <Route exact path="/product-mgt" component={ProductManagement} />
          <Route exact path="/event-mgt" component={EventManagement} />
          <Route exact path="/order-mgt" component={OrderManagement} />
          <Route exact path="/image-mgt" component={UploadImages} />

          <Route path="/products/:id" component={Product} />
          <Route path="/events/:id" component={Event} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/logout" component={Logout} />
        </Switch>

        <Footer />
      </div>
    )
  }
}

export default App;
