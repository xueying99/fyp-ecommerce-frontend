import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import PromoDataService from "../services/promo.service";

export default class Promotion extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPromo = this.onChangeSearchPromo.bind(this);
    this.retrievePromos = this.retrievePromos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePromo = this.setActivePromo.bind(this);
    this.searchPromo = this.searchPromo.bind(this);

    this.state = {
      promos: [],
      currentPromo: null,
      currentIndex: -1,
      searchPromo: ""
    };
  }

  componentDidMount() {
    this.retrievePromos();
  }

  onChangeSearchPromo(e) {
    const searchPromo = e.target.value;

    this.setState({
        searchPromo: searchPromo
    });
  }

  retrievePromos() {   
    PromoDataService.getAll()
        .then(response => {
            this.setState({
                promos: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
  }

  refreshList() {
    this.retrievePromos();
    this.setState({
        currentPromo: null,
        currentIndex: -1
    });
  }

  setActivePromo(promo, index) {
    this.setState({
      currentPromo: promo,
        currentIndex: index
    });
}
  searchPromo() {
    PromoDataService.findByTitle(this.state.searchPromo)
        .then(response => {
            this.setState({
              promos: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
}

  render() {
    const { searchPromo, promos, currentPromo, currentIndex } = this.state;

    return (
      <div className="container">
        {/* <header className="jumbotron">
        </header> */}
        <div className='mainHeader'>
            <h3>Offer & Events</h3>
        </div>
        <div className='mainContainer'>
          <div className='component-div'>
            <ul className='promo-view'>
              {promos && 
               promos.map((promo, index) => (
                <li className={'promo-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActivePromo(promo, index)}
                    key={index}>
                    <img src={'./images/promo/' + promo.title.toLowerCase() + '.png'}></img>
                    <div className="justify-content-center p-2">
                      <h4>{promo.title.toUpperCase()}</h4>
                      <p>{promo.description}</p>
                    </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-md-6'>
            {currentPromo ? (
              <p>{currentPromo.description}</p>
              // <form>
              // <div className="product-detail">
              //   <img src={'./images/women/' + currentProduct.productname.toLowerCase() + '.jpg'}></img>
              //   <div className="product-info"> 
              //   <div>
              //     <label>
              //       <strong>Product Name:</strong>
              //     </label> {" "}
              //     {currentProduct.productname.toUpperCase()}
              //   </div>
              //   <div>
              //     <label>
              //       <strong>Description:</strong>
              //     </label> {" "}
              //     {currentProduct.description}
              //   </div>
              //   <div>
              //     <label>
              //       <strong>Size: </strong>{currentProduct.size.toUpperCase()}
              //     </label> {" "}
              //     <button className="sizebtn">S</button>
              //     <button className="sizebtn">M</button>
              //     <button className="sizebtn">L</button>
              //   </div>
              //   <div>
              //     <label>
              //       <strong>Price:</strong>
              //     </label> {" "} 
              //     RM {currentProduct.price}
              //   </div>
              //   <div className="cartbtn"><strong>Cart </strong><i className="ti-shopping-cart"></i></div>
              //   </div>
              // </div>
              // </form>
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