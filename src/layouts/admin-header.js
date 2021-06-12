import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/layouts.css';
import '../css/header.css';

export default function() {

    return(
        <Nav className="">
            <NavDropdown title="ADMIN BOARD" id="collasible-nav-dropdown">
                {/* <NavDropdown.Item href="#admin">View All</NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item href="#productmgt">Product Management</NavDropdown.Item>
                <NavDropdown.Item href="#promomgt">Event Management</NavDropdown.Item>
                <NavDropdown.Item href="#ordermgt">Order Management</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}