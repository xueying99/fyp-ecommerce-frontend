import React, { Component } from "react";
import '../css/layouts.css';
import '../css/component.css';
import Grid from "@material-ui/core/Grid";
import { GlassMagnifier } from "react-image-magnifiers";

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";
import UploadService from "../services/file-upload.service";


export default class Women extends Component {
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
        alert("Please login to proceed add cart!");
        console.log(e);
      });
  }

  render() {
    const { products, currentProduct, currentIndex, imageInfos } = this.state;

    return (
      <div className="">
        <header className="jumbotron">
          <h3><b>WOMEN FASHION</b></h3>
        </header>
        <div className='mainContainer'>
          <div className='component-div'>
            <div className='product-view flex-wrap'>
              {products &&
                products.filter(i => i.category === "women").map((product, index) => (
                  <a className={'product-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveProduct(product, index)} href='#women-product'
                    key={index}>
                    <img src={'http://localhost:8080/api/files/' + (product.title) + '.jpg'} className="component-img"></img>
                    <div className="d-flex col justify-content-between pt-3">
                      <div>
                        {product.productname.toUpperCase()}
                        <br></br>
                        RM {product.price.toFixed(2)}
                      </div>
                      <a className="carticonbtn ti-shopping-cart" onClick={this.setActiveProduct} href='#women-product'></a>
                    </div>
                  </a>
                ))}
            </div>
          </div>
          <div className="modal" id="size-guide">
            <div className='modal-dialog'>
              <div className='modal-content modal-product'>
                <header className="modal-container">
                  <a href="#women-product" className="closebtn">×</a>
                  <h4>Size Guide for Women Products</h4>
                </header>
                <div className='mr-auto ml-auto'>
                  <table className='size-guide-table'>
                    <thead>
                      <tr>
                        <td>Size</td>
                        <td>Shoulder</td>
                        <td>Waist</td>
                        <td>Hip</td>
                        <td>Top Length</td>
                        <td>Pants Length</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>S</td>
                        <td>37.5</td>
                        <td>62 - 98</td>
                        <td>104</td>
                        <td>39 / 49</td>
                        <td>94</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>38.5</td>
                        <td>66 - 102</td>
                        <td>108</td>
                        <td>40 / 50</td>
                        <td>95</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>40</td>
                        <td>72 - 108</td>
                        <td>114</td>
                        <td>41.5 / 51.5</td>
                        <td>96.5</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>41.5</td>
                        <td>78 - 114</td>
                        <td>120</td>
                        <td>43 / 53</td>
                        <td>98</td>
                      </tr>
                      <tr>
                        <td>XXL</td>
                        <td>43</td>
                        <td>82 - 120</td>
                        <td>126</td>
                        <td>44.5 / 54.5</td>
                        <td>98</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>This data was obtained from manually measuring the product, it may be off by 1-2CM.</p>
                </div>
              </div>
            </div>
          </div>
          {currentProduct ? (
            <div className="modal" id="women-product">
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
                                  min='1' max='20'>
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