import React, { Component, Fragment } from 'react';

import SearchBar from "./SearchBar";
import CourseList from "./CourseList";


export class Dashboard extends Component {

    render() {

        return (
            <Fragment>
                <SearchBar />
                <CourseList />
            </Fragment>
        )
    }
}

export default Dashboard;