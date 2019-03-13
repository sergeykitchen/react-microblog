import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Header(props) {
  return (
    <header className="navbar border-bottom">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-brand" to="/">Blog</Link>
        </div>
        {props.user
          ?
          <div className="nav ml-auto navbar-right">
            <div className="mr-3 d-flex align-items-center">
              Hello, {props.user.userName}.
            </div>
            <button
              className="nav-link btn btn-secondary"
              onClick={props.signOut}
            >
              Sign out
              </button>
          </div>
          :
          <div className="nav ml-auto navbar-right">
            <Link className="nav-link btn btn-outline-primary mr-3" to="/sign-in">Sign in</Link>
            <Link className="nav-link btn btn-secondary" to="/sign-up">Sign up</Link>
          </div>
        }
      </div>
    </header>
  )
}

export default Header;

Header.propTypes = {
  signOut: PropTypes.func,
  user: PropTypes.object,
}