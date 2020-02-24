import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCourses } from "../../actions/course";

import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import AddItem from "./AddItem";


export class Dashboard extends Component {

    render() {

        return (
            <Fragment>
                <AddItem />
                <SearchBar />
                <CourseList />
            </Fragment>
        )
    }
}

export default Dashboard;