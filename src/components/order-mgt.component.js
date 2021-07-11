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
        this.setActiveOrder = this.setActiveOrder.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.getSingleOrder = this.getSingleOrder.bind(this);

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
        this.getSingleOrder(this.props.match.params.id);
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

    setActiveOrder(order, index) {
        this.setState({
            currentOrder: order,
            currentIndex: index
        });
    }

    getSingleOrder(id) {
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
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { products, currentOrder, currentIndex, orders } = this.state;

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
                            {orders &&
                                orders.map((order, index) => (
                                    <a className={'' + (index === currentIndex ? ' active' : '')}
                                        onClick={() => this.setActiveOrder(order, index)} href='#order01'
                                        key={index}>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th><b>Order ID {order.id}</b></th>
                                                    <th><b>Status</b></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className='order-detail-div'>
                                                            <div>
                                                                <p>Total Paid: RM {order.payment.toFixed(2)} ({order.accepted ? "Accepted" : "Pending"})
                                                                    <span>Date: <b>{order.date}</b></span>
                                                                </p>
                                                            </div>
                                                            <h6>Shipping Information</h6>
                                                            <table className='shipping-info-table'>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Shipping Name:</td>
                                                                        <td>{order.shippingname}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Shipping Address:</td>
                                                                        <td>{order.shippingaddress}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Contact:</td>
                                                                        <td>{order.shippingcontact}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {order.completed ? "Completed" : "In Progress"}

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
                {currentOrder ? (
                    <div className="modal" id="order01">
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <header className="modal-container">
                                    <a href="#" className="closebtn">×</a>
                                    <h4>View Details of ORDER ID <b>{currentOrder.id}</b></h4>
                                </header>
                                <div className='modal-table-div'>
                          
                          <p>Order Item List</p>
                          <table className='modal-order-item-table'>
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
                                  .filter(i => i.orderId === currentOrder.id)
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
                                <div className='d-flex justify-content-center mt-4'>
                                <a className="btn btn-warning pr-5 pl-5" href={'orders/' + currentOrder.id}>
                                    Edit
                                </a>
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