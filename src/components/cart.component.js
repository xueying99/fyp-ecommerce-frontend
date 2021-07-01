import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";
import OrderDataService from "../services/order.service";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveCart = this.retrieveCart.bind(this);
        this.removeAllCartItems = this.removeAllCartItems.bind(this);
        this.checkout = this.checkout.bind(this);
        this.saveOrder = this.saveOrder.bind(this);

        this.state = {
            products: [],
            currentCart: null,
            currentIndex: -1,
            cart: [],
            totalprice: 0.00,
            totalitem: 0,
            order: [],
            date: new Date().toLocaleString()
        };
    }

    componentDidMount() {
        this.retrieveProducts();
        this.retrieveCart();
        this.refreshList();
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

    refreshList() {
        this.retrieveProducts();
        this.retrieveCart();
        this.setState({
            currentCart: null,
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

    removeAllCartItems() {
        CartDataService.deleteAll()
            .then(response => {
                this.setState({
                    totalprice: 0.00,
                    totalitem: 0
                })
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    checkout() {
        OrderDataService.create({
            productId: this.state.productId,
            quantity: this.state.quantity,
            productPrice: this.state.productPrice,
            date: this.state.date
        })
            .then(response => {
                this.setState({
                    accepted: response.data.accepted
                });
                alert("Order submitted!");
                this.removeAllCartItems();
            })
            .catch(e => {
                console.log(e);
              });
    }

    saveOrder() {
        var data = {
            productId: this.state.productId,
            quantity: this.state.quantity,
            productPrice: this.state.productPrice,
            date: this.state.date
        };

        CartDataService.checkout(data)
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
                // this.removeAllCartItems();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { products, currentCart, currentIndex } = this.state;
        
        return (
            <div className="container">
                {/* <header className="jumbotron">
                </header> */}
                <div className='mainHeader'>
                    <h3>SHOPPING CART</h3>
                </div>
                <div className='mainContainer'>
                    <div className='d-flex justify-content-around row'>
                        <div className=''>
                            {
                                this.state.cart.length === 0 ?
                                (
                                    <h3>Empty Cart</h3>
                                ) :
                                    this.state.cart.map(c => {
                                        let p = this.state.products.filter(i => i.id === c.productId)[0]
                                        this.state.totalprice = this.state.cart.reduce(
                                            (prevPrice, currentPrice) => prevPrice.productPrice + currentPrice.productPrice);
                                        this.state.totalitem = this.state.cart.reduce(
                                            (prevQuantity, currentQuantity) => prevQuantity.quantity + currentQuantity.quantity);
                                        console.log("quantity:" + this.state.totalitem, " price:" + this.state.totalprice)

                                        return ( 
                                            <div className='d-flex justify-content-around' key={c.id}>
                                            
                                            <div className="cart-div" key={c.id}>
                                                <div className="cart-item-div" key={c.id}>
                                                    <div className="item-img">
                                                        <img src={'./images/women/' + (p.title) + '-1.jpg'}></img>
                                                    </div>
                                                    <div className="cart-item-info">
                                                        <div className='item-info'>
                                                            <b>{p.productname}</b>
                                                        </div>
                                                        <div className='item-info'>
                                                            RM: {c.productPrice.toFixed(2)}<br></br>
                                                            rm: {p.price.toFixed(2)} (single price)
                                                        </div>
                                                        {/* <div className='item-info'>
                                                            Quantity: {c.quantity}<br></br>
                                                        </div> */}
                                                        <div className='quantity-group'>
                                                            <button className='btn btn-danger qty-btn ti-minus'> 
                                                            </button>
                                                            <input 
                                                                   className='input-quantity'
                                                                   size="1"
                                                                   value={c.quantity} 
                                                            />
                                                            <button className='btn btn-success qty-btn ti-plus'>
                                                            </button>
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
                                    <div>Total Items:</div> 
                                    <div>{this.state.totalitem}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Total:</div> 
                                    <div>RM {this.state.totalprice}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <a className="btn btn-primary" href="/checkout" onClick={this.saveOrder}>Checkout</a>
                                    <div className="btn btn-danger" onClick={this.removeAllCartItems}>Clear All</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}