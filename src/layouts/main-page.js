import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/themify-icons/themify-icons.css';
import '../css/layouts.css';

import shopping from '../img/bg-images/main-bg-5.jpg'

export default class MainPage extends Component {

    render() {

        return (
            <div className=''>
                <div className="hero-equal-height gradient-overlay">
                    {/* style={{ backgroundImage: `url(${shopping})` }} */}
                    <div className="container">
                        <div className="row align-items-center justify-content-around">
                            <div className="">
                                <div className="hero-content-left position-relative z-index text-center text-white">
                                    <h1 className="text-white">Welcome to FORTRY Virtual Fitting Room</h1>
                                    <p className="lead">
                                        Our design projects are fresh and simple and will benefit your business greatly. Learn more
                                        about our work! Here is Final Year Project by <span className='font-italic'>KHOOXUEYING</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shape-bottom">
                        <img src="img/curve-shape-top.svg" alt="shape" className="bottom-shape img-fluid" />
                    </div>
                </div>

                <div className='mainHeader'>
                    <h3>CATEGORY</h3>
                </div>
                <div className='mainContainer'>
                    <div className='categoryDiv'>
                        <div className='category'>
                            <img src='./images/women-fashion.jpg' alt='Female Fashion icon' />
                            <Link to="/women-products"><p>WOMEN</p></Link>
                        </div>
                        <div className='category'>
                            <img src='./images/men-clothing.jpg' alt='Male Fashion icon' />
                            <Link to="/men-products"><p>MEN</p></Link>
                        </div>
                        <div className='category'>
                            <img src='./images/sale-icon-2.jpg' alt='Sale icon' />
                            <Link to="/events"><p>OFFER & EVENTS</p></Link>
                        </div>
                        <div className='category'>
                            <img src='./images/fitting-room.jpg' alt='Virtual Fitting Room icon' />
                            <Link to="/v-fitting-room"><p>VIRTUAL FITTING ROOM SERVICE</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}