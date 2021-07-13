import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import '../css/images-gallery.css';
import '../css/layouts.css';
import '../css/component.css';
import Grid from "@material-ui/core/Grid";

import ImageMagnify from "../layouts/image-magnify";
import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";
import UploadService from "../services/file-upload.service";

const PREFIX_URL = "http://localhost:8080/api/files/men";

class ReactImageGallery extends Component {
  myRenderItem() {
    return <ImageMagnify {...this.props} />;
  }

  constructor() {
    super();

    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      thumbnailPosition: 'bottom',
      showVideo: {},
      imageInfos: [],
    };

    this.images = [
      {
        thumbnail: `${PREFIX_URL}01.jpg`,
        original: `${PREFIX_URL}01.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Men Shirts 01',
      },
      // {
      //   original: `${PREFIX_URL}01-1.jpg`,
      //   thumbnail: `${PREFIX_URL}01-1.jpg`,
      //   originalClass: 'featured-slide',
      //   thumbnailClass: 'featured-thumb',
      // },
      {
        original: `${PREFIX_URL}02.jpg`,
        thumbnail: `${PREFIX_URL}02.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Men Shirts 02'
      },
      // {
      //   original: `${PREFIX_URL}02-1.jpg`,
      //   thumbnail: `${PREFIX_URL}02-1.jpg`,
      //   originalClass: 'featured-slide',
      //   thumbnailClass: 'featured-thumb',
      // },
      // {
      //   original: `${PREFIX_URL}03.jpg`,
      //   thumbnail: `${PREFIX_URL}03.jpg`,
      //   originalClass: 'featured-slide',
      //   thumbnailClass: 'featured-thumb',
      // },
      // {
      //   original: `${PREFIX_URL}03-1.jpg`,
      //   thumbnail: `${PREFIX_URL}03-1.jpg`,
      //   originalClass: 'featured-slide',
      //   thumbnailClass: 'featured-thumb',
      // },
    ].concat(this._getStaticImages());
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _getStaticImages() {
    let images = [];
    for (let i = 2; i < images.length; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail: `${PREFIX_URL}${i}.jpg`,
      });
    }
    return images;
  }

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    });
  }

  render() {

    return (

      <section className='app-gallery'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onScreenChange={this._onScreenChange.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showThumbnails={this.state.showThumbnails}
          additionalClass="app-image-gallery"
        />
      </section>
    );
  }
}

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
            <ul className='product-view flex-wrap'>
              {products &&
                products.filter(i=> i.category === "men").map((product, index) => (
                  <li className={'product-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveProduct(product, index)}
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
                  </li>
                ))}
            </ul>
          </div>
          <div className='col-md-auto'>
            {currentProduct ? (
              <form className=''>
                <div className="product-detail">
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <ReactImageGallery />
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
                          <div>
                            <table>
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
                          <div className="cartbtn" onClick={this.addToCart}>Add to Cart</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </form>
            ) : (
              <div></div>
            )
            }
          </div>
        </div>
      </div>
    );
  }
}