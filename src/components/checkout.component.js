import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import '../css/layouts.css';
import '../css/component.css';

import AuthService from "../services/auth.service";
import ProductDataService from "../services/product.service";
import OrderDataService from "../services/order.service";
import OrderItemDataService from "../services/orderItem.service";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveOrder = this.retrieveOrder.bind(this);
        this.retrieveOrderItem = this.retrieveOrderItem.bind(this);
        this.setActiveOrder = this.setActiveOrder.bind(this);

        this.state = {
            products: [],
            currentOrder: null,
            currentIndex: -1,
            cart: [],
            orders: [],
            orderItem: [],
            users: [],
            currentUser: AuthService.getCurrentUser(),
            fee: 10.00,
        };
    }

    componentDidMount() {
        this.retrieveProducts();
        this.retrieveOrder();
        this.retrieveOrderItem();
        this.refreshList();
    }

    refreshList() {
        this.retrieveProducts();
        this.retrieveOrder();
        this.retrieveOrderItem();
        this.setState({
            currentOrder: null,
            currentIndex: -1
        });
    }

    retrieveProducts() {
        ProductDataService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
            })
            .catch(e => {
                console.log(e);
            })
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

    // retrieveOrder(id) {
    //     OrderDataService.get(id)
    //         .then(response => {
    //             this.setState({
    //                 currentOrder: response.data
    //             });
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

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

    setActiveOrder(order, index) {
        this.setState({
            currentOrder: order,
            currentIndex: index
        });
    }

    render() {
        const { products, currentOrder, currentIndex, currentUser, orders, orderItem } = this.state;

        let id = null
        for (let i = 0; i < this.state.orders.length; i++) {
            for (let j = 0; j < this.state.orderItem.length; j++) {
                if (this.state.orders[i].id === this.state.orderItem[j].orderId) {
                    id = this.state.orders[i].id
                }
            }
        }

        let totalitem = 0
        let tempprice = 0.00
        for (let j = 0; j < this.state.orderItem.length; j++) {
            if (id === this.state.orderItem[j].orderId) {
                totalitem = totalitem + this.state.orderItem[j].quantity
                tempprice = tempprice + this.state.orderItem[j].price
            }
        }
        let totalprice = tempprice + this.state.fee 

        return (
            <div className="">
                <header className="jumbotron">
                    <h3>CHECKOUT FORM</h3>
                    <p>(PLEASE DON'T LEAVE THIS PAGE BEFORE SUBMIT)</p>
                </header>
                <div className='mainContainer'>
                    <div className='checkout-detail-div'>
                        <div className='checkout-div'>
                            <h5>Order List</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='text-left'><b>Product</b></th>
                                        <th><b>Quantity</b></th>
                                        <th><b>Price (RM)</b></th>
                                    </tr>
                                </thead>
                                {
                                    this.state.orderItem.length === 0 ?
                                        (
                                            <tbody>
                                                <div>
                                                    <h5 className='text-center'>Empty Order</h5>
                                                </div>
                                            </tbody>
                                        ) :

                                        this.state.orderItem
                                            .filter(i => i.orderId === id)
                                            .map(o => {
                                                let p = this.state.products.filter(i => i.id === o.productId)[0]
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className='checkout-td-item'>
                                                                    <div className="checkout-item-div">
                                                                        <img src={'http://localhost:8080/api/files/' + (p.title) + '.jpg'}></img>
                                                                    </div>
                                                                    <div>
                                                                        {p.productname}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {o.quantity}
                                                            </td>
                                                            <td>
                                                                {o.price.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })
                                }
                                <tbody>
                                    <tr>
                                        <td className='text-left'>
                                            <h6></h6>
                                        </td>
                                        <td className=''>
                                            <h6>{totalitem}</h6>
                                        </td>
                                        <td className=''>
                                            <h6>{tempprice.toFixed(2)}</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-left'>
                                            <h6>Delivery Fees:</h6>
                                        </td>
                                        <td className=''>
                                            <h6></h6>
                                        </td>
                                        <td className=''>
                                            <h6>{this.state.fee}</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-left'>
                                            <h6>Total:</h6>
                                        </td>
                                        <td className=''>
                                            <h6>{totalitem}</h6>
                                        </td>
                                        <td className=''>
                                            <h6>{totalprice.toFixed(2)}</h6>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            {orders &&
                                orders.map((order, index) => (
                                    <div className=''>
                                        <div className={'badge badge-success' + (index === currentIndex ? ' active' : '')}
                                            onClick={() => this.setActiveOrder(order, index)}
                                            key={index}>
                                                Click me !!!
                                        </div>
                                    </div>
                                ))}
                            <div className=''>
                                {currentOrder ? (
                                    <div className='checkout-btn-div'>
                                        <a className="btn btn-primary" href={'orders/' + currentOrder.id}>Submit</a>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}