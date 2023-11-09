import React, { useRef, useState } from "react";
import "../../styles/header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import BookStore from "../../assets/images/store__icon.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { LOGOUT } from "../../actions/loginActions";
import ModalForm from "../UI/ModalForm";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Header = (props) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const headerNavLinks = [
    {
      path: "/dashboard",
      content: "Personal Files",
    },
    {
      path: "/about",
      content: "About Us",
    },
  ];

  function toggleMenu() {
    menuRef.current.classList.toggle("menu__visible");
  }

  function logOutEvent() {
    localStorage.removeItem("entry__data");
    props.dispatch(LOGOUT());
    logOutRequest();
  }

  function searchResult() {
    navigate("/dashboard?q=" + inputValue);
    document.querySelector("#searchInput").value = "";
  }

  function logOutRequest() {
    const token = JSON.parse(localStorage.getItem("base64"));
    const authorizationKey = `Basic ${token["base64"]}`;
    console.log(authorizationKey);
    fetch(
      "https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/authentication/versions/1/tickets/-me-",
      {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          Authorization: authorizationKey,
        },
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
        localStorage.removeItem("base64");
        navigate("/");
      })
      .catch((error) => {
        localStorage.removeItem("base64");
        console.error("Hata:", error);
      });
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const result = props.logined ? (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="d-flex align-items-center header__logo">
                <Link to="/dashboard">
                  <img alt="Book Store" src={BookStore} />
                </Link>

                <Link to="/dashboard">
                  <p className="m-0">Book Store</p>
                </Link>
              </div>
            </div>

            <div className="col-6 moreOptions">
              <div>
                <span className="btn-group dropdown">
                  <button
                    type="button"
                    className="btn dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ri-more-2-fill"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li className="d-flex align-items-center dropdownItem">
                      <Link
                        to="#"
                        className="d-flex align-items-center linkSignOut"
                        onClick={logOutEvent}
                      >
                        <i className="ri-logout-box-r-line signOutIcon"></i>
                        <p className="mb-0">Sign Out</p>
                      </Link>
                    </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header__navbar">
        <div className="container">
          <div className="header__navigation d-flex align-items-center justify-content-between">
            <div className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </div>
            <div
              className="header__navigation__left"
              onClick={toggleMenu}
              ref={menuRef}
            >
              <div className="toggle__menu">
                <div className="closeMenu">
                  <i className="ri-close-circle-line"></i>
                </div>
                {headerNavLinks.map((link, index) => {
                  return (
                    <NavLink to={link.path} key={index}>
                      {link.content}
                    </NavLink>
                  );
                })}

                <div>
                  <span className="btn-group dropdown">
                    <button
                      type="button"
                      className="btn btn-danger dropdown-toggle"
                      style={{ width: 200 + "px" }}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      New
                    </button>
                    <ul className="dropdown-menu w-100 createAndUpload">
                      <li className="d-flex align-items-center dropdownItem">
                        <Button
                          className="d-flex align-items-center linkSignOut py-0"
                          onClick={handleOpen}
                        >
                          <i className="ri-folder-add-line"></i>
                          <p className="mb-0" onClick={setOpen}>
                            Create Folder
                          </p>
                        </Button>
                        <ModalForm open={open} setOpen={setOpen} />
                      </li>
                      <li className="d-flex align-items-center dropdownItem">
                        <Button
                          component="label"
                          className="d-flex align-items-center linkSignOut py-0"
                        >
                          <i className="ri-upload-2-line"></i>
                          <p className="mb-0">Upload File</p>
                          <VisuallyHiddenInput type="file" />
                        </Button>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>

            <div className="header__navigation__right w-25">
              <div className="searchElement d-flex justify-content-between">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search ..."
                  className="w-100"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                ></input>
                <i className="ri-search-eye-line" onClick={searchResult}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </header>
  ) : (
    ""
  );

  return result;
};

const mapStateToProps = (state) => {
  return {
    logined: state.login.logined,
  };
};

export default connect(mapStateToProps)(Header);
