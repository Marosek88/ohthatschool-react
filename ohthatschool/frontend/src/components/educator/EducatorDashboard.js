import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getDefaultView} from "../../actions/educator";

import CourseList from "./CourseList";
import AddCourse from "./AddCourse";
import BubbleMenu from "./BubbleMenu";


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
                {this.props.view === "add_course" ? <AddCourse/> : null}
                {this.props.view === "course_list" ? <CourseList/> : null}
                <BubbleMenu/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    view: state.educator.view,
});

export default connect(mapStateToProps, {getDefaultView})(EducatorDashboard);
