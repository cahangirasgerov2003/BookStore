import React, { useRef } from "react";
import "../../styles/header.css";
import { Link, NavLink } from "react-router-dom";
import BookStore from "../../assets/images/store__icon.png";

const Header = () => {
  const menuRef = useRef(null);
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

  return (
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
                <span>
                  <i className="ri-more-2-fill"></i>
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
              </div>
            </div>
            <div className="header__navigation__right w-50">
              <div className="searchElement d-flex justify-content-between">
                <input
                  type="text"
                  placeholder="Search ..."
                  className="w-100"
                ></input>
                <i className="ri-search-eye-line"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
