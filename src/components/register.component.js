import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "../css/bootstrap.min.css";
import "../css/style.css";
import "../css/index.css";

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
        Username must be between 3 and 20 characters.
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
  if (value.length < 5 || value.length > 11) {
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
      gender: "",
      dob: "",
      contact: "",
      address: "",
      poscode: "",
      state: "",

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
        this.state.contact,
        this.state.address,
        this.state.poscode,
        this.state.state
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
          // this.props.history.push('/login')
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
      <div className='row align-items-center justify-content-center gray-light-bg mr-0'>
        <div className="col-12 col-md-7 col-lg-6 col-xl-6 d-none d-lg-block h-auto">
          <div className="bg-cover vh-100 ml-n3 gradient-overlay">
            <div className="position-absolute login-signup-content">
              <div className="position-relative text-white col-md-12 col-lg-7">
                <h2 className="text-white">Create Your Account</h2>
                <p className="lead">
                  Keep your face always toward the sunshine - and shadows will fall behind you.
                  Continually pursue fully researched niches whereas timely platforms.
                  Credibly parallel task optimal catalysts for change after focused catalysts for change.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-11 col-lg-6 col-xl-6 px-lg-6 mt-3 mb-3">
          <div className="login-signup-wrap px-4 px-lg-2">
            {/* <!-- Heading --> */}
            <h1 className="text-center mb-1">Signup</h1>

            {/* <!-- Subheading --> */}
            <p className="text-muted text-center mb-5">Free access to our dashboard.</p>

            {/* <!-- Form --> */}
            <Form onSubmit={this.handleRegister}
              ref={c => { this.form = c; }}
            >
              {!this.state.successful && (
                <div className=''>
                  <div className='signup-form-row'>
                    <div className="form-group signup-form-group">
                      <label className="pb-1" htmlFor="username">Username</label>
                      <Input
                        type="text"
                        size="25"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group signup-form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        size="25"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </div>
                  </div>

                  <div className='signup-form-row'>
                    <div className="form-group signup-form-group">
                      <label className='' htmlFor="email">Email</label>
                      <Input
                        type="text"
                        size="25"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                    </div>

                    <div className="form-group signup-form-group">
                      <label htmlFor="contact">Contact Number</label>
                      <Input
                        type="text"
                        size="25"
                        className="form-control"
                        name="contact"
                        value={this.state.contact}
                        onChange={this.onChangeContact}
                        validations={[required, contact]}
                      />
                    </div>
                  </div>

                  <div className='signup-form-row'>
                    <div className="form-group signup-form-group">
                      <label className='signup-form-label' htmlFor="gender">Gender</label>
                      <div className='signup-form-radio'>
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

                    <div className="form-group signup-form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <Input
                        type="date"
                        size="25"
                        className="form-control"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.onChangeDOB}
                        validations={[required, dob]}
                        min="1900-01-01"  max="2021-07-01"
                      />
                    </div>
                  </div>

                  <div className='signup-form-row'>
                    <div className="form-group signup-form-group-address">
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

                  <div className='signup-form-row'>
                    <div className="form-group signup-form-group">
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

                    <div className="form-group signup-form-group">
                      <label htmlFor="state">State</label>
                      <select
                        list="state"
                        className="form-control"
                        name="state"
                        value={this.state.state}
                        onChange={this.onChangeState}
                        validations={[required]} >
                        <option value="Johor">Johor</option>
                        <option value="Kedah">Kedah</option>
                        <option value="Kelantan">Kelantan</option>
                        <option value="Melaka">Melaka</option>
                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                        <option value="Pahang">Pahang</option>
                        <option value="Penang">Penang</option>
                        <option value="Perak">Perak</option>
                        <option value="Perlis">Perlis</option>
                        <option value="Sabah">Sabah</option>
                        <option value="Sarawak">Sarawak</option>
                        <option value="Selangor">Selangor</option>
                        <option value="Terengganu">Terengganu</option>
                      </select>
                    </div>
                  </div>

                  {/* <!-- Submit --> */}
                  <div className="form-group signupbtn">
                    <button className="btn btn-block solid-btn border-radius mt-4 mb-3">SIGN UP</button>
                  </div>

                  {/* <!-- Link --> */}
                  <div className="text-center">
                    <small className="text-muted text-center">
                      Already have an account? <a href="/login">Log in</a>.
                    </small>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                    role="alert" >
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
      </div>
    );
  }
}