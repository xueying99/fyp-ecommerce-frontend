import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageMagnify from "../layouts/image-magnify";
import '../css/images-gallery.css';

import ProductDataService from "../services/product.service";
import CartDataService from "../services/cart.service";

const PREFIX_URL = './images/women/dress';

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
      renderItem: this.myRenderItem.bind(this)

    };
    
    this.images = [
      {
        thumbnail: `${PREFIX_URL}01-1.jpg`,
        original: `${PREFIX_URL}01-1.jpg`,
        description: 'Render custom slides within the gallery',
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
      {
        original: `${PREFIX_URL}02-2.jpg`,
        thumbnail: `${PREFIX_URL}02-2.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
      {
        original: `${PREFIX_URL}02-1.jpg`,
        thumbnail: `${PREFIX_URL}02-1.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
      {
        original: `${PREFIX_URL}02-2.jpg`,
        thumbnail: `${PREFIX_URL}02-2.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
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
        thumbnail:`${PREFIX_URL}${i}.jpg`
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
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

        <div className='app-sandbox'>

          <div className='app-sandbox-content'>
            {/* <h2 className='app-header'>Settings</h2> */}
          </div>

        </div>
      </section>
    );
  }
}

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
      <div className="">
        <header className="jumbotron">
            <h3><b>WOMEN FASHION</b></h3>
        </header>
        <div className='mainContainer'>
          <div className='component-div'>
            <ul className='product-view'>
              {products &&
                products.map((product, index) => (
                  <li className={'product-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveProduct(product, index)}
                    key={index}>
                    <img src={'./images/women/' + (product.title) + '-1.jpg'} className="component-img"></img>
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
                <ReactImageGallery />
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