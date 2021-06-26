import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";

export default class Women extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.searchProductname = this.searchProductname.bind(this);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchProductname: "",
      quantity: 1,
      cart: []
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  onChangeSearchProduct(e) {
    const searchProductname = e.target.value;

    this.setState({
      searchProductname: searchProductname
    });
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState({
      quantity: quantity
    });
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

  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  searchProductname() {
    ProductDataService.findByTitle(this.state.searchProductname)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addToCart() {
    let tempPrice = this.state.currentProduct.price * this.state.quantity

    CartDataService.create({
      productId: this.state.currentProduct.id,
      quantity: this.state.quantity,
      productPrice: tempPrice
    })
      .then(response => {
        alert("Successfully add to cart!");
      })
      .catch(e => {
        alert("Please login to make order!");
        console.log(e);
      });
  }

  render() {
    const { searchProductname, products, currentProduct, currentIndex } = this.state;

    return (
      <div className="container">
        {/* <header className="jumbotron">
        </header> */}
        <div className='mainHeader'>
          <h3>Women Fashion</h3>
        </div>
        <div className='mainContainer'>
          <div className='component-div'>
            <ul className='product-view'>
              {products &&
                products.map((product, index) => (
                  <li className={'product-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveProduct(product, index)}
                    key={index}>
                    <img src={'./images/women/' + (product.title) + '.jpg'} className="component-img"></img>
                    <div className="d-flex col justify-content-between pt-3">
                      <div>
                        {product.productname.toUpperCase()}
                        <br></br>
                        RM {product.price.toFixed(2)}
                      </div>
                      <div className="carticonbtn ti-shopping-cart" onClick={this.addToCart}></div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className='col-md-6'>
            {currentProduct ? (
              <form>
                <div className="product-detail">
                  <img src={'./images/women/' + currentProduct.title.toLowerCase() + '.jpg'} className="component-img"></img>
                  <div className="product-info">
                    <div>
                      <label>
                        <strong>Product Name:</strong>
                      </label> {" "}
                      {currentProduct.productname.toUpperCase()}
                    </div>
                    <div>
                      <label>
                        <strong>Description:</strong>
                      </label> {" "}
                      {currentProduct.description}
                    </div>
                    <div>
                      <label>
                        <strong>Size: </strong>{currentProduct.size.toUpperCase()}
                      </label> {" "}
                      <button className="sizebtn"><b>S</b></button>
                      <button className="sizebtn"><b>M</b></button>
                      <button className="sizebtn"><b>L</b></button>
                    </div>
                    <div>
                      <label>
                        <strong>Price:</strong>
                      </label> {" "}
                      RM {currentProduct.price.toFixed(2)}
                    </div>
                    <div>
                      <label>
                        <strong>Quantity:</strong>
                      </label> {" "}
                      <input type='number' 
                             value={this.state.quantity} 
                             onChange={this.onChangeQuantity}>
                      </input>
                    </div>
                    <div className="cartbtn" onClick={this.addToCart}>Add to Cart</div>
                  </div>
                </div>
              </form>
            )
              : (
                <div>
                  {/*<br />
                 <p>Please click on a Product...</p> */}
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}