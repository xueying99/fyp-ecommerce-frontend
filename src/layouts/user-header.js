import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import '../css/layouts.css';

export default function() {

    return (
        <Nav className='mr-auto'>
            <Nav.Link href="/women-products">WOMEN</Nav.Link>
            <Nav.Link href="/men-products">MEN</Nav.Link>
            <Nav.Link href="/events">OFFER & EVENTS</Nav.Link>
            <Nav.Link href="/v-fitting-room">SIZE GUIDANCE</Nav.Link>                    
        </Nav>
    )
}