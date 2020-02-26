import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {getCourses} from "../../actions/educator";

import CourseTile from "./CourseTile";


export class CourseList extends Component {

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

        const loading = (
            <tr>
                <td colSpan="6" className="vns-loading-td">
                    <i className="fas fa-spinner vns-loading-icon"/><br/>
                    <strong>Loading...</strong>
                </td>
            </tr>
        );

        const table = (
            this.props.courses.map(course => (
                <div key={course.id} className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="course-tile">
                        <div className="course-img"/>
                        <h5 className="course-name">{course.title}</h5>
                        <p className="course-author">{course.owner}</p>
                        <p className="course-description">{course.description}</p>
                        <div className="container course-numbers">
                            <div className="row no-gutters course-numbers-headers">
                                <div className="col-4">Learners:</div>
                                <div className="col-4">Rating:</div>
                                <div className="col-4">Price:</div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-4">plahol</div>
                                <div className="col-4">plahol / 5.0</div>
                                <div className="col-4">${course.price}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        );

        return (
                <div className="row py-4">

                    {this.state.pageLoading ? loading : table}

                </div>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.educator.courses
});

export default connect(mapStateToProps, {getCourses})(CourseList);