import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import background from "../img/hero-bg-1.jpg";
import "../css/style.css";
import "../css/bootstrap.min.css";
import "../css/index.css";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="row align-items-center justify-content-center gray-light-bg mr-0">
        <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
          {/* <!-- Image --> */}
          <div className="bg-cover vh-100 ml-n3 gradient-overlay"
               style={{ backgroundImage: `url(${background})` }}>
            <div className="position-absolute login-signup-content">
              <div className="position-relative text-white col-md-12 col-lg-7">
                <h2 className="text-white">Welcome Back !</h2>
                <p className="lead text-white">
                  Keep your face always toward the sunshine - and shadows will fall behind you. 
                  Continually pursue fully researched niches whereas timely platforms. 
                  Credibly parallel task optimal catalysts for change after focused catalysts for change.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="card card-containers"> */}
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}
        <div className="col-12 col-md-6 col-lg-6 col-xl-4">
          <div className="login-signup-wrap px-4 px-lg-5">
            {/* <!-- Heading --> */}
            <h1 className="text-center mb-1">Sign In</h1>
            <p className="text-center mb-5">Free access to our dashboard.</p>
            <Form onSubmit={this.handleLogin}
                  ref={c => { this.form = c; }} 
            >

            <div className="form-group">
              <label htmlFor="username" className="pb-1">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]} />
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label htmlFor="password" className="pb-1">Password</label>
                </div>
                <div className="col-auto">
                  <a href="#password-reset" className="form-text small text-muted">Forgot password?</a>
                </div>
              </div>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]} />
            </div>

            <div className="form-group loginform">
              <button
                className="btn btn-block solid-btn border-radius mt-4 mb-3"
                disabled={this.state.loading} >
                { this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>SIGN IN</span>
              </button>
            </div>

            {/* <!-- Link --> */}
            <p className="text-center">
              <small className="text-muted text-center">
                Don't have an account yet? <a href="/register">Sign up</a>.
              </small>
            </p>

            { this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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