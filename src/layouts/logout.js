import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/index.css';


export default class Logout extends Component {

    render() {

        return (
            <div className="gray-light-bg d-block pt-5 pb-5">
                <div className="logout-container">
                    <div className="logout-div">
                        <div className="text-center">
                            <h1 className="mb-5">Thank You !</h1>

                            <p className="lead">We will be in touch shortly. We're looking forward to your demo. If you have any questions prior to your demo feel free to give us a call.</p>

                            <div className="mb-2">
                                <h6 className="mb-3">
                                    <span className="ti-email mr-2 align-items-center logout-icon"></span>
                                    khooxueying@gmail.com
                                </h6>
                                <h6 className="mb-3">
                                    <span className="ti-github mr-2 align-items-center logout-icon"></span>
                                    https://github.com/xueying99
                                </h6>
                                <h6 className="mb-0">
                                    <span className="fa fa-github mr-2 align-items-center"></span>
                                    https://github.com/xueying99
                                </h6>
                            </div>
                            <Link to="/login" className="btn status-btn">
                                <b>Return Login</b>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}