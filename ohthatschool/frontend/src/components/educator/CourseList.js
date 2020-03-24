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
            this.props.courses.map(course => <Link key={course.id} to={`/profile/educator/my_courses/${course.id}`}><CourseTile course={course}/></Link>)
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