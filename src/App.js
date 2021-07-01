import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './css/themify-icons/themify-icons.css';
import './css/layouts.css';
// import './css/header.css';
import './App.css';
import "./css/style.css";

import UserHeader from './layouts/user-header';
import AdminHeader from './layouts/admin-header';
import Footer from './layouts/footer';    
import Tutorial from "./components/tutorial.component";
import AddTutorial from "./components/add-tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import MainPage from "./layouts/main-page";
import SearchPage from './layouts/search-products';

import Women from './components/women.component';
import Men from './components/men.component';
import Event from './components/event.component';
import Cart from './components/cart.component';
import Checkout from './components/checkout.component';
import Vroom from './components/vroom.component';
import Payment from './components/payment.component';

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import ProductManagement from "./components/product-mgt.component";
import EventManagement from "./components/event-mgt.component";

import Image from './components/image'

// export default async function() {
//   let response = await fetch('http://localhost:8080/tutorials')

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
                <Nav.Link href="/login" onClick={this.logout}>Log Out</Nav.Link>
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
          <Route exact path="/women" component={Women} />
          <Route exact path="#men" component={Men} />
          <Route exact path="/event" component={Event} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route exact path="/v-fitting-room" component={Vroom} />
          
          <Route exact path="/product-mgt" component={ProductManagement} />
          <Route exact path="/event-mgt" component={EventManagement} />

          <Route exact path="/tutorials" component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />

          <Route path="/image" component={Image} />
        </Switch>

        <Footer />
      </div>
    )
  }
}

export default App;
