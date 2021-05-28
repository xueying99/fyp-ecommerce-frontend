import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';

import UserService from "../services/user.service";

export default class Women extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        {/* <header className="jumbotron">
        </header> */}
        <div className='mainHeader'>
            <h3>Men Fashion</h3>
        </div>
        <div className='mainContainer'>
            <div className='component-div'>
                <div className='product-div'>
                    <div>
                        <img src='./images/men/shirt-1.jpg' alt='shirt-1' />
                        <p>Shirt 1</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                    <img src='./images/men/shirt-2.jpg' alt='shirt-2' />
                        <p>Shirt 2</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                    <img src='./images/men/shirt-3.jpg' alt='shirt-3' />
                        <p>Shirt 3</p>
                    </div>
                </div>
            </div>
            <div className='component-div'>
                <div className='product-div'>
                    <div>
                    <img src='./images/men/shirt-4.jpg' alt='shirt-4' />
                        <p>Shirt 4</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                    <img src='./images/men/shirt-5.jpg' alt='shirt-5' />
                        <p>Shirt 5</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                    <img src='./images/men/shirt-6.jpg' alt='shirt-6' />
                        <p>Shirt 6</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}