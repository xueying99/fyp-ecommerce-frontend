import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import '../css/index.css';

import ProductDataService from "../services/product.service";
import OrderDataService from "../services/order.service";
import OrderItemDataService from "../services/orderItem.service";


export default class OrderManagement extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.retrieveOrder = this.retrieveOrder.bind(this);
        this.retrieveOrderItem = this.retrieveOrderItem.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            products: [],
            orders: [],
            orderItem: [],
            currentOrder: null,
            currentIndex: -1,

            id: null,
            accepted: false,
            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveProducts();
        this.retrieveOrder();
        this.retrieveOrderItem();
    }

    retrieveProducts() {
        ProductDataService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
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

    retrieveOrder() {
        OrderDataService.getAll()
            .then(res => {
                this.setState({
                    orders: res.data
                })
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveOrder();
        this.setState({
            currentOrder: null,
            currentIndex: -1
        });
    }

    // updateStatus(status) {
    //     var data = {
    //         id: this.state.order.id,
    //         accepted: status
    //     };

    //     OrderDataService
    //         .update(this.state.order.id, data)
    //         .then(response => {
    //             this.setState(prevState => ({
    //                 currentTutorial: {
    //                     ...prevState.order,
    //                     accepted: status
    //                 }
    //             }));
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    render() {
        const { searchProductname, products, currentOrder, currentIndex, orders } = this.state;

        let totalprice = 0.00
        for (let i = 0; i < this.state.orderItem.length; i++) {
            totalprice = totalprice + this.state.orderItem[i].price
        }

        return (
            <div className=''>
                <header className="jumbotron">
                    <h3><b>ORDER MANAGEMENT</b></h3>
                </header>
                <div className='mainContainer'>
                    <div className='order-mgt-container'>
                        <div className='order-mgt-div'>
                            <h5><b>Order List</b></h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th><b>Order Details</b></th>
                                        <th><b>Sales</b></th>
                                        <th><b>Status</b></th>
                                    </tr>
                                </thead>

                                {
                                    this.state.orders.length === 0 ?
                                        (
                                            <tbody>
                                                <div>
                                                    <h5 className='text-center'>No Order</h5>
                                                </div>
                                            </tbody>
                                        ) :

                                        this.state.orders.map(oi => {
                                            let item = this.state.orderItem.filter(i => i.id === oi.orderId)[0]
                                            let orderdate = oi.date
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className='order-detail-div'>
                                                                <div>
                                                                    <p>Order ID: <b>{oi.id}</b>
                                                                        <span>Date: <b>{orderdate}</b></span>
                                                                    </p>
                                                                    <p>User ID: <b>{oi.userId}</b></p>
                                                                </div>
                                                                {/* <h6>Shipping Information</h6>
                                                                <table className='shipping-info-table'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Shipping Name:</td>
                                                                            <td>{oi.username}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Shipping Address:</td>
                                                                            <td>{(oi.address), (oi.poscode), (oi.state)}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Contact:</td>
                                                                            <td>{oi.contact}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table> */}

                                                                <h6>Order Item List</h6>
                                                                <table className='order-item-table'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th>Product</th>
                                                                            <th>Quantity</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            this.state.orderItem
                                                                                .filter(i => i.orderId === oi.id)
                                                                                .map(o => {
                                                                                    let p = this.state.products.filter(i => i.id === o.productId)[0]
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>{o.id}</td>
                                                                                            <td className=''>
                                                                                                {p.productname}
                                                                                            </td>
                                                                                            <td>
                                                                                                {o.quantity}
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                        </td>
                                                        <td>
                                                            RM {oi.payment.toFixed(2)}
                                                        </td>
                                                        <td>
                                                            {oi.accepted ? "Completed" : "Processing"}
                                                            {/* {oi.accepted ? (
                                                                <button className='btn btn-primary mr-2' onClick={() => this.updateStatus(true)}>
                                                                    Completed
                                                                </button>
                                                            ) : (
                                                                <button className='btn btn-primary mr-2' onClick={() => this.updateStatus(false)}>
                                                                    Processing
                                                                </button>
                                                            )} */}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                }
                            </Table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}