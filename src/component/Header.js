import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import acy_security_logo from "../img/acy_security_logo.svg";

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const toggle = () => {
    let burgerLinks = document.getElementById("burgerWrapper");
    if (burgerLinks.style.display === "block") {
      burgerLinks.style.display = "none";
    } else {
      burgerLinks.style.display = "block";
    }
  };

  return (
    !loading && (
      <header>
        <nav className="header-container">
          <div className="menu-logo">
            <div className="burger-menu">
              <a href="#!" className="burger" onClick={toggle}>
                <i className="fas fa-bars"></i>
              </a>
            </div>

            <a href="/">
              <img src={acy_security_logo} alt="ACY-logo" id="logo_mobile" />
            </a>
          </div>
          <div id="burgerWrapper">
            <ul id="burgerLinks">
              <li>
                <div className="menu-item">
                  <a href="#!">Why ACY</a>
                  <i className="fas fa-angle-down"></i>
                </div>
              </li>
              <li>
                <div className="menu-item">
                  <a href="#!">Products</a>
                  <i className="fas fa-angle-down"></i>
                </div>
              </li>
              <li>
                <div className="menu-item">
                  <a href="#!">Platforms</a>
                  <i className="fas fa-angle-down"></i>
                </div>
              </li>
              <li>
                <div className="menu-item">
                  <a href="#!">Education</a>
                  <i className="fas fa-angle-down"></i>
                </div>
              </li>
              <li>
                <div className="menu-item">
                  <a href="#!">Partners</a>
                  <i className="fas fa-angle-down"></i>
                </div>
              </li>
            </ul>
          </div>

          {isAuthenticated ? (
            <div className="auth-wrapper">
              <Link
                to="/registered"
                className="auth-link registered-course"
                target="blank"
              >
                Saved Course
              </Link>

              <a href="#!" onClick={logout} className="auth-link logout">
                Logout
              </a>
            </div>
          ) : (
            <Link to="/login" className="auth-link">
              Login
            </Link>
          )}
        </nav>
      </header>
    )
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
