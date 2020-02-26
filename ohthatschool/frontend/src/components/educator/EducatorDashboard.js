import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getDefaultView} from "../../actions/educator";

import CourseList from "./CourseList";
import Achievements from "./Achievements";
import AddCourse from "./AddCourse";
import BubbleMenu from "./BubbleMenu";
import EducatorPage from "./EducatorPage";
import StudentList from "./StudentList";


export class EducatorDashboard extends Component {

    static propTypes = {
        view: PropTypes.string.isRequired,
        getDefaultView: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getDefaultView()
    }

    render() {

        return (
            <Fragment>
                <div className="container wrapper">
                    {this.props.view === "educator_page" ? <EducatorPage/> : null}
                    {this.props.view === "add_course" ? <AddCourse/> : null}
                    {this.props.view === "course_list" ? <CourseList/> : null}
                    {this.props.view === "student_list" ? <StudentList/> : null}
                    {this.props.view === "achievements" ? <Achievements/> : null}
                </div>
                <BubbleMenu/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    view: state.educator.view,
});

export default connect(mapStateToProps, {getDefaultView})(EducatorDashboard);
