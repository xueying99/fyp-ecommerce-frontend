import React, { Component } from "react";
import CartDataService from "../services/cart.service";
import OrderDataService from "../services/order.service";
import AuthService from "../services/auth.service";

export default class Payment extends Component {
    constructor(props) {
        super(props);
        // this.onChangeTitle = this.onChangeTitle.bind(this);
        // this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.getOrder = this.getOrder.bind(this);
        // this.deleteTutorial = this.deleteTutorial.bind(this);
        // this.updatePublished = this.updatePublished.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.retrieveOrder = this.retrieveOrder.bind(this);
        this.retrieveCart = this.retrieveCart.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePoscode = this.onChangePoscode.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeBank = this.onChangeBank.bind(this);
        this.onChangeBankAcc =this.onChangeBankAcc.bind(this);
        this.savePayment = this.savePayment.bind(this);

        this.state = {
            order: [],
            payment: [],
            users: [],
            currentUser: AuthService.getCurrentUser(),
            currentIndex: -1,
            username: '',
            lastName: '',
            email: '',
            contact: '',
            address: '',
            poscode: '',
            state: '',
            bank: '',
            bankAcc: '',
            totalprice: 0.00
        };
    }

    componentDidMount() {
        this.retrieveOrder();
        this.retrieveCart();
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
    }
    onChangeLastname(e) {
        this.setState({
          lastname: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
    }
    onChangeContact(e) {
        this.setState({
          contact: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
          address: e.target.value
        });
    }
    onChangePoscode(e) {
        this.setState({
          poscode: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
          state: e.target.value
        });
    }
    onChangeBank(e) {
        this.setState({
          bank: e.target.value
        });
    }
    onChangeBankAcc(e) {
        this.setState({
          bankAcc: e.target.value
        });
    }  

    retrieveCart() {
        CartDataService.getAll()
            .then(res => {
                this.setState({
                    cart: res.data
                })
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveOrder() {
        OrderDataService.getAll()
            .then(res => {
                this.setState({
                    order: res.data
                })
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    savePayment(status) {
        var data = {
            username: this.state.currentUser.username,
            lastname: this.state.lastname,
            email: this.state.currentUser.email,
            contact: this.state.currentUser.contact,
            address: this.state.currentUser.address,
            poscode: this.state.currentUser.poscode,
            state: this.state.currentUser.state,
            accepted: status,
            bank: this.state.bank,
            bankAcc: this.state.bankAcc
        };

        OrderDataService
            .update(this.state.currentOrder.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentOrder: {
                        ...prevState.currentOrder,
                        published: status,
                    },
                    message: "The order was updated successsfully!"
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateOrder() {
        OrderDataService.update(
            this.state.currentOrder.id,
            this.state.currentOrder
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The order was updated successsfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentOrder, currentUser } = this.state;

        return (
            <div className="">
                <header className="jumbotron">
                    <h3 className='text-center'>PAYMENT PAGE</h3>
                </header>
                <div className='mainContainer'>
                    <div className='d-flex justify-content-center row'>
                        <div className=''>
                            <div className='d-flex'>
                                <div className="billing-div">
                                    <h5 className="mb-4">Enter Billing Information</h5>
                                    <div className="signup-form-row">
                                        <div className="form-group signup-form-group">
                                            <label htmlFor="username">First Name</label>
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
                                            <label htmlFor="username">Last Name</label>
                                            <input
                                                type="text"
                                                size="25"
                                                className="form-control"
                                                name="username"
                                                onChange={this.onChangeLastname}
                                            />
                                        </div>
                                    </div>

                                    <div className='signup-form-row'>
                                        <div className="form-group signup-form-group">
                                            <label className='' htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                size="25"
                                                className="form-control"
                                                name="email"
                                                value={currentUser.email}
                                                onChange={this.onChangeEmail}
                                                required disabled
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
                                            <label htmlFor="poscode">Poscode</label>
                                            <input
                                                type="text"
                                                className="form-control"
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
                                <div className="form-group payment-form-group">
                                    <label htmlFor="state">Bank</label>
                                    <select
                                        list="state"
                                        className="form-control"
                                        name="bank"
                                        onChange={this.onChangeBank}
                                        required >
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
                                    <label htmlFor="address">Bank Account Number</label>
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
                                        type="text"
                                        className="col text-right form-control"
                                        name="totalprice"
                                        value={this.state.totalprice.toFixed(2)}
                                        required disabled
                                    />
                                </div>

                                <div className=''>
                                    <a className="btn btn-primary paybtn" href="#thankyou" onClick={this.savePayment}>Pay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}