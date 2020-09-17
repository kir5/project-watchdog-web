import React, { Component } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { NavLink } from "react-router-dom";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
      email: ""
    };
  }

  onEmailChange(e) {
    this.setState({
      loginError: false
    });
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (re.test(String(e.target.value).toLowerCase())) {
      this.setState({
        emailError: false,
        email: e.target.value
      });
    } else if (e.target.value === "") {
      this.setState({
        emailError: true
      });
    } else {
      this.setState({
        emailError: true
      });
    }
  }

  onSubmit = e => {
    console.log(this.state);
  };
  render() {
    let emailError;
    if (this.state.emailError) {
      emailError = <div className="text-danger"> Invalid Email address </div>;
    }
    return (
      <div>
        <Navbar />
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4 mt-5">
            <section className="form-elegant">
              <div className="card">
                <div className="card-header form-header text-center text-white blue-gradient">
                  <h3>
                    <i className="fa fa-key" />
                    Password Recovery
                  </h3>
                </div>
                <form action="/home" onSubmit={this.onSubmit.bind(this)}>
                  <div className="card-body mx-4">
                    <p className="grey-text">
                      Enter your email address to recover your password
                    </p>
                    <div className="md-form">
                      <i className="fa fa-envelope prefix grey-text" />
                      <input
                        type="text"
                        id="Form-email1"
                        className="form-control"
                        onChange={this.onEmailChange.bind(this)}
                        required
                      />
                      <label htmlFor="Form-email1"> Your email </label>
                    </div>
                    {emailError}
                    <div className="text-center mb-3">
                      <button
                        type="submit"
                        onSubmit={this.onSubmit.bind(this)}
                        className="btn blue-gradient btn-rounded z-depth-1a"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  </div>
                </form>
                <div className="modal-footer mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Not a member ?
                    <NavLink to="/signup" className="blue-text ml-1">
                      Sign Up
                    </NavLink>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ForgotPassword;
