import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        // this.addToCart = this.addToCart.bind(this);
        this.retrieveCart = this.retrieveCart.bind(this);
        this.removeAllCartItems = this.removeAllCartItems.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            quantity: 0,
            cart: [],
            total: ""
        };
    }

    componentDidMount() {
        this.retrieveProducts();
        this.retrieveCart();
    }

    retrieveProducts() {
        ProductDataService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
                // this.retrieveCart();
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.retrieveProducts();
        this.retrieveCart();
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });
    }

    // addToCart() {
    //     CartDataService.create({
    //         productId: this.state.currentProduct.id,
    //         quantity: this.state.quantity,
    //         productPrice: this.state.currentProduct.price
    //     })
            // .then(() => {
            //     this.retrieveCart();
            // })
    // }

    retrieveCart() {
        CartDataService.getAll().then(res => {
            this.setState({ 
                cart: res.data 
            })
            console.log(res.data)
        })
    }

    removeAllCartItems() {
        CartDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    

    render() {
        const { products, currentProduct, currentIndex } = this.state;

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
                                this.state.cart.length == 0 ?
                                (
                                    <h3>Empty Cart</h3>
                                ) :
                                    this.state.cart.map(c => {
                                        let p = this.state.products.filter(i => i.id == c.productId)[0]
                                        let totalprice = this.state.cart.reduce((prevPrice, currentPrice) => prevPrice.productPrice + currentPrice.productPrice + 10);
                                        // this.state.totalPrice
                                        console.log("total " + totalprice)
                                        return ( 
                                            <div className='d-flex justify-content-around'>
                                            
                                            <div className="cart-div">
                                                <div className="cart-item-div" key={c.id}>
                                                    <div className="item-img">
                                                        <img src={'./images/women/' + (p.title) + '.jpg'}></img>
                                                    </div>
                                                    <div className="cart-item-info">
                                                        <div className='item-info'>
                                                            <b>{p.productname}</b>
                                                        </div>
                                                        <div className='item-info'>
                                                            RM: {c.productPrice.toFixed(2)}<br></br>
                                                            rm: {p.price.toFixed(2)} (single price)
                                                        </div>
                                                        <div className='item-info'>
                                                            Quantity: {c.quantity}<br></br>
                                                        </div>
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
                                                <div className='col'>
                                                    <div className='cart-detail-div'>
                                                        <div className='cart-btn-div'>
                                                            <div>Total:</div> 
                                                            <div>{totalprice}</div>
                                                        </div>
                                                        <div className='cart-btn-div'>
                                                            <div className="btn btn-primary">Checkout</div>
                                                            <button className="btn btn-danger" onClick={this.removeAllCartItems}>Clear All</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        
                                    })
                            }
                        </div>
                        {/* <div className=''>
                            <div className='cart-detail-div'> 
                                <div className='cart-btn-div'>
                                    <div>Total:</div> 
                                    <div>{this.state.cart.length}</div>
                                    <div>{this.state.cart.totalprice}</div>
                                </div>
                                <div className='cart-btn-div'>
                                    <div className="btn btn-primary">Checkout</div>
                                    <div className="btn btn-danger" onClick={this.removeAllCartItems}>Clear All</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}