import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/layouts.css';
import '../css/header.css';

export default function() {

    return (
        <Nav>
            <NavDropdown title="WOMEN" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/women">View All</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/tutorials">Tops</NavDropdown.Item>
                <NavDropdown.Item href="/tutorials/:id">Dresses</NavDropdown.Item>
                <NavDropdown.Item href="/add">Shorts</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="MEN" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/products-women">View All</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#shirts">Shirts</NavDropdown.Item>
                <NavDropdown.Item href="#pants">Pants</NavDropdown.Item>
                <NavDropdown.Item href="#suits">Suits</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/event">OFFER & EVENTS</Nav.Link>
            <Nav.Link href="#v-fitting-room">V-FITTING ROOM</Nav.Link>                    
        </Nav>
    )
}