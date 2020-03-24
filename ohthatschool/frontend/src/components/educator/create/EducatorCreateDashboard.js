import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {createEducator} from "../../../actions/educator";
import {changePage} from "../../../actions/website";

export class EducatorCreateDashboard extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        changePage: PropTypes.func.isRequired,
        createEducator: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.changePage("educator_create");
    }

    componentWillUnmount() {
        this.props.changePage("");
    }

    createEducator = e => {
        let form = new FormData();
        form.append("id", this.props.user.id);
        form.append("first_name", this.props.user.first_name);
        form.append("last_name", this.props.user.last_name);
        form.append("email", this.props.user.email);
        form.append("location", this.props.user.location);
        form.append("has_picture", this.props.user.picture ? "true" : "false");
        form.append("active", "true");
        form.append("show_in_listings", "true");
        form.append("local_connect", "true");
        form.append("online_connect", "true");
        form.append("short_bio", "Inspired Educator ready to help you achieve your goals!");
        this.props.createEducator(form);
    };

    render() {
        if (this.props.educator.length > 0) {
            return <Redirect push to='/profile/educator'/>;
        }

        return (
            <Fragment>
                <div className="container wrapper mt-5" style={{textAlign: "center"}}>
                    <h1>Create an Educator Profile!</h1>
                    <p style={{fontSize: "5rem", cursor: "pointer"}}>
                        <i className="fas fa-chalkboard-teacher" onClick={this.createEducator}/>
                    </p>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    educator: state.educator.educator,
});

export default connect(mapStateToProps, {changePage, createEducator})(EducatorCreateDashboard);
