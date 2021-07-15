import React, { Component } from "react";
import '../css/layouts.css';
import '../css/component.css';

import EventDataService from "../services/event.service";

export default class EventList extends Component {
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
    EventDataService.getAllPublished()
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
            <ul className='event-view flex-wrap'>
              {events &&
                events.map((event, index) => (
                  <a className={'event-div' + (index === currentIndex ? ' active' : '')}
                    onClick={() => this.setActiveEvent(event, index)} href='#event01'
                    key={index}>
                    <img src={'http://localhost:8080/api/files/' + event.title.toLowerCase() + '.png'}></img>
                    <div className="justify-content-center p-2">
                      <p className='text-center'><b>{event.eventname.toUpperCase()}</b></p>
                    </div>
                  </a>
                ))}
            </ul>
          </div>
            {currentEvent ? (
              <div className="modal" id="event01">
                <div className='modal-dialog'>
                  <div className='modal-content modal-product'>
                    <header className="modal-container">
                      <a href="#" className="closebtn">×</a>
                      <h4>{currentEvent.eventname}</h4>
                    </header>
                    <form>
                      <div className="event-detail">
                        <img src={'http://localhost:8080/api/files/' + currentEvent.title.toLowerCase() + '.png'}></img>
                        <div className="event-info">
                          {/* <div className='event-info-div'>
                            <label>
                              <strong>Event Name:</strong>
                            </label> {" "}
                            {currentEvent.eventname}
                          </div> */}
                          <div className='event-info-div'>
                            <label>
                              <strong>Description:</strong>
                            </label> {" "}
                            {currentEvent.description}
                          </div>
                          <div className='event-info-div'>
                            <label>
                              <strong>Date:</strong>
                            </label> {" "}
                            {currentEvent.startdate} - {currentEvent.enddate}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
        </div>
      </div>
    );
  }
}