import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView} from "../../../actions/website";
import {createItem} from "../../../actions/educator";

import ComponentDetails from "../ComponentDetails";
import ComponentList from "../ComponentList";
import AddItemComponent from "../../common/AddItemComponent";
import BubbleMenuComponent, {button_types} from "../../common/BubbleMenuComponent";


export class CourseDashboard extends Component {

    static propTypes = {
        ids: PropTypes.object.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        getIds: PropTypes.func.isRequired,
        createItem: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getIds();
        this.props.changePage("educator_course");
        this.props.changeView("course_details");
    }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
    }

    render() {
        // Details component
        const prop_list = [
            {label: "ID", properties: ["id"]},
            {label: "Owner", properties: ["owner", "username"]},
            {label: "Title", properties: ["title"]},
            {label: "Category", properties: [""]},
            {label: "Description", properties: ["description"]},
            {label: "Duration", properties: ["duration"]},
            {label: "Price", properties: ["price"]},
            {label: "Created at", properties: ["created_at"]},
        ];

        // List component
        const link_to = `/profile/educator/my_courses/${this.props.ids.my_course}/module/`;

        // Add item component
        const field_list = [
            {field_type: "invisible", label: "", name: "course", start_value: this.props.ids.my_course},
            {field_type: "text", label: "Title", name: "title", start_value: ""},
            {field_type: "textarea", label: "Description", name: "description", start_value: ""},
            {field_type: "checkbox", label: "Active", name: "active", start_value: false},
        ];

        // Prepare BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: "/profile/educator",
            },
            {
                name: "course_details",
                type: button_types.VIEW_BUTTON,
                icon: "far fa-list-alt",
                view: "course_details",
            },
            {
                name: "add_module",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-plus",
                view: "add_module",
            },
        ];

        return (
            <Fragment>
                <div className="container wrapper">
                    {this.props.ids.my_course && this.props.view === "course_details" ?
                        <Fragment>
                            <ComponentDetails get_what="Course"
                                              get_id={this.props.ids.my_course}
                                              get_properties_list={prop_list}
                            />
                            <ComponentList get_what="Course Modules"
                                           get_id={this.props.ids.my_course}
                                           link_to={link_to}
                            />
                        </Fragment>
                        : null}

                    {this.props.ids.my_course && this.props.view === "add_module" ?
                        <AddItemComponent add_function={this.props.createItem}
                                          add_what="Module"
                                          field_list={field_list}
                        />
                        : null}
                    <BubbleMenuComponent button_list={button_list}/>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ids: state.website.ids,
    page: state.website.page,
    view: state.website.view,
});

export default connect(mapStateToProps, {getIds, changePage, changeView, createItem})(CourseDashboard);
