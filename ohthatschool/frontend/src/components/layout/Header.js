import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-close navbar-nav mt-2 mt-lg-0 ml-auto">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.props.logout}>Logout</a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-close navbar-nav mt-2 mt-lg-0 ml-auto">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-close navbar-brand" href="#">Oh that'school</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <div className="btn-group my-2 my-lg-0 mr-sm-2 ml-lg-5">
                        <button type="button" className="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-th"/> Categories
                        </button>
                        <div className="dropdown-menu">
                            <a className="navbar-close dropdown-item" href="#">Action</a>
                            <a className="navbar-close dropdown-item" href="#">Another action</a>
                            <a className="navbar-close dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"/>
                            <a className="navbar-close dropdown-item" href="#">Separated link</a>
                        </div>
                    </div>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                        <button className="navbar-close btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>

                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logout}
)(Header);