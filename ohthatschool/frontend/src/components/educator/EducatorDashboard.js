import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView, changeSubView} from "../../actions/website";
import {getFormData, getEducator, createItem} from "../../actions/educator";
import {button_types} from "../common/BubbleMenuComponent";

import CourseList from "./CourseList";
import Achievements from "./Achievements";
import BubbleMenuComponent from "../common/BubbleMenuComponent";
import ProfilePageComponent from "../common/ProfilePageComponent";
import StudentList from "./StudentList";
import AddItemComponent from "../common/AddItemComponent";


export class EducatorDashboard extends Component {

    static propTypes = {
        educator: PropTypes.array.isRequired,
        ids: PropTypes.object.isRequired,
        view: PropTypes.string.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        changeSubView: PropTypes.func.isRequired,
        getIds: PropTypes.func.isRequired,
        getFormData: PropTypes.func.isRequired,
        getEducator: PropTypes.func.isRequired,
        createItem: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEducator();
        this.props.changePage("educator_profile");
        if (this.props.page === "educator_course") {
            this.props.changeView("courses");
            this.props.changeSubView("course_list");
        } else {
            this.props.changeView("educator_page");
            this.props.changeSubView("");
        }
        this.props.getIds();
        this.props.getFormData();
    }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
        this.props.changeSubView("");
    }

    render() {
        const educator = this.props.educator[0];

        if (this.props.educator.length === 0) {
            return <Redirect push to='/profile/educator/create'/>;
        }

        // Prepare Add Course data
        let categoryOptions = [];
        this.props.formInfo.map(category => {
            categoryOptions.push({field_name: "category", value: category.id, label: category.name})
        });
        const field_list = [
            {field_type: "text", label: "Title", name: "title", start_value: ""},
            {field_type: "textarea", label: "Description", name: "description", start_value: ""},
            {field_type: "select", label: "Category", name: "category", options: categoryOptions, start_value: ""},
            {field_type: "text", label: "Duration", name: "duration", start_value: "0"},
            {field_type: "text", label: "Price", name: "price", start_value: "0"},
        ];

        // Prepare Profile Page data
        const details_list = [
            ["Name", `${educator.first_name} ${educator.last_name}`],
            ["Email", educator.email],
            ["Active", educator.active ? "Yes" : "No"],
            ["Teaches locally", educator.local_connect ? "Yes" : "No"],
            ["Teaches remotely", educator.online_connect ? "Yes" : "No"],
        ];
        const short_bio = {
            title: "Short bio",
            content: educator.short_bio,
        };

        // Prepare BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: "/profile",
            },
            {
                name: "educator_page",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-id-card",
                view: "educator_page",
            },
            {
                name: "courses",
                type: button_types.VIEW_BUTTON_PARENT,
                icon: "fas fa-book-reader",
                view: "courses",
                sub_view: "course_list",
                children: [
                    {
                        name: "course_list",
                        type: button_types.SUB_VIEW_BUTTON,
                        icon: "far fa-list-alt",
                        sub_view: "course_list"
                    },
                    {
                        name: "add_course",
                        type: button_types.SUB_VIEW_BUTTON,
                        icon: "fas fa-plus",
                        sub_view: "add_course"
                    },
                ]
            },
            {
                name: "student_list",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-user-graduate",
                view: "student_list",
            },
            {
                name: "achievements",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-trophy",
                view: "achievements",
            },
        ];

        return (
            <Fragment>
                <div className="container wrapper mt-2">
                    {this.props.view === "educator_page" ?
                        <ProfilePageComponent user={this.props.user} details_list={details_list} short_bio={short_bio}/>
                        : null}
                    {this.props.sub_view === "add_course" ?
                        <AddItemComponent add_function={this.props.createItem} add_what="Course" field_list={field_list}/>
                        : null}
                    {this.props.sub_view === "course_list" ? <CourseList/> : null}
                    {this.props.view === "student_list" ? <StudentList/> : null}
                    {this.props.view === "achievements" ? <Achievements/> : null}
                </div>

                <BubbleMenuComponent button_list={button_list}/>

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    educator: state.educator.educator,
    view: state.website.view,
    sub_view: state.website.sub_view,
    page: state.website.page,
    ids: state.website.ids,
    formInfo: state.educator.formInfo,
});

export default connect(mapStateToProps, {
    changePage,
    changeView,
    changeSubView,
    getIds,
    getFormData,
    getEducator,
    createItem
})(EducatorDashboard);
