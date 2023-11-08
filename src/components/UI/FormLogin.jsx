import React, { useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { LOGIN } from "../../actions/loginActions";

const FormLogin = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [openEyeName, setEyeName] = useState(false);
  const [openEyePassword, setEyePassword] = useState(false);

  const toastError = () => {
    toast.error("You are required to fill in all fields !", {
      autoClose: 2000,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  const toastWarning = () => {
    toast.error("User not found !", {
      autoClose: 2000,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  const toastSuccess = () => {
    toast.success("Congratulations, you have successfully sign in", {
      autoClose: 2000,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  function fetchRequest(data) {
    fetch(
      "https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/authentication/versions/1/tickets",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }

  const checkForm = () => {
    if (name.length && password.length) {
      if (name === "react" && password === "123456") {
        let data = {
          userId: name,
          password: password,
        };

        localStorage.setItem("entry__data", JSON.stringify(data));

        props.dispatch(LOGIN());

        fetchRequest(data);

        toastSuccess();
      } else {
        toastWarning();
      }
    } else {
      toastError();
    }
    setPassword("");
    setName("");
  };
  return (
    <form className="row form__login__content">
      <div className="col-12 mt-2 mb-4">
        <label htmlFor="name" className="form-label mb-2">
          Username : {openEyeName ? name : ""}
        </label>
        <div className="d-flex align-items-center">
          <input
            type="password"
            className="form-control"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          ></input>
          {openEyeName ? (
            <i
              className="ri-eye-line  ms-2"
              style={{ fontSize: 20 + "px", color: "green" }}
              onClick={() => {
                setEyeName(false);
              }}
            ></i>
          ) : (
            <i
              className="ri-eye-off-line ms-2"
              style={{ fontSize: 20 + "px", color: "red" }}
              onClick={() => {
                setEyeName(true);
              }}
            ></i>
          )}
        </div>
      </div>

      <div className="col-12 mt-2">
        <label htmlFor="password" className="form-label mb-2">
          Password : {openEyePassword ? password : ""}
        </label>
        <div className="d-flex align-items-center">
          <input
            value={password}
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          {openEyePassword ? (
            <i
              className="ri-eye-line  ms-2"
              style={{ fontSize: 20 + "px", color: "green" }}
              onClick={() => {
                setEyePassword(false);
              }}
            ></i>
          ) : (
            <i
              className="ri-eye-off-line ms-2"
              style={{ fontSize: 20 + "px", color: "red" }}
              onClick={() => {
                setEyePassword(true);
              }}
            ></i>
          )}
        </div>
      </div>

      <div className="col-12 mt-2">
        <button
          type="button"
          onClick={checkForm}
          className="btn btn-success w-100 mt-4"
        >
          SIGN IN
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    logined: state.logined,
  };
};

export default connect(mapStateToProps)(FormLogin);
