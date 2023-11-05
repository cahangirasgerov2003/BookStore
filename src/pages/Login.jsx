import React from "react";
import "../styles/login.css";
import FormLogin from "../components/UI/FormLogin";
import Helmet from "../components/Helmet/helmet";
import BookStore from "../assets/images/store__icon.png";
const Login = () => {
  return (
    <>
      <Helmet title="Login">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 100 + "vh" }}
        >
          <div className="loginContainer">
            <div className="logo__part">
              <div>
                <img alt="Book Store" src={BookStore} />
              </div>
              <div>
                <p>Book Store</p>
              </div>
            </div>
            <div className="container">
              <FormLogin />
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default Login;
