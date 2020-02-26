import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {getCourses} from "../../actions/educator";


export class StudentList extends Component {

    state = {
        pageLoading: false,
        link: "",
    };

    static propTypes = {
        courses: PropTypes.array.isRequired,
        getCourses: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getCourses()
    }

    render() {
        const openLink = e => {
            this.setState({
                link: e.target.parentElement.id,
            })
        };

        if (this.state.link) {
            return <Redirect push to={this.state.link}/>;
        }

        return (
            <Fragment>
                <div className="row no-gutters">
                    <div className="col-3 col-sm-4 col-md-3">
                        <div className="user-photo"
                             style={{background: "url('../../../static/img/bg-achievements.jpg') no-repeat center center"}}/>
                    </div>
                    <div className="col-9 col-sm-8 col-md-9">
                        <div className="dashboard-section">
                            <b>My Achievements</b><br/>
                            ...
                        </div>
                    </div>
                </div>

                <hr/>


                <div className="row no-gutters">
                    <div className="col-3 col-sm-4 col-md-3">
                        <div className="user-photo"
                             style={{background: "url('../../../static/img/bg-recommendations.jpg') no-repeat center center"}}/>
                    </div>
                    <div className="col-9 col-sm-8 col-md-9">
                        <div className="dashboard-section">
                            <b>My Recommendations:</b><br/>
                            ...
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.educator.courses
});

export default connect(mapStateToProps, {getCourses})(StudentList);