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

        this.state = {
            products: [],
            currentOrder: null,
            currentIndex: -1,
            cart: [],
            order: [],
            orderItem: [],
            users: [],
            currentUser: AuthService.getCurrentUser(),
            currentIndex: -1
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
                    order: res.data
                })
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
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

    render() {
        const { products, currentProduct, currentIndex, currentUser, order, orderItem } = this.state;

        let id = null
        for(let i = 0; i < this.state.order.length; i++){
            for(let j = 0; j < this.state.orderItem.length; j++) {
                if(this.state.order[i].id === this.state.orderItem[j].orderId) {
                    id = this.state.order[i].id
                }
                console.log(id)
                console.log(this.state.order[i].id)
                console.log(this.state.orderItem[j].orderId)
            }
        }

        let totalitem = 0
        let totalprice = 0.00 
        for (let j = 0; j < this.state.orderItem.length; j++) {
            if(id === this.state.orderItem[j].orderId) {
                totalitem = totalitem + this.state.orderItem[j].quantity
                totalprice = totalprice + this.state.orderItem[j].price
            }
        }

        return (
            <div className="">
                <header className="jumbotron">
                    <h3>CHECKOUT FORM</h3>
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
                                                                    <img src={'./images/women/' + (p.title) + '-1.jpg'}></img>
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
                                            <h6>Total:</h6>
                                        </td>
                                        <td className=''>
                                            <h6>{totalitem}</h6>
                                        </td>
                                        <td className=''>
                                            <h6>RM {totalprice.toFixed(2)}</h6>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className=''>
                                <div className='checkout-btn-div'>
                                    <a className="btn btn-primary" href="/payment">Submit & Pay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}