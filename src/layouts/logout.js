import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/index.css';

import background from "../img/fortry-logo-transparent.png";

export default class Logout extends Component {

    render() {

        return (
            <div class="gray-light-bg d-block pt-5 pb-5">
                {/* <div className="bg-cover"
                    style={{ backgroundImage: `url(${background})` }}> */}
                    <div class="logout-container">
                        <div class="logout-div">
                            <div class="text-center">
                                <h1 class="mb-5">Thank You !</h1>

                                <p class="lead">We will be in touch shortly. We're looking forward to your demo. If you have any questions prior to your demo feel free to give us a call.</p>

                                <div class="mb-2">
                                    <h6 class="mb-3">
                                        <span class="ti-email mr-2 align-items-center logout-icon"></span>
                                        khooxueying@gmail.com
                                    </h6>
                                    <h6 class="mb-3">
                                        <span class="ti-github mr-2 align-items-center logout-icon"></span>
                                        https://github.com/xueying99
                                    </h6>
                                    <h6 class="mb-0">
                                        <span class="fa fa-github mr-2 align-items-center"></span>
                                        https://github.com/xueying99
                                    </h6>
                                </div>
                                <Link to="/login" className="btn status-btn">
                                    <b>Return Login</b>
                                </Link>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
}