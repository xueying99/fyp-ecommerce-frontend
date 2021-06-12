import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "../css/component.css";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const contact = value => {
  if (value.length < 10 || value.length > 11) {
    return (
      <div className="alert alert-danger" role="alert">
        Please provide a valid contact number.
      </div>
    );
  }
};

const dob = value => {
  if (value == null) {
    return (
      <div className="alert alert-danger" role="alert">
        Date of Birth is required.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangePoscode = this.onChangePoscode.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      contact: "",
      gender: "",
      dob: "",
      address: "",
      state: "",
      poscode: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeDOB(e) {
    this.setState({
      dob: e.target.value
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

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.gender,
        this.state.dob,
        this.state.address,
        this.state.state,
        this.state.poscode,
        this.state.contact
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <h4>Create An Account</h4>
        <div className="card card-container registerform">
          
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }} >
            {!this.state.successful && (
              <div>
                <div className='row'>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>   

                  <div className="form-group">
                    <label htmlFor="contact">Contact Number</label>
                    <Input
                      type="tel"
                      className="form-control"
                      name="contact"
                      value={this.state.contact}
                      onChange={this.onChangeContact}
                      validations={[required, contact]}
                    />
                  </div>        
                </div>

                <div className='row'>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <div className='row'>
                      <Input
                        type="radio"
                        className="form-control"
                        id="male"
                        name="gender"
                        value="male"
                        onChange={this.onChangeGender}
                        validations={[required]}
                      />
                      <label for="male" className="radiobtn">Male</label>
                      <Input
                        type="radio"
                        className="form-control"
                        id="female"
                        name="gender"
                        value="female"
                        onChange={this.onChangeGender}
                        validations={[required]}
                      />
                      <label for="female" className="radiobtn">Female</label>
                    </div>
                  </div>   

                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <Input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.onChangeDOB}
                      validations={[required, dob]}
                    />
                  </div>        
                </div>

                <div className='row'>
                  <div className="form-group addressCol">
                    <label htmlFor="address">Address</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                      validations={[required]}
                    />
                  </div>          
                </div>

                <div className='row'>
                  <div className="form-group">
                    <label htmlFor="poscode">Poscode</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="poscode"
                      value={this.state.poscode}
                      onChange={this.onChangePoscode}
                      validations={[required]}
                    />
                  </div>  

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select
                      list="state"
                      className="form-control"
                      name="state"
                      value={this.state.state}
                      onChange={this.onChangeState}
                      validations={[required]} >
                      <option value="johor">Johor</option>
                      <option value="kedah">Kedah</option>
                      <option value="kelantan">Kelantan</option>
                      <option value="melaka">Melaka</option>
                      <option value="negerisembilan">Negeri Sembilan</option>
                      <option value="pahang">Pahang</option>
                      <option value="penang">Penang</option>
                      <option value="perak">Perak</option>
                      <option value="perlis">Perlis</option>
                      <option value="sabah">Sabah</option>
                      <option value="sarawak">Sarawak</option>
                      <option value="selangor">Selangor</option>
                      <option value="terengganu">Terengganu</option>                      
                    </select>
                  </div>        
                </div>

                <div className="form-group signupbtn">
                  <button className="btn btn-primary btn-block">SIGN UP</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }} />
          </Form>
        </div>
      </div>
    );
  }
}