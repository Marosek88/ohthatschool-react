import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {getCourses} from "../../actions/course";

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
            // this.props.courses.map(course => (
            //     <tr key={course.id} id={`/courses/${course.id}/models`} onClick={openLink}
            //         className="vns-link">
            //         <td>{course.id}</td>
            //         <td>{course.category}</td>
            //         <td>{course.title}</td>
            //         <td>{course.description}</td>
            //         <td>{course.created_at}</td>
            //         <td>
            //             <Link to={`/courses/${course.id}/settings`}>
            //             <button className="btn btn-primary btn-sm">Settings</button>
            //             </Link>
            //             &nbsp;
            //             <button onClick={this.props.deleteProject.bind(this, course.id)}
            //                     className="btn btn-danger btn-sm">Delete
            //             </button>
            //         </td>
            //     </tr>
            // ))
            this.props.courses.map(course => (
                <div className="col-12 col-md-6 col-lg-4 mb-4">
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
            <div className="container wrapper-bg">
                <div className="row py-4">

                    {this.state.pageLoading ? loading : table}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.course.courses
});

export default connect(mapStateToProps, {getCourses})(CourseList);