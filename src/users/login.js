import React, { Component, useState } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/layouts.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "username@customer.com",
            password: "password123"
        };
    }

    componentDidMount() {
        // this.retrieveUsername();
    }


    render() {
        // const { searchUsername, username, currentUsername, currentIndex } = this.state;

        return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className='forgotPassword'>
                            <Link to="/forgetPassword">Forget Password?</Link>              
                        </div>
                        <Button className='button' variant="primary" type="submit" onClick={ () => this.LoginButtonClick() }>
                            LOGIN
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Link to="/signup">Do not have an account yet? Click here to Sign Up</Link> 
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}