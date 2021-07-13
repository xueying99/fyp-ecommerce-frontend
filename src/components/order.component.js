import React, { Component } from "react";
import '../css/index.css';

import OrderDataService from "../services/order.service";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.getOrder = this.getOrder.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.onChangeCourier = this.onChangeCourier.bind(this);
        this.onChangeTracking = this.onChangeTracking.bind(this);

        this.state = {
            orderItem: [],
            products: [],

            currentOrder: {
                id: null,
                date: '',
                payment: '',
                contact: '',
                bankname: '',
                bankacc: '',
                shippingname: '',
                shippingaddress: '',
                shippingcontact: '',
                accepted: false,
                courier: '',
                tracking: '',
                completed: false,
            },

            message: ""
        };
    }

    componentDidMount() {
        this.getOrder(this.props.match.params.id);
    }
    onChangeCourier(e) {
        const courier = e.target.value;

        this.setState(function (prevState) {
            return {
                currentOrder: {
                    ...prevState.currentOrder,
                    courier: courier
                }
            };
        });
    }
    onChangeTracking(e) {
        const tracking = e.target.value;

        this.setState(function (prevState) {
            return {
                currentOrder: {
                    ...prevState.currentOrder,
                    tracking: tracking
                }
            };
        });
    }
    getOrder(id) {
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

    updateStatus(status) {
        var data = {
            id: this.state.currentOrder.id,
            userId: this.state.currentOrder.userId,
            date: this.state.currentOrder.date,
            payment: this.state.currentOrder.payment,
            shippingname: this.state.currentOrder.shippingname,
            shippingaddress: this.state.currentOrder.shippingaddress,
            shippingcontact: this.state.currentOrder.shippingcontact,
            bankname: this.state.currentOrder.bankname,
            bankacc: this.state.currentOrder.bankacc,
            accepted: this.state.currentOrder.accepted,
            courier: this.state.currentOrder.courier,
            tracking: this.state.currentOrder.tracking,
            completed: status
        };

        OrderDataService
            .update(this.state.currentOrder.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentOrder: {
                        ...prevState.currentOrder,
                        completed: status
                    }
                }));
                console.log(response.data);
                alert("Order is COMPLETED!");
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
        const { currentOrder } = this.state;

        return (
            <div className='single-view'>
                {currentOrder ? (
                    <div className='edit-form'>
                        <h4>Order ID {currentOrder.id}</h4>
                        <div className='single-div'>
                            <div className='order-table-div'>
                                <h6>Billing Information</h6>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Date: </td>
                                            <td>{currentOrder.date}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Paid:</td>
                                            <td>RM {currentOrder.payment} ( {currentOrder.accepted ? "Accepted" : "Pending"} )</td>
                                        </tr>
                                        <tr>
                                            <td>Bank Name:</td>
                                            <td>{currentOrder.bankname}</td>
                                        </tr>
                                        <tr>
                                            <td>Bank Account: </td>
                                            <td>{currentOrder.bankacc}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className='order-table-div'>
                                <h6>Shipping Information</h6>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Receiver Name: </td>
                                            <td>{currentOrder.shippingname}</td>
                                        </tr>
                                        <tr>
                                            <td>Receiver Contact:</td>
                                            <td>{currentOrder.shippingcontact}</td>
                                        </tr>
                                        <tr>
                                            <td>Receiver Address</td>
                                            <td>{currentOrder.shippingaddress}</td>
                                        </tr>
                                        <tr>
                                            <td>Courier Service</td>
                                            <td>
                                                <select
                                                    list="courier"
                                                    className="form-control"
                                                    name="courier"
                                                    value={currentOrder.courier}
                                                    onChange={this.onChangeCourier}
                                                    required >
                                                    <option value="" disabled selected hidden>Choose a Courier service</option>
                                                    <option value="Pos Laju">Poslaju</option>
                                                    <option value="GDex">GDex</option>
                                                    <option value="J&T Express">J&T Express</option>
                                                    <option value="Skynet Express">Skynet Express</option>
                                                    <option value="DHL Express">DHL Express</option>
                                                    <option value="ABX Express">ABX Express</option>
                                                    <option value="Pgeon">Pgeon</option>
                                                    <option value="Easy Parcel">Easy Parcel</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Tracking Number</td>
                                            <td><input size='30'
                                                type='text'
                                                className='form-control'
                                                id='tracking'
                                                required
                                                value={currentOrder.tracking}
                                                onChange={this.onChangeTracking}
                                                name='tracking'
                                            /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col'>
                                <div className='row pl-4 pr-2 justify-content-between'>
                                    <div className=''>
                                        <label>
                                            <strong>Status: </strong>
                                        </label>{" "}
                                        {currentOrder.completed ? "Completed" : "In Progress"}
                                    </div>

                                    {currentOrder.completed ? (
                                        <button className='btn btn-danger mr-4' onClick={() => this.updateStatus(false)}>
                                            In Progress
                                        </button>
                                    ) : (
                                        <button className='btn btn-warning mr-4' onClick={() => this.updateStatus(true)}>
                                            Completed
                                        </button>
                                    )}
                                </div>
                                <div className='row pl-4 pr-2 pt-3 justify-content-between'>
                                    <div className=''>
                                        <p>{this.state.message}</p>
                                    </div>
                                    <button type='submit' className='btn btn-success float-right mr-4' onClick={this.updateOrder}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}