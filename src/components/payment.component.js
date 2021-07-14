import React, { Component } from "react";

import OrderDataService from "../services/order.service";
import OrderItemDataService from "../services/orderItem.service";
import AuthService from "../services/auth.service";

export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePoscode = this.onChangePoscode.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeBank = this.onChangeBank.bind(this);
        this.onChangeBankAcc = this.onChangeBankAcc.bind(this);
        this.retrieveOrder = this.retrieveOrder.bind(this);
        this.retrieveOrderItem = this.retrieveOrderItem.bind(this);
        this.payment = this.payment.bind(this);
        this.saveOrder = this.saveOrder.bind(this);

        this.state = {
            date: new Date().toDateString(),
            order: [],
            orderItem: [],
            users: [],
            currentUser: AuthService.getCurrentUser(),
            currentIndex: -1,

            username: '',
            address: '',
            poscode: '',
            state: '',

            currentOrder: {
                id: null,
                date: '',
                payment: '',
                contact: '',
                bankname: '',
                bankacc: '',
                shippingname: '',
                shippingaddress: '',
                shippingcontact: ''
            }
        };
    }

    componentDidMount() {
        this.retrieveOrder(this.props.match.params.id);
        this.retrieveOrderItem();
    }

    onChangeUsername(e) {
        const username = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    username: username
                }
            };
        });
    }
    onChangeContact(e) {
        const contact = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    contact: contact
                }
            };
        });
    }
    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    address: address
                }
            };
        });
    }
    onChangePoscode(e) {
        const poscode = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    poscode: poscode
                }
            };
        });
    }
    onChangeState(e) {
        const state = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    state: state
                }
            };
        });
    }
    onChangeBank(e) {
        this.setState({
            bankname: e.target.value
        });
    }
    onChangeBankAcc(e) {
        this.setState({
            bankacc: e.target.value
        });
    }

    retrieveOrderItem() {
        OrderItemDataService.getAll()
            .then(res => {
                this.setState({
                    orderItem: res.data
                })
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveOrder(id) {
        OrderDataService.get(id)
            .then(response => {
                this.setState({
                    currentOrder: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    payment() {
        this.setState({
            order: [],
            orderItem: []
        });
    }

    saveOrder() {
        var data = {
            id: this.state.currentOrder.id,
            date: this.state.currentOrder.date,
            payment: this.state.currentOrder.payment,
            shippingname: this.state.currentOrder.shippingname,
            shippingaddress: this.state.currentOrder.shippingaddress,
            shippingcontact: this.state.currentOrder.shippingcontact,
            bankname: this.state.currentOrder.bankname,
            bankacc: this.state.currentOrder.bankacc,
            accepted: true,
            completed: false,
        };

        OrderDataService
            .update(this.state.currentOrder.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentOrder: {
                        ...prevState.currentOrder,
                        accepted: true,
                        completed: false,
                    }
                }))
                console.log(response.data);
                this.payment();
                this.props.history.push('/status')
            })
            .catch(e => {
                console.log(e);
                alert("Failed! Please check all details are filled.")
            });
    }

    render() {
        const { currentOrder, order, currentUser } = this.state;
        currentOrder.shippingname = currentUser.username;
        currentOrder.shippingaddress = currentUser.address + ", " + currentUser.poscode + ", " + currentUser.state;
        currentOrder.date = this.state.date;
        currentOrder.shippingcontact = currentUser.contact;
        currentOrder.bankname = this.state.bankname;
        currentOrder.bankacc = this.state.bankacc;

        return (
            <div className="">
                <header className="jumbotron">
                    <h3 className='text-center'>PAYMENT PAGE</h3>
                    <p>(PLEASE DON'T LEAVE THIS PAGE BEFORE SUBMIT)</p>
                </header>
                <div className='mainContainer'>
                    {currentOrder ? (
                        <div>
                            <form className='d-flex justify-content-center row'>
                                <div className=''>
                                    <div className='d-flex'>
                                        <div className="billing-div">
                                            <h5 className="mb-4">Shipping Information</h5>
                                            <div className="signup-form-row">
                                                <div className="form-group signup-form-group">
                                                    <label htmlFor="username">Receiver Name</label>
                                                    <input
                                                        type="text"
                                                        size="25"
                                                        className="form-control"
                                                        name="username"
                                                        value={currentUser.username}
                                                        onChange={this.onChangeUsername}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group signup-form-group">
                                                    <label htmlFor="contact">Contact Number</label>
                                                    <input
                                                        type="text"
                                                        size="25"
                                                        className="form-control"
                                                        name="contact"
                                                        value={currentUser.contact}
                                                        onChange={this.onChangeContact}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className='signup-form-row'>
                                                <div className="form-group signup-form-group-address">
                                                    <label htmlFor="address">Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="address"
                                                        value={currentUser.address}
                                                        onChange={this.onChangeAddress}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className='signup-form-row'>
                                                <div className="form-group signup-form-group">
                                                    <label htmlFor="poscode">Postcode</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id='poscode'
                                                        name="poscode"
                                                        value={currentUser.poscode}
                                                        onChange={this.onChangePoscode}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group signup-form-group">
                                                    <label htmlFor="state">State</label>
                                                    <select
                                                        list="state"
                                                        className="form-control"
                                                        name="state"
                                                        value={currentUser.state}
                                                        onChange={this.onChangeState}
                                                        required >
                                                        <option value="Johor">Johor</option>
                                                        <option value="Kedah">Kedah</option>
                                                        <option value="Kelantan">Kelantan</option>
                                                        <option value="Melaka">Melaka</option>
                                                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                                                        <option value="Pahang">Pahang</option>
                                                        <option value="Penang">Penang</option>
                                                        <option value="Perak">Perak</option>
                                                        <option value="Perlis">Perlis</option>
                                                        <option value="Sabah">Sabah</option>
                                                        <option value="Sarawak">Sarawak</option>
                                                        <option value="Selangor">Selangor</option>
                                                        <option value="Terengganu">Terengganu</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=''>
                                    <div className='payment-div'>
                                        <div>
                                            <div className='form-group row justify-content-between mt-4 mr-0'>
                                                <label className='col' htmlFor="date">Date</label>
                                                <input
                                                    type="text"
                                                    className="col text-right form-control"
                                                    name="date"
                                                    defaultValue={this.state.date}
                                                    required disabled
                                                />
                                            </div>

                                            <div className="form-group payment-form-group">
                                                <label htmlFor="bankname">Bank</label>
                                                <select
                                                    list="bankname"
                                                    className="form-control"
                                                    name="bankname"
                                                    onChange={this.onChangeBank}
                                                    required >
                                                    <option value="Bank" disabled selected hidden>Choose a Bank</option>
                                                    <option value="Affin Bank">Affin Bank</option>
                                                    <option value="AmBank">AmBank</option>
                                                    <option value="Bank Rakyat">Bank Rakyat</option>
                                                    <option value="CIMB Bank">CIMB Bank</option>
                                                    <option value="Citibank">Citibank</option>
                                                    <option value="Hong Leong Bank">Hong Leong Bank</option>
                                                    <option value="HSBC Bank">HSBC Bank</option>
                                                    <option value="Maybank">Maybank</option>
                                                    <option value="OCBC Bank">OCBC Bank</option>
                                                    <option value="Public Bank">Public Bank</option>
                                                    <option value="RHB Bank">RHB Bank</option>
                                                    <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                                                    <option value="United Overseas Bank">United Overseas Bank</option>
                                                </select>
                                            </div>
                                            <div className="form-group payment-form-group">
                                                <label htmlFor="bankacc">Bank Account Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="bankacc"
                                                    onChange={this.onChangeBankAcc}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group row justify-content-between mt-4 mr-0'>
                                                <label className='col' htmlFor="totalprice">Total (RM)</label>
                                                <input
                                                    type="number"
                                                    className="col text-right form-control"
                                                    name="totalprice"
                                                    defaultValue={currentOrder.payment}
                                                    required disabled
                                                />
                                            </div>

                                            <div className=''>
                                                <a className="btn btn-primary paybtn" onClick={this.saveOrder}>Pay</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>No order</div>
                    )
                    }
                </div>
            </div>
        );
    }
}