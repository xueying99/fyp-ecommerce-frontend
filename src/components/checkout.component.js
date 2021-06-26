import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";
import OrderDataService from "../services/order.service";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveCart = this.retrieveCart.bind(this);
        this.removeAllOrders = this.removeAllOrders.bind(this);
        this.checkout = this.checkout.bind(this);
        this.retrieveOrder = this.retrieveOrder.bind(this);

        this.state = {
            products: [],
            currentOrder: null,
            currentIndex: -1,
            cart: [],
            totalprice: 0.00,
            totalitem: 0,
            order: [],
            fee: 10.00
        };
    }

    componentDidMount() {
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

    removeAllOrders() {
        OrderDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    checkout() {
        OrderDataService.create({
            cartId: this.state.currentCart.id,
            quantity: this.state.quantity,
            totalPrice: this.state.currentCart.price,
            date: this.state.date,
            accepted: false
        })
            .then(() => {
                this.removeAllOrders();
            })
    }

    render() {
        const { products, currentProduct, currentIndex } = this.state;

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
                                this.state.order.length === 0 ?
                                    (
                                        <h3>Empty Order</h3>
                                    ) :
                                    this.state.order.map(o => {
                                        let c = this.state.cart.filter(i => i.id === o.cartId)[0]
                                        this.state.totalprice = this.state.order.reduce(
                                            (prevPrice, currentPrice) => prevPrice.productPrice + currentPrice.productPrice + 10);
                                        this.state.totalitem = this.state.order.reduce(
                                            (prevQuantity, currentQuantity) => prevQuantity.quantity + currentQuantity.quantity);
                                        console.log("total " + this.state.totalprice)
                                        return (
                                            <div className='d-flex justify-content-around' key={o.id}>
                                                <div className="cart-div" key={o.id}>
                                                    <div className="cart-item-div" key={o.id}>
                                                        {/* <div className="item-img">
                                                        <img src={'./images/women/' + (p.title) + '.jpg'}></img>
                                                    </div> */}
                                                        <div className="cart-item-info">
                                                            <div className='item-info'>
                                                                {/* <b>{c.productId}</b> */}
                                                            </div>
                                                            <div className='item-info'>
                                                                RM: {c.productPrice}<br></br>
                                                                {/* rm: {c.price.toFixed(2)} (single price) */}
                                                            </div>
                                                            <div className='item-info'>
                                                                Quantity: {c.quantity}<br></br>
                                                            </div>
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
                                <div className='cart-btn-div'>
                                    <div>Price:</div> 
                                    <div>{this.state.totalprice}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Shipping Fee:</div> 
                                    <div>{this.state.fee}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Total Price:</div> 
                                    <div>RM {this.state.totalprice.toFixed(2)}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <a className="btn btn-primary" href="/checkout" onClick={this.checkout}>Submit</a>
                                    <div className="btn btn-danger" onClick={this.removeAllOrders}>Delete Order</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}