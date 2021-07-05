import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/index.css';

import EventDataService from "../services/event.service";

export default class EventManagement extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeEventname = this.onChangeEventname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartdate = this.onChangeStartdate.bind(this);
        this.onChangeEnddate = this.onChangeEnddate.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveEvents = this.retrieveEvents.bind(this);
        this.setActiveEvent = this.setActiveEvent.bind(this);
        this.removeAllEvents = this.removeAllEvents.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);

        this.state = {
            events: [],
            currentEvent: null,
            currentIndex: -1,

            id: null,
            title: "",
            eventname: "",
            description: "",
            startdate: "",
            enddate: "",
            published: false,

            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveEvents();
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

    removeAllEvents() {
        EventDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeEventname(e) {
        this.setState({
            eventname: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeStartdate(e) {
        this.setState({
            startdate: e.target.value
        });
    }

    onChangeEnddate(e) {
        this.setState({
            enddate: e.target.value
        });
    }

    saveEvent() {
        var data = {
            title: this.state.title,
            eventname: this.state.eventname,
            description: this.state.description,
            startdate: this.state.startdate,
            enddate: this.state.enddate
        };

        EventDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    eventname: response.data.eventname,
                    description: response.data.description,
                    startdate: response.data.startdate,
                    enddate: response.data.enddate,
                    published: response.data.published,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newEvent() {
        this.setState({
            id: null,
            title: "",
            eventname: "",
            description: "",
            startdate: "",
            enddate: "",
            published: false,

            submitted: false
        });
    }

    render() {
        const { events, currentEvent, currentIndex } = this.state;

        return (
            <div className=''>
                <header className="jumbotron">
                    <h3><b>EVENT MANAGEMENT</b></h3>
                </header>
                <div className='mgt-container'>
                    <div className="submit-form">
                        {this.state.submitted ? (
                            <div>
                                <h4>You submitted successfully!</h4>
                                <button className='btn btn-success' onClick={this.newEvent}>Add New Event / Promotion</button>
                            </div>
                        ) : (
                            <div className='mgt-div'>
                                <h4 className='text-center mb-4'>Add New Event / Promotion</h4>
                                <div className='form-group'>
                                    <label htmlfor='title'>Image Name<span> ( Please upload image at <a href='/image-mgt'>here</a> )</span></label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='title'
                                        required
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}
                                        name='title'
                                        placeholder='Example: banner01'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlfor='eventname'>Event Name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='eventname'
                                        required
                                        value={this.state.eventname}
                                        onChange={this.onChangeEventname}
                                        name='eventname'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlfor='description'>Description</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='description'
                                        required
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                        name='description'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlfor='startdate'>Start Date</label>
                                    <input
                                        type='datetime-local'
                                        className='form-control'
                                        id='startdate'
                                        required
                                        value={this.state.startdate}
                                        onChange={this.onChangeStartdate}
                                        name='startdate'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlfor='enddate'>End Date</label>
                                    <input
                                        type='datetime-local'
                                        className='form-control'
                                        id='enddate'
                                        required
                                        value={this.state.enddate}
                                        onChange={this.onChangeEnddate}
                                        name='enddate'
                                    />
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <button className='btn btn-danger event-mgt-btn' onClick={this.newEvent}>Clear All</button>
                                    <button onClick={this.saveEvent} className='btn btn-success event-mgt-btn'>Submit</button>
                                </div>
                            </div>
                        )}
                        <div>
                        </div>
                    </div>
                    <div className='row mgt-list-div'>
                        <div className='col-md-5'>
                            <h4 className='text-left'>Events List</h4>

                            <ul className='mgt-list-view'>
                                {events &&
                                    events.map((event, index) => (
                                        <li className={'list-div' + (index === currentIndex ? ' active' : '')}
                                            onClick={() => this.setActiveEvent(event, index)}
                                            key={index}>
                                            <div>
                                                <p>{event.eventname}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <button className='m-3 btn btn-danger' onClick={this.removeAllEvents}>
                                Remove All
                            </button>
                        </div>
                        <div className='col-md-7'>
                            {currentEvent ? (
                                <div className='event-mgt-detail'>
                                    <h4>Event</h4>
                                    <div className='event-mgt-detail-img'>
                                        <img src={'http://localhost:8080/api/files/' + currentEvent.title.toLowerCase() + '.png'}></img>
                                    </div>
                                    <div className='event-mgt-detail-info'>
                                        <label>
                                            <strong>Event Name:</strong>
                                        </label> {" "}
                                        {currentEvent.eventname}
                                    </div>
                                    <div className='event-mgt-detail-info'>
                                        <label>
                                            <strong>Description:</strong>
                                        </label> {" "}
                                        {currentEvent.description}
                                    </div>
                                    <div className='event-mgt-detail-info'>
                                        <label>
                                            <strong>Date:</strong>
                                        </label> {" "}
                                        {currentEvent.startdate} - {currentEvent.enddate}
                                    </div>
                                    <div className='event-mgt-detail-info'>
                                        <label>
                                            <strong>Status:</strong>
                                        </label> {" "}
                                        {currentEvent.published ? "Published" : "Pending"}
                                    </div>

                                    <Link to={'/events/' + currentEvent.id} className='btn btn-warning mgt-detail-btn'>
                                        Edit
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <br />
                                    <p>Please click on an Event for detail information...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}