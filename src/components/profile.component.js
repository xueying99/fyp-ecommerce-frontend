import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "../css/component.css";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
// import UserDataService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePoscode = this.onChangePoscode.bind(this);
    this.onChangeState = this.onChangeState.bind(this);

    this.state = {
      users: [],
      currentUser: AuthService.getCurrentUser(),
      currentIndex: -1,
      email: "",
      address: "",
      poscode: "",
      state: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onChangePoscode(e) {
    this.setState({
      poscode: e.target.value
    });
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value
    });
  }

  render() {
    const { users, currentUser, currentIndex } = this.state;

    return (
      <div className="">
        <header className="jumbotron">
          <h3><strong>PROFILE PAGE</strong></h3>
        </header>
        <div className='mb-5'>
          <Tabs defaultTab="vertical-tab-one" vertical className="vertical-tabs">
            <TabList className='tab-list-div'>
              <Tab tabFor="vertical-tab-one">Profile</Tab>
              <Tab tabFor="vertical-tab-two">Order History</Tab>
              <Tab tabFor="vertical-tab-three">Tab 3</Tab>
            </TabList>

            <TabPanel tabId="vertical-tab-one" className='tab-content-div'>
              <div className="profile-view">
                <div className="profile-table">
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card" />
                  <div className='mt-5'>
                    <div className='profile-table-row'>
                      <label className=''>Username</label>
                      <input className='' value={currentUser.username} disabled></input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Email</label>
                      <input className='' value={currentUser.email}></input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Gender</label>
                      <input className='' value={currentUser.gender} disabled></input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Date of Birth</label>
                      <input className='' value={currentUser.dob} disabled></input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Contact Number</label>
                      <input className='' value={currentUser.contact}></input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Address</label>
                      <input className='' value={currentUser.address}></input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Poscode</label>
                      <input className='' value={currentUser.poscode}></input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>State</label>
                      <input className='' value={currentUser.state}></input>
                    </div>
                  </div>
                </div>
                <div className="profile-btn">
                  <div className="profile-btn-div">
                    <button className="btn btn-primary profile-button">Update</button>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel tabId="vertical-tab-two">
              <p>Tab 2 content</p>
            </TabPanel>

            <TabPanel tabId="vertical-tab-three">
              <p>Tab 3 content</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}