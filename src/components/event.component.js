import React, { Component } from "react";

import EventDataService from "../services/event.service";

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeEventname = this.onChangeEventname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartdate = this.onChangeStartdate.bind(this);
        this.onChangeEnddate = this.onChangeEnddate.bind(this);
        this.getEvent = this.getEvent.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            currentEvent: {
                id: null,
                title: "",
                eventname: "",
                description: "",
                startdate: "",
                enddate: "",
                published: false,

            },
            message: ""
        };
    }

    componentDidMount() {
        this.getEvent(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentEvent: {
                    ...prevState.currentEvent,
                    title: title
                }
            };
        });
    }

    onChangeEventname(e) {
        const eventname = e.target.value;

        this.setState(function (prevState) {
            return {
                currentEvent: {
                    ...prevState.currentEvent,
                    eventname: eventname
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentEvent: {
                ...prevState.currentEvent,
                description: description
            }
        }));
    }

    onChangeStartdate(e) {
        const startdate = e.target.value;

        this.setState(prevState => ({
            currentEvent: {
                ...prevState.currentEvent,
                startdate: startdate
            }
        }));
    }

    onChangeEnddate(e) {
        const enddate = e.target.value;

        this.setState(prevState => ({
            currentEvent: {
                ...prevState.currentEvent,
                enddate: enddate
            }
        }));
    }

    getEvent(id) {
        EventDataService.get(id)
            .then(response => {
                this.setState({
                    currentEvent: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentEvent.id,
            title: this.state.currentEvent.title,
            eventname: this.state.currentEvent.eventname,
            description: this.state.currentEvent.description,
            startdate: this.state.currentEvent.startdate,
            enddate: this.state.currentEvent.enddate,
            published: status
        };

        EventDataService
            .update(this.state.currentEvent.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentEvent: {
                        ...prevState.currentEvent,
                        published: status
                    }
                }));
                console.log(response.data);
                alert("Event PUBLISHED successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateEvent() {
        EventDataService.update(
            this.state.currentEvent.id,
            this.state.currentEvent
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The event was updated successsfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteEvent() {
        EventDataService.delete(this.state.currentEvent.id)
            .then(response => {
                console.log(response.data);
                alert("Event DELETED successfully!");
                this.props.history.push('/events')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentEvent } = this.state;

        return (
            <div className='event-single-view'>
                {currentEvent ? (
                    <div className='edit-form'>
                        <h4>Event</h4>
                        <div className=' mt-4 mb-4 text-center'>
                            <img src={'http://localhost:8080/api/files/' + currentEvent.title + '.png'}></img>
                        </div>
                        <div className='single-div'>
                            <form>
                                <div className='form-group-row'>
                                    <div className='form-group'>
                                        <label htmlFor='title'>Image Name</label>
                                        <input size='30'
                                            type='text'
                                            className='form-control'
                                            id='title'
                                            value={currentEvent.title}
                                            onChange={this.onChangeTitle} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlfor='eventname'>Event Name</label>
                                        <input size='30'
                                            type='text'
                                            className='form-control'
                                            id='eventname'
                                            required
                                            value={currentEvent.eventname}
                                            onChange={this.onChangeEventname}
                                            name='eventname'
                                        />
                                    </div>
                                </div>
                                <div className='form-group-row'>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Description</label>
                                        <input size='82'
                                            type='text'
                                            className='form-control'
                                            id='description'
                                            value={currentEvent.description}
                                            onChange={this.onChangeDescription} />
                                    </div>

                                </div>
                                <div className='form-group-row'>

                                    <div className='form-group date-input'>
                                        <label htmlfor='startdate'>Start Date ({currentEvent.startdate})</label>
                                        <input
                                            type='datetime-local'
                                            className='form-control'
                                            id='startdate'
                                            required
                                            value={currentEvent.startdate}
                                            onChange={this.onChangeStartdate}
                                            name='startdate'
                                        />
                                    </div>
                                    <div className='form-group date-input'>
                                        <label htmlfor='enddate'>End Date ({currentEvent.enddate})</label>
                                        <input
                                            type='datetime-local'
                                            className='form-control'
                                            id='price'
                                            required
                                            value={currentEvent.enddate}
                                            onChange={this.onChangeEnddate}
                                            name='enddate'
                                        />
                                    </div>
                                </div>
                                <div className='pl-5'>
                                    <div className='form-group'>
                                        <label>
                                            <strong>Status: </strong>
                                        </label>{" "}
                                        {currentEvent.published ? "Published" : "Pending"}
                                    </div>

                                </div>
                            </form>
                            <div className='pl-5'>
                                {currentEvent.published ? (
                                    <button className='btn btn-primary mr-4' onClick={() => this.updatePublished(false)}>
                                        Unpublish
                                    </button>
                                ) : (
                                    <button className='btn btn-primary mr-4' onClick={() => this.updatePublished(true)}>
                                        Publish
                                    </button>
                                )}

                                <button className='btn btn-danger mr-4' onClick={this.deleteEvent}>
                                    Delete
                                </button>
                                <button type='submit' className='btn btn-success' onClick={this.updateEvent}>
                                    Update
                                </button>
                                <div className='mt-3'>
                                    <p>{this.state.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}