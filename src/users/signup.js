import React, {Component } from "react";
import UserDataService from "../services/user.service";
import Form from "react-bootstrap/Form";
import FormCheck from 'react-bootstrap/FormCheck'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/layouts.css";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangePoscode = this.onChangePoscode.bind(this);
        this.onChangeContactNo = this.onChangeContactNo.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            gender: "",
            dob: "",
            address: "",
            state: "",
            poscode: "",
            contactNo: "",

            submitted: false
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onChangeDOB(e) {
        this.setState({
            dob: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }
    onChangePoscode(e) {
        this.setState({
            poscode: e.target.value
        });
    }
    onChangeContactNo(e) {
        this.setState({
            contactNo: e.target.value
        });
    }

    saveUser() {
        var data = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            dob: this.state.dob,
            address: this.state.address,
            state: this.state.state,
            poscode: this.state.poscode,
            contactNo: this.state.contactNo
        };

        UserDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    password: response.data.password,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    gender: response.data.gender,
                    dob: response.data.dob,
                    address: response.data.address,
                    state: response.data.state,
                    poscode: response.data.poscode,
                    contactNo: response.data.contactNo,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newUser() {
        this.setState({
            id: null,
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            gender: "",
            dob: "",
            address: "",
            state: "",
            poscode: "",
            contactNo: "",

            submitted: false
        });
    }
    
    render() {
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className='btn btn-success' onClick={this.newUser}>Add</button>
                    </div>
                ) : (
                    <Form noValidate onSubmit={this.newUser}>
                        <Form.Text><h3>Create An Account</h3></Form.Text>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                                <Form.Label>Username (Email)</Form.Label>
                                <Form.Control
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        name='username' />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustomPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                        required
                                        type="text"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        name='password' />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                Password must include at least one number and one character.
                            </Form.Control.Feedback>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                        required
                                        type="text"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onChange={this.onChangeFirstName}
                                        name='firstName' />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={this.onChangeLastName}
                                        name='lastName' />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                <Form.Label>Gender</Form.Label>
                                <Row>
                                    <Form.Check inline type="radio"
                                                label="Male"
                                                name="gender"
                                                id="male" />
                                    <Form.Check inline type="radio"
                                                label="Female"
                                                name="gender"
                                                id="female" />
                                </Row>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                        required
                                        type="date"
                                        value={this.state.dob}
                                        onChange={this.onChangeDOB}
                                        name='dob' />
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustom08">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                        required
                                        type="tel"
                                        placeholder="012-3456789"
                                        value={this.state.contactNo}
                                        onChange={this.onChangeContactNo}
                                        name='contactNo'
                                        pattern="[0-9]{3}-[0-9]{7}" />
                            </Form.Group>
                        </Form.Row>                            
                        
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                        required
                                        type="text" 
                                        placeholder="Address"
                                        value={this.state.address}
                                        onChange={this.onChangeAddress}
                                        name='address' />
                            </Form.Group>
                            
                            <Form.Group as={Col} md="3" controlId="validationCustom07">
                                <Form.Label>Poscode</Form.Label>
                                <Form.Control 
                                        required
                                        type="text" 
                                        placeholder="Poscode"
                                        value={this.state.poscode}
                                        onChange={this.onChangePoscode}
                                        name='poscode' />
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom06">
                                <Form.Label>State</Form.Label>
                                <Form.Control custom
                                              as="select" 
                                              id="inlineFormCustomSelectPref"
                                              required
                                              value={this.state.state}
                                              onChange={this.onChangeState}
                                              name='state' >
                                    <option value="0">State</option>
                                    <option value="1">Johor</option>
                                    <option value="2">Kedah</option>
                                    <option value="3">Kelantan</option>
                                    <option value="4">Melaka</option>
                                    <option value="5">Negeri Sembilan</option>
                                    <option value="6">Pahang</option>
                                    <option value="7">Penang</option>
                                    <option value="8">Perak</option>
                                    <option value="9">Perlis</option>
                                    <option value="10">Sabah</option>
                                    <option value="11">Sarawak</option>
                                    <option value="12">Selangor</option>
                                    <option value="13">Terengganu</option>
                            </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            
                        </Form.Row>
                        <Form.Group>
                            <Form.Check
                            required
                            name="terms"
                            label="Terms & Conditions"
                            // onChange={handleChange}
                            // isInvalid={!!errors.terms}
                            // feedback={errors.terms}
                            // id="validationFormik0"
                            />
                        </Form.Group>
                        <Button type="submit" onClick={this.saveUser} className='button btn btn-success'>CREATE ACCOUNT</Button>
                    </Form>
                    // <div>
                    //     <div className='form-group'>
                    //         <label htmlfor='title'>Title</label>
                    //         <input 
                    //             type='text'
                    //             className='form-control'
                    //             id='title'
                    //             required
                    //             value={this.state.title}
                    //             onChange={this.onChangeTitle}
                    //             name='title' 
                    //         />
                    //     </div>
                    //     <div className='form-group'>
                    //         <label htmlfor='description'>Description</label>
                    //         <input 
                    //             type='text'
                    //             className='form-control'
                    //             id='description'
                    //             required
                    //             value={this.state.description}
                    //             onChange={this.onChangeDescription}
                    //             name='description' 
                    //         />
                    //     </div>
                    //     <button onClick={this.saveUser} className='btn btn-success'>Submit</button>
                    // </div>
                )}
            </div>
        );
    }
}
