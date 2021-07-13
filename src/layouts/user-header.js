import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/layouts.css';

export default function() {

    return (
        <Nav className='mr-auto'>
            <Nav.Link href="/women-products">WOMEN</Nav.Link>
            <Nav.Link href="/men-products">MEN</Nav.Link>
            {/* <NavDropdown title="WOMEN" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/women-products">View All</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Tops</NavDropdown.Item>
                <NavDropdown.Item href="#">Dresses</NavDropdown.Item>
                <NavDropdown.Item href="#">Shorts</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="MEN" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/men-products">View All</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#shirts">Shirts</NavDropdown.Item>
                <NavDropdown.Item href="#pants">Pants</NavDropdown.Item>
                <NavDropdown.Item href="#suits">Suits</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="/events">OFFER & EVENTS</Nav.Link>
            <Nav.Link href="/v-fitting-room">V-FITTING ROOM</Nav.Link>                    
        </Nav>
    )
}