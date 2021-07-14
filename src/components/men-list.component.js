import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import '../css/images-gallery.css';
import '../css/layouts.css';
import '../css/component.css';
import Grid from "@material-ui/core/Grid";
import { GlassMagnifier } from "react-image-magnifiers";

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";
import UploadService from "../services/file-upload.service";


export default class Men extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      quantity: 1,
      cart: [],
      imageInfos: [],
    };
  }

  componentDidMount() {
    this.retrieveProducts();
    UploadService.getFiles().then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    });
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState({
      quantity: quantity
    });
  }

  retrieveProducts() {
    ProductDataService.getAllPublished()
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
    const { products, currentProduct, currentIndex, imageInfos } = this.state;

    return (
      <div className="">
        <header className="jumbotron">
          <h3><b>MEN FASHION</b></h3>
        </header>
        <div className='mainContainer'>
          <div className='component-div'>
            <div className='product-view flex-wrap'>
              {products &&
                products.filter(i => i.category === "men").map((product, index) => (
                  <a className={'product-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveProduct(product, index)} href='#men-product'
                    key={index}>
                    <img src={'http://localhost:8080/api/files/' + (product.title) + '.jpg'} className="component-img"></img>
                    <div className="d-flex col justify-content-between pt-3">
                      <div>
                        {product.productname.toUpperCase()}
                        <br></br>
                        RM {product.price.toFixed(2)}
                      </div>
                      <div className="carticonbtn ti-shopping-cart" onClick={this.addToCart}></div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
          <div className="modal" id="size-guide">
            <div className='modal-dialog'>
              <div className='modal-content'>
                <header className="modal-container">
                  <a href="#men-product" className="closebtn">×</a>
                  <h4>Size Guide for Men Products</h4>
                </header>
                <div className='mr-auto ml-auto'>
                  <table className='size-guide-table'>
                    <thead>
                      <tr>
                        <td>Size</td>
                        <td>Shoulder</td>
                        <td>Bust</td>
                        <td>Length</td>
                        <td>Sleeve</td>
                        <td>Cuff</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>S</td>
                        <td>44.5</td>
                        <td>103</td>
                        <td>72</td>
                        <td>22.4</td>
                        <td>33.8</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>46</td>
                        <td>107</td>
                        <td>74</td>
                        <td>23</td>
                        <td>35</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>47.8</td>
                        <td>112</td>
                        <td>76</td>
                        <td>23.6</td>
                        <td>36.2</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>49.6</td>
                        <td>117</td>
                        <td>78</td>
                        <td>24.2</td>
                        <td>37.4</td>
                      </tr>
                      <tr>
                        <td>XXL</td>
                        <td>51.4</td>
                        <td>122</td>
                        <td>80</td>
                        <td>24.8</td>
                        <td>38.6</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>This data was obtained from manually measuring the product, it may be off by 1-2CM.</p>
                </div>
              </div>
            </div>
          </div>
          {currentProduct ? (
            <div className="modal" id="men-product">
              <div className='modal-dialog'>
                <div className='modal-content modal-product'>
                  <header className="modal-container">
                    <a href="#" className="closebtn">×</a>
                  </header>
                  <form className=''>
                    <div className="product-detail">
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <GlassMagnifier
                            imageSrc={"http://localhost:8080/api/files/" + currentProduct.title + ".jpg"}
                            imageAlt="Example"
                            largeImageSrc=""
                            magnifierSize='40%'
                          />
                        </Grid>
                        <Grid container spacing={2} item xs={6} direction="column">
                          <Grid item>
                            <div id="myPortal" />

                            <div className="product-info">
                              <div className='product-info-div'>
                                <label>
                                  <strong>Product Name:</strong>
                                </label>
                                <p>{currentProduct.productname.toUpperCase()}</p>
                              </div>
                              <div className='product-info-div'>
                                <label>
                                  <strong>Description:</strong>
                                </label> {" "}
                                <p>{currentProduct.description}</p>
                              </div>
                              <a href='#size-guide'>Size Guide?</a>
                              <div className='product-info-div'>
                                <label>
                                  <strong>Size: </strong>
                                </label> {" "}
                                <button className="sizebtn"><b>{currentProduct.size.toUpperCase()}</b></button>
                              </div>
                              <div className='product-info-div'>
                                <label>
                                  <strong>Price:</strong>
                                </label> {" "}
                                RM {currentProduct.price.toFixed(2)}
                              </div>
                              <div className='product-info-div'>
                                <label>
                                  <strong>Quantity:</strong>
                                </label> {" "}
                                <input type='number'
                                  value={this.state.quantity}
                                  onChange={this.onChangeQuantity}
                                  min='1' max='20' >
                                </input>
                              </div>
                              <div className="cartbtn" onClick={this.addToCart}><i className='ti-shopping-cart'></i>Add to Cart</div>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )
          }
        </div>
      </div>
    );
  }
}