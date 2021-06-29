import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";
import OrderDataService from "../services/order.service";
import AuthService from "../services/auth.service";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveCart = this.retrieveCart.bind(this);
        // this.removeAllOrders = this.removeAllOrders.bind(this);
        // this.checkout = this.checkout.bind(this);
        this.retrieveOrder = this.retrieveOrder.bind(this);
        this.saveOrder = this.saveOrder.bind(this);

        this.state = {
            products: [],
            currentOrder: null,
            currentIndex: -1,
            cart: [],
            totalprice: 0.00,
            totalitem: 0,
            order: [],
            fee: 10.00,
            users: [],
            currentUser: AuthService.getCurrentUser(),
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveProducts();
        this.retrieveCart();
        this.retrieveOrder();
    }

    retrieveProducts() {
        ProductDataService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.retrieveProducts();
        // this.retrieveCart();
        this.retrieveOrder();
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

    // removeAllOrders() { //NO NEED
    //     OrderDataService.deleteAll()
    //         .then(response => {
    //             console.log(response.data);
    //             this.refreshList();
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    // checkout() {
    //     OrderDataService.create({
    //         cartId: this.state.currentCart.id,
    //         quantity: this.state.quantity,
    //         totalPrice: this.state.currentCart.price,
    //         date: this.state.date,
    //         accepted: false
    //     })
    //         .then(() => {
    //             // this.removeAllOrders(); 
    //         })
    // }

    saveOrder() {
        var data = {
            productId: this.state.productId,
            quantity: this.state.quantity,
            productPrice: this.state.productPrice,
            date: this.state.date
        };

        OrderDataService.create(data)
            .then(response => {
                this.setState({
                    productId: response.data.productId,
                    quantity: response.data.quantity,
                    productPrice: response.data.productPrice,
                    date: response.data.date,
                    accepted: response.data.accepted
                });
                console.log(response.data);
                alert("Order submitted!");
                this.removeAllCartItems();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { products, currentProduct, currentIndex, currentUser } = this.state;

        return (
            <div className="container">
                {/* <header className="jumbotron">
                </header> */}
                <div className='mainHeader'>
                    <h3>CHECKOUT FORM</h3>
                </div>
                <div className='mainContainer'>
                    <div className='d-flex justify-content-around row'>
                        <div className=''>
                            {
                                this.state.cart.length === 0 ?
                                    (
                                        <h3>Empty Order</h3>
                                    ) :
                                    this.state.cart.map(o => {
                                        let p = this.state.products.filter(i => i.id === o.productId)[0]
                                        this.state.totalprice = this.state.order.reduce(
                                            (prevPrice, currentPrice) => prevPrice.productPrice + currentPrice.productPrice + 10);
                                        this.state.totalitem = this.state.order.reduce(
                                            (prevQuantity, currentQuantity) => prevQuantity.quantity + currentQuantity.quantity);
                                        console.log("total " + this.state.totalprice)
                                        return (
                                            <div className='d-flex justify-content-around' key={o.id}>
                                                <div className="cart-div" key={o.id}>
                                                    <div className="cart-item-div" key={o.id}>
                                                        <div className="item-img">
                                                            <img src={'./images/women/' + (p.title) + '.jpg'}></img>
                                                        </div>
                                                        <div className="cart-item-info">
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
                                                <div>
                                                    <div className='cart-detail-div'>
                                                        <div className='cart-btn-div'>
                                                            <div>Price:</div>
                                                            <div>{this.state.totalprice}</div>
                                                        </div>
                                                        <div className='cart-btn-div'>
                                                            <div>Total Price:</div>
                                                            <div>RM {this.state.totalprice.toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })


                            }
                        </div>
                        <div className=''>
                            <div className='cart-detail-div'>
                                <h5>Order Details</h5>
                                <div className='cart-btn-div'>
                                    <div>Price:</div>
                                    <div>RM {this.state.totalprice.toFixed(2)}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Shipping Fee:</div>
                                    <div>RM {this.state.fee.toFixed(2)}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Total Price:</div>
                                    <div>RM {this.state.totalprice.toFixed(2)}</div>
                                </div>
                                <hr></hr>
                                <h5>Shipping Details</h5>
                                <div className='cart-btn-div'>
                                    <div>Date:</div>
                                    <div>{this.state.date}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Name:</div>
                                    <div>{currentUser.username}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Email:</div>
                                    <div>{currentUser.email}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Contact Number</div>
                                    <div>{currentUser.contact}</div>
                                </div>
                                <div className=''>
                                    <div>Shipping Address:</div>
                                    <div>{currentUser.address}</div>
                                    <div>{currentUser.poscode}, {currentUser.state}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <a className="btn btn-primary" href="#payment" onClick={this.saveOrder}>Submit</a>
                                    {/* <div className="btn btn-danger" onClick={this.removeAllOrders}>Cancel</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}