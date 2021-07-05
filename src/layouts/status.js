import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/index.css';

export default class Status extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: ''
        };
    }

    render() {

        return (
            <div className="status-container">
                <div className="status">
                    <div>
                        <img src='../images/success.svg'></img>
                    </div>
                    <div>
                        <img src='../images/thank-you.svg'></img>
                    </div>
                    <div>
                        <p>Your order has been successfully placed.</p>
                    </div>
                    <Link to="/home" className="btn status-btn">
                        <b>Return Home</b>
                    </Link>
                </div>
            </div>
        );
    }
}