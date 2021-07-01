import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';
import '../css/themify-icons/themify-icons.css';

import EventDataService from "../services/event.service";

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchEvent = this.onChangeSearchEvent.bind(this);
    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.searchEvent = this.searchEvent.bind(this);

    this.state = {
      events: [],
      currentEvent: null,
      currentIndex: -1,
      searchEvent: ""
    };
  }

  componentDidMount() {
    this.retrieveEvents();
  }

  onChangeSearchEvent(e) {
    const searchEvent = e.target.value;

    this.setState({
        searchEvent: searchEvent
    });
  }

  retrieveEvents() {   
    EventDataService.getAll()
        .then(response => {
            this.setState({
              events: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
  }

  refreshList() {
    this.retrieveEvents();
    this.setState({
        currentEvent: null,
        currentIndex: -1
    });
  }

  setActiveEvent(event, index) {
    this.setState({
      currentEvent: event,
        currentIndex: index
    });
}
  searchEvent() {
    EventDataService.findByTitle(this.state.searchEvent)
        .then(response => {
            this.setState({
              events: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
}

  render() {
    const { searchEvent, events, currentEvent, currentIndex } = this.state;

    return (
      <div className="">
        <header className="jumbotron">
            <h3><b>OFFER & EVENTS</b></h3>
        </header>
        <div className='mainContainer'>
          <div className='component-div'>
            <ul className='event-view'>
              {events && 
               events.map((event, index) => (
                <li className={'event-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveEvent(event, index)}
                    key={index}>
                    <img src={'./images/event/' + event.title.toLowerCase() + '.png'}></img>
                    <div className="justify-content-center p-2">
                      <h4>{event.eventname.toUpperCase()}</h4>
                      <p>{event.description}</p>
                    </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className='col-md-6'>
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
                <p>Please click on a Promotion...</p>
              </div>
            )}
          </div>*/}
        </div>
      </div>
    );
  }
}