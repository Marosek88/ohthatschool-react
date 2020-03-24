import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView} from "../../../../actions/website";
import {createItem} from "../../../../actions/educator";

import ComponentDetails from "../../ComponentDetails";
import ComponentList from "../../ComponentList";
import BubbleMenuComponent, {button_types} from "../../../common/BubbleMenuComponent";
import AddItemComponent from "../../../common/AddItemComponent";

export class ModuleDashboard extends Component {

    static propTypes = {
        ids: PropTypes.object.isRequired,
        view: PropTypes.string.isRequired,
        getIds: PropTypes.func.isRequired,
        createItem: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getIds();
        this.props.changePage("educator_module");
        this.props.changeView("module_details");
    }

    render() {
        // Details Component
        const prop_list = [
            {label: "ID", properties: ["id"]},
            {label: "Course", properties: ["course", "title"]},
            {label: "Title", properties: ["title"]},
            {label: "Description", properties: ["description"]},
            {label: "Duration", properties: ["duration"]},
            {label: "Created at", properties: ["created_at"]},
        ];

        // List Component
        const link_to = `/profile/educator/my_courses/${this.props.ids.my_course}/module/${this.props.ids.module}/lesson/`;

        // Add item component
        const field_list = [
            {field_type: "invisible", label: "", name: "module", start_value: this.props.ids.module},
            {field_type: "text", label: "Title", name: "title", start_value: ""},
            {field_type: "textarea", label: "Description", name: "description", start_value: ""},
            {field_type: "text", label: "Duration", name: "duration", start_value: "0"},
            {field_type: "checkbox", label: "Active", name: "active", start_value: false},
        ];

        // Prepare BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: `/profile/educator/my_courses/${this.props.ids.my_course}`,
            },
            {
                name: "module_details",
                type: button_types.VIEW_BUTTON,
                icon: "far fa-list-alt",
                view: "module_details",
            },
            {
                name: "add_lesson",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-plus",
                view: "add_lesson",
            },
        ];

        return (
            <Fragment>
                <div className="container wrapper">
                    {this.props.ids.module && this.props.view === "module_details" ?
                        <Fragment>
                            <ComponentDetails get_what="Module"
                                              get_id={this.props.ids.module}
                                              get_properties_list={prop_list}
                            />
                            <ComponentList get_what="Module Lessons"
                                           get_id={this.props.ids.module}
                                           link_to={link_to}
                            />
                        </Fragment>
                        : null}

                    {this.props.ids.module && this.props.view === "add_lesson" ?
                        <AddItemComponent add_function={this.props.createItem}
                                          add_what="Lesson"
                                          field_list={field_list}
                        />
                        : null}
                </div>
                <BubbleMenuComponent button_list={button_list} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ids: state.website.ids,
    view: state.website.view,
});

export default connect(mapStateToProps, {getIds, changePage, changeView, createItem})(ModuleDashboard);
