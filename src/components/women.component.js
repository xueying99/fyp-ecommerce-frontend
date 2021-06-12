import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ProductDataService from "../services/product.service";

export default class Women extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.searchProductname = this.searchProductname.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchProductname: "",
      productsPerRow: 3
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
                    <img src={'./images/women/' + product.productname.toLowerCase() + '.jpg'}></img>
                    <div className="d-flex row justify-content-around p-2">
                      <div>{product.productname.toUpperCase()}</div>
                      <div>RM {product.price.toFixed(2)}</div>
                    </div>
                    <div className="cartbtn">Add to Cart</div>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-md-6'>
            {currentProduct ? (
              <form>
              <div className="product-detail">
                <img src={'./images/women/' + currentProduct.productname.toLowerCase() + '.jpg'}></img>
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
                  <button className="sizebtn">S</button>
                  <button className="sizebtn">M</button>
                  <button className="sizebtn">L</button>
                </div>
                <div>
                  <label>
                    <strong>Price:</strong>
                  </label> {" "} 
                  RM {currentProduct.price}
                </div>
                <div className="cartbtn"><strong>Cart </strong><i className="ti-shopping-cart"></i></div>
                </div>
              </div>
              </form>
            ) : (
              <div>
                <br />
                <p>Please click on a Product...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}