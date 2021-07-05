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

const PREFIX_URL = "http://localhost:8080/api/files/dress";
// './images/women/dress';

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
        thumbnail: `${PREFIX_URL}01-1.jpg`,
        original: `${PREFIX_URL}01-1.jpg`,
        description: 'Render custom slides within the gallery',
        renderItem: this.myRenderItem.bind(this)
      },
      {
        original: `${PREFIX_URL}01-2.jpg`,
        thumbnail: `${PREFIX_URL}01-2.jpg`,
      },
      {
        original: `${PREFIX_URL}01-3.jpg`,
        thumbnail: `${PREFIX_URL}01-3.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails dress03'
      },
      {
        original: `${PREFIX_URL}01-4.jpg`,
        thumbnail: `${PREFIX_URL}01-4.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails'
      },
      {
        original: `${PREFIX_URL}02-1.jpg`,
        thumbnail: `${PREFIX_URL}02-1.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
      // {
      //   original: `${PREFIX_URL}02-2.jpg`,
      //   thumbnail: `${PREFIX_URL}02-2.jpg`,
      //   originalClass: 'featured-slide',
      //   thumbnailClass: 'featured-thumb',
      // },
      {
        original: `${PREFIX_URL}03-1.jpg`,
        thumbnail: `${PREFIX_URL}03-1.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
      // {
      //   original: `${PREFIX_URL}02-2.jpg`,
      //   thumbnail: `${PREFIX_URL}02-2.jpg`,
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
        // renderItem: this.myRenderItem.bind(this)
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

    let imagename = ''
    for (let i = 0; i < this.state.imageInfos.length; i++) {
      for (let j = 0; j < this.state.products.length; j++) {
        if (this.state.imageInfos[i].name === (this.state.products[j].title + "-1.jpg")) {
          imagename = this.state.imageInfos[i].name
        }
      }
    }

    return (
      <div className="">
        <header className="jumbotron">
          <h3><b>WOMEN FASHION</b></h3>
        </header>
        <div className='mainContainer'>
          <div className='component-div'>
            <ul className='product-view flex-wrap'>

              {products &&
                products.map((product, index) => (
                  <li className={'product-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveProduct(product, index)}
                    key={index}>
                    <img src={'http://localhost:8080/api/files/' + (product.title) + '-1.jpg'} className="component-img"></img>
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
                
                  {/* <ReactImageGallery /> */}
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
                    <div className='product-info-div'>
                      <label>
                        <strong>Size: </strong>{currentProduct.size.toUpperCase()}
                      </label> {" "}
                      <button className="sizebtn"><b>S</b></button>
                      <button className="sizebtn"><b>M</b></button>
                      <button className="sizebtn"><b>L</b></button>
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
                        onChange={this.onChangeQuantity}>
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