import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/layouts.css';
import '../css/header.css';

export default function() {
// export default async function() {
//     let response = await fetch('http://localhost:8080/tutorials')
    return(
        <Navbar>
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />  */}
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="WOMEN" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/women">View All</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/products">Tops</NavDropdown.Item>
                        <NavDropdown.Item href="/tutorials/:id">Dresses</NavDropdown.Item>
                        <NavDropdown.Item href="/add">Shorts</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="MEN" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/men">View All</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#shirts">Shirts</NavDropdown.Item>
                        <NavDropdown.Item href="#pants">Pants</NavDropdown.Item>
                        <NavDropdown.Item href="#suits">Suits</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#sale">SALES</Nav.Link>
                    <Nav.Link href="#v-fitting-room">V-FITTING ROOM</Nav.Link>                    
                </Nav>
                {/* <Nav>
                    <Nav.Link className='nav-link fa fa-search' aria-hidden="true" href="/products"></Nav.Link>
                    <Nav.Link className='nav-link fa fa-user-circle-o' aria-hidden="true" href="/login"></Nav.Link>
                    <Nav.Link className='nav-link fa fa-shopping-cart' aria-hidden="true" eventKey={2} href="#cart"></Nav.Link>
                </Nav> */}
            </Navbar.Collapse>
        </Navbar>
    )
}