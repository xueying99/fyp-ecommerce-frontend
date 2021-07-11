import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveCart = this.retrieveCart.bind(this);
        this.removeAllCartItems = this.removeAllCartItems.bind(this);
        this.checkout = this.checkout.bind(this);

        this.state = {
            products: [],
            currentCart: null,
            currentIndex: -1,
            cart: [],
            order: [],
            orderItem: [],
            payment: 0.00
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    retrieveProducts() {
        ProductDataService.getAll()
            .then(response => {
                // console.log(response)               
                this.setState({
                    products: response.data
                });
                this.retrieveCart();
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.retrieveProducts();
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
        CartDataService.checkout({
            payment: this.state.payment
        })
            .then(response => {
                this.setState({
                    cart: response.data
                });
                console.log(response.data);
                alert("Order submitted!");
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { products, currentCart, currentIndex } = this.state;

        let totalprice = 0.00
        for (let i = 0; i < this.state.cart.length; i++) {
            totalprice = totalprice + this.state.cart[i].productPrice
        }
        this.state.payment = totalprice
        console.log(this.state.payment)

        let totalitem = 0
        for (let i = 0; i < this.state.cart.length; i++) {
            totalitem = totalitem + this.state.cart[i].quantity
        }

        return (
            <div className="">
                <header className="jumbotron">
                    <h3>SHOPPING CART</h3>
                </header>
                <div className='mainContainer'>
                    <div className='d-flex justify-content-around row mr-5 ml-5'>
                        <div className=''>
                            {
                                this.state.cart.length === 0 ?
                                    (
                                        <h3>Empty Cart</h3>
                                    ) :
                                    this.state.cart.map(c => {

                                        let p = this.state.products.filter(i => i.id === c.productId)[0]
                                        return (
                                            <div className='d-flex justify-content-around' key={c.id}>

                                                <div className="cart-div" key={c.id}>
                                                    <div className="cart-item-div" key={c.id}>
                                                        <div className="item-img">
                                                            <img src={'http://localhost:8080/api/files/' + (p.title) + '-1.jpg'}></img>
                                                        </div>
                                                        <div className="cart-item-info">
                                                            <div className='item-info'>
                                                                <b>{p.productname}</b>
                                                            </div>
                                                            <div className='item-info'>
                                                                RM: {c.productPrice.toFixed(2)}<br></br>
                                                                rm: {p.price.toFixed(2)} (single price)
                                                            </div>
                                                            <div className='quantity-group'>
                                                                <button className='btn btn-danger qty-btn ti-minus' disabled></button>
                                                                <input className='input-quantity'
                                                                    size="1"
                                                                    defaultValue={c.quantity} />
                                                                <button className='btn btn-success qty-btn ti-plus' disabled></button>
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
                                    <div>{totalitem}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div>Total:</div>
                                    <div>RM {totalprice.toFixed(2)}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <a className="btn btn-primary" href='/cart/checkout' onClick={this.checkout}>Checkout</a>
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