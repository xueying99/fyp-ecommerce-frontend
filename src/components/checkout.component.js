import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";
import OrderDataService from "../services/order.service";
import OrderItemDataService from "../services/orderItem.service";
import AuthService from "../services/auth.service";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveCart = this.retrieveCart.bind(this);
        this.retrieveOrder = this.retrieveOrder.bind(this);
        this.retrieveOrderItem = this.retrieveOrderItem.bind(this);
        // this.saveOrder = this.saveOrder.bind(this);

        this.state = {
            products: [],
            currentOrder: null,
            currentIndex: -1,
            tempprice: 0.00,
            totalitem: 0,
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
        this.retrieveCart();
        this.retrieveOrder();
        this.retrieveOrderItem();
        this.refreshList();
    }

    retrieveProducts() {
        ProductDataService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                // this.retrieveOrder();
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.retrieveProducts();
        // this.retrieveCart();
        // this.retrieveOrder();
        this.setState({
            currentOrder: null,
            currentIndex: -1
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

    // saveOrder() {
    //     var data = {
    //         productId: this.state.productId,
    //         quantity: this.state.quantity,
    //         productPrice: this.state.productPrice,
    //         date: this.state.date
    //     };

    //     OrderDataService.create(data)
    //         .then(response => {
    //             this.setState({
    //                 productId: response.data.productId,
    //                 quantity: response.data.quantity,
    //                 productPrice: response.data.productPrice,
    //                 date: response.data.date,
    //                 accepted: response.data.accepted
    //             });
    //             console.log(response.data);
    //             alert("Order submitted!");
    //             this.removeAllCartItems();
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    render() {
        const { products, currentProduct, currentIndex, currentUser, order, orderItem } = this.state;
        console.log(this.state.order.length)
        console.log(this.state.orderItem.length)
        return (
            <div className="">
                <header className="jumbotron">
                    <h3>CHECKOUT FORM</h3>
                </header>
                <div className='mainContainer'>
                    <div className='d-flex justify-content-center row'>
                        <div className=''>
                            {
                                this.state.order.length === 0 ?
                                    (
                                        <h3>Empty Order</h3>
                                    ) :
                                    this.state.order.map(o => {
                                        let p = this.state.products.filter(i => i.id === o.orderId)[0]
                                        return (
                                            <div className='d-flex justify-content-center' key={o.id}>
                                                <div className="checkout-div" key={o.id}>
                                                    <div className="checkout-item-div" key={o.id}>
                                                        <div className="item-img">
                                                            <img src={'./images/women/' + (p.title) + '-1.jpg'}></img>
                                                        </div>
                                                        <div className="checkout-item-info">
                                                            <div className='item-info'>
                                                                <b>{p.productname}</b>
                                                            </div>
                                                            <div className='item-info'>
                                                                RM: {o.productPrice}<br></br>
                                                                rm: {p.price.toFixed(2)} (single price)
                                                            </div>
                                                            <div className='item-info'>
                                                                Quantity: {o.quantity}<br></br>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    // (<div>not empty order</div>)
                            }
                            <div className=''>
                                <div className='checkout-detail-div'>
                                    <div className='cart-btn-div'>
                                        <div>Total Item:</div>
                                        <div>{this.state.totalitem}</div>
                                    </div>
                                    <div className='cart-btn-div'>
                                        <div>Total Price:</div>
                                        <div>RM {this.state.tempprice.toFixed(2)}</div>
                                    </div>
                                    {/* <div className='cart-btn-div'>
                                        <div>Shipping Fee:</div>
                                        <div>RM {this.state.fee.toFixed(2)}</div>
                                    </div>
                                    <div className='cart-btn-div'>
                                        <div>Total Price:</div>
                                        <div>RM {this.state.totalprice.toFixed(2)}</div>
                                    </div> */}
                                    <hr></hr>
                                    <div className='checkout-btn-div'>
                                        <a className="btn btn-primary" href="/payment" onClick={this.saveOrder}>Submit & Pay</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}