import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../css/themify-icons/themify-icons.css';
import '../css/layouts.css';
import '../css/header.css';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);
        this.retrieveProduct = this.retrieveProduct.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchProduct = this.searchProduct.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            searchProduct: ""
        };
    }

    componentDidMount() {
        this.retrieveProduct();
    }

    onChangeSearchProduct(e) {
        const searchProduct = e.target.value;

        this.setState({
            searchProduct: searchProduct
        });
    }

    retrieveProduct() {
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
        this.retrieveProduct();
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

    searchProduct() {
        ProductDataService.findByProductName(this.state.searchProduct)
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
        const { searchProduct, products, currentProduct, currentIndex } = this.state;

        const slideImages = [
            '/images/event/banner01.png',
            '/images/event/banner02.png',
            '/images/event/banner03.png'
        ];
          
        const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
            onChange: (oldIndex, newIndex) => {
            }
        }

        return (
            <div className='mainView'>
                <div className="slide-container">
                    <Slide {...properties}>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                            </div>
                        </div>
                    </Slide>
                </div>

                <div className='mainHeader'>
                    <h3>CATEGORY</h3>
                </div>
                <div className='mainContainer'>
                    <div className='categoryDiv'>
                        <div className='category'>
                            <img src='./images/women-fashion.jpg' alt='Female Fashion icon' />
                            <Link to="/women"><p>WOMEN</p></Link>
                        </div>
                        <div className='category'>
                            <img src='./images/men-clothing.jpg' alt='Male Fashion icon' />
                            <Link to="/men"><p>MEN</p></Link>
                        </div>
                        <div className='category'>
                            <img src='./images/sale-icon-2.jpg' alt='Sale icon' />
                            <Link to="/event"><p>OFFER & EVENTS</p></Link>
                        </div>
                        <div className='category'>
                            <img src='./images/fitting-room.jpg' alt='Virtual Fitting Room icon' />
                            <Link to="/tutorials"><p>VIRTUAL FITTING ROOM SERVICE</p></Link>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}