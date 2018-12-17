import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/userActions";

class Header extends React.Component {

  logout(){
    this.props.logout()
    window.location.href = "/";
  }

render(){
  const { validToken, user } = this.props.security;
     const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>
         <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-user-circle mr-1" />
              {user.fullName}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
     const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/signUp">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );
     let headerLinks;
     if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
            <a className="navbar-brand" href="Dashboard.html">
                Personal Project Management Tool
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon" />
            </button>


          {headerLinks}

        </div>
    </nav>
  );
}
}
const mapStateToProps = state =>({
              security : state.security
})
Header.propTypes = {
   security : PropTypes.object.isRequired
}
export default connect(
  mapStateToProps,{logout}
) (Header);
