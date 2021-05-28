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
            <h3>Women Fashion</h3>
        </div>
        <div className='mainContainer'>
            <div className='component-div'>
                <div className='product-div'>
                    <div>
                        <img src='./images/women/dress-1.jpg' alt='dress-1' />
                        <p>Dress 1</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                        <img src='./images/women/dress-2.jpg' alt='dress-2' />
                        <p>Dress 2</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                        <img src='./images/women/dress-3.jpg' alt='dress-3' />
                        <p>Dress 3</p>
                    </div>
                </div>
            </div>
            <div className='component-div'>
                <div className='product-div'>
                    <div>
                        <img src='./images/women/dress-4.jpg' alt='dress-4' />
                        <p>Dress 4</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                        <img src='./images/women/dress-5.jpg' alt='dress-5' />
                        <p>Dress 5</p>
                    </div>
                </div>
                <div className='product-div'>
                    <div>
                        <img src='./images/women/dress-6.jpg' alt='dress-6' />
                        <p>Dress 6</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}