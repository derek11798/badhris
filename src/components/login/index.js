import React, { useState } from "react";
import "./style.css";
import "../../fonts/icomoon/selection.json";
import bg_1 from "../../images/bg_2.svg";
import validator from "validator";
import axios from "axios";
import facebook from "../../images/facebook.png";
import google from "../../images/google.png";
import { BrowserRouter as Router, Route, Link, NavLink, Routes, useMatch } from 'react-router-dom'

const Login = () => {
  const [emailValidation, setEmailValidation] = useState(false);
  // const [passwordValidation, setPasswordValidation] = useState(false);
  // const [confirmpasswordValidation, setConfirmPasswordValidation] =
  //   useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();

  function handelChange() {
    setEmail(document.getElementById("username").value);
    setPassword(document.getElementById("password").value);
    // setConfirmPassword(document.getElementById("confirm-password").value);
    console.log("password & email", email,password);
  }

  function onSubmit() {
    // setConfirmPasswordValidation(
    //   validator.equals(password, confirmPassword) ? false : true
    // );
    setEmailValidation(validator.isEmail(email) ? false : true);
    // setPasswordValidation(validator.isStrongPassword(password) ? false : true);
    if (
      // validator.equals(password, confirmPassword) &&
      validator.isEmail(email)
      // validator.isStrongPassword(password)
    ) {
      loginApi(email, password);
      console.log("fetch API");
    }
  }

  function loginApi(email, password) {
    console.log(email, password);
    // const body= {
    //   emailid : email,
    //   password : password,
    //   cpassword : confirmPassword
    // }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailid: email,
        password: password
      }),
    };
    fetch("https://lifograf.com/lg_api/login", requestOptions)
      .then((respose) => {
        console.log(respose);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <h3>WELCOME BACK !</h3>
                  <p className="mb-4">
                    Dont Have An Account &nbsp;<Link to = '/'>Sign Up</Link>
                  </p>
                </div>
                <span className="d-block text-center my-8 text-muted">
                  &mdash;Login With &mdash;
                </span>
                <div className="social-login">
                  {/* <a href="#" className="facebook">
                      <span className="icon-facebook mr-3"></span>
                    </a> */}
                  <img src={google} alt="Image" className="img-google" />
                  {/* <a href="#" className="twitter">
                      <span className="icon-twitter mr-3"></span>
                    </a> */}
                  {/* <a href="#" className="google">
                      <span className="icon-google mr-3"></span>
                    </a> */}
                  <img src={facebook} alt="Image" className="img-facebook" />
                </div>
                <form /*action="#" method="post"*/>
                  <span classNameName="form-group last mb-4 text-muted d-block text-center my-8">
                    Email Id
                  </span>
                  <div className="form-group last mb-4">
                    <label for="username"></label>
                    <input
                      type="text"
                      onChange={() => handelChange()}
                      className="form-control"
                      id="username"
                      name="email"
                    />
                  </div>
                  <div className="validation-error">
                    {emailValidation && <span>Enter a proper email !!!</span>}
                  </div>
                  <span classNameName="form-group last">Password</span>
                  <div className="form-group last mb-4">
                    <label for="password"></label>
                    <input
                      type="password"
                      onChange={() => handelChange()}
                      className="form-control"
                      id="password"
                      name="password"
                    />
                  </div>
                  {/* <div className="validation-error">
                    {passwordValidation && (
                      <span>Enter a proper password !!!</span>
                    )}
                  </div> */}
                  {/* <span classNameName="form-group last">Confirm Password</span>
                  <div className="form-group last mb-4">
                    <label for="password"></label>
                    <input
                      type="password"
                      onChange={() => handelChange()}
                      className="form-control"
                      id="confirm-password"
                      name="confirm_password"
                    />
                  </div>
                  <div className="validation-error">
                    {confirmpasswordValidation && (
                      <span>password doesnot matched !!!</span>
                    )}
                  </div> */}
                  <div className="d-flex mb-5 align-items-center">
                    <label className="control control--checkbox mb-0">
                      <span className="caption">
                        I agree to the terms of service
                      </span>
                      <input type="checkbox" checked="checked" />
                      <div className="control__indicator"></div>
                    </label>
                    {/* <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>  */}
                  </div>
                </form>
                <button
                  /*type="submit"*/ value="Sign Up"
                  className="btn btn-block btn-primary"
                  onClick={() => onSubmit()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="header-container">
              <a className="col-md-1.5" href="#">
                Sign Up
              </a>
              <a className="col-md-1.5" href="#">
                Language
              </a>
              <a className="col-md-1.5" href="#">
                Contact Us
              </a>
              <a className="col-md-1.5" href="#">
                Help
              </a>
            </div>
            <img src={bg_1} alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
