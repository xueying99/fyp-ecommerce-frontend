import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "../css/component.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <div className="profile-header">
          <h4><strong>Profile Page</strong></h4>
        </div>
        <div className="profile-view">
          <div className="profile-table">
        <table>
          <tbody>
            <tr>
              <th></th>
              <td><img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card" /></td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{currentUser.username}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{currentUser.email}</td>
            </tr>
              <tr>
                <th>Gender</th>
                <td>{currentUser.gender}</td>
              </tr>
              <tr>
                <th>Contact Number</th>
                <td>{currentUser.contact}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{currentUser.dob}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{currentUser.address}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{currentUser.state}</td>
              </tr>
              <tr>
                <th>Poscode</th>
                <td>{currentUser.poscode}</td>
              </tr>
              </tbody>
            </table>
          </div>
            <div className="profile-btn">
              <div className="profile-btn-div">
                <div className="profile-button">Edit</div>
                <div className="profile-button">Update</div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}