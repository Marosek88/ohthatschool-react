import React, {Component} from 'react';
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { logout } from "../../actions/auth";

export class Header extends Component {
    // static propTypes = {
    //   auth: PropTypes.object.isRequired,
    //   logout: PropTypes.func.isRequired
    // };

    render() {
        // const { isAuthenticated, user } = this.props.auth;

        // const authLinks = (
        //     <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        // <span className="navbar-text mr-3">
        //   <strong>{user ? `Welcome ${user.username}` : ""}</strong>
        // </span>
        //         <li className="nav-item">
        //             <button
        //                 onClick={this.props.logout}
        //                 className="nav-link btn btn-info btn-sm text-light"
        //             >
        //                 Logout
        //             </button>
        //         </li>
        //     </ul>
        // );
        //
        // const guestLinks = (
        //   <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        //     <li className="nav-item">
        //       <Link to="/register" className="nav-link">
        //         Register
        //       </Link>
        //     </li>
        //     <li className="nav-item">
        //       <Link to="/login" className="nav-link">
        //         Login
        //       </Link>
        //     </li>
        //   </ul>
        // );

        return (
            <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
                <div className="container-fluid wrapper">
                    <a className="navbar-brand" href="#">Oh that'school</a>
                    <button
                        className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold text-white rounded"
                        type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded{% if current_url == 'courses' %} active{% endif %}"
                                   href="#">Courses</a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded{% if current_url == 'educators' %} active{% endif %}"
                                   href="#">Educators</a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded{% if current_url == 'schools' %} active{% endif %}"
                                   href="#">Schools</a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded{% if current_url == 'students' %} active{% endif %}"
                                   href="#">Students</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">

                            {/*if not authenticated*/}

                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded{% if current_url == 'login' %} active{% endif %}"
                                   href="#">Sign in</a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded{% if current_url == 'register' %} active{% endif %}"
                                   href="#">Sing up</a>
                            </li>

                            {/*else*/}

                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded{% if current_url == 'profile' %} active{% endif %}"
                                   href="#">Profile</a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <a className="nav-link py-3 px-0 px-lg-3 rounded" href="#">Logout</a>
                            </li>

                            {/*endif*/}

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { logout }
// )(Header);