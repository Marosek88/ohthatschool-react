import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView} from "../../../../../actions/website";

import ComponentDetails from "../../../ComponentDetails";
import BubbleMenuComponent, {button_types} from "../../../../common/BubbleMenuComponent";

export class LessonDashboard extends Component {

    static propTypes = {
        ids: PropTypes.object.isRequired,
        view: PropTypes.string.isRequired,
        getIds: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getIds();
        this.props.changePage("educator_lesson");
        this.props.changeView("lesson_details");
    }

    render() {
        // Details Component
        const prop_list = [
            {label: "ID", properties: ["id"]},
            {label: "Module", properties: ["module", "title"]},
            {label: "Title", properties: ["title"]},
            {label: "Description", properties: ["description"]},
            {label: "Duration", properties: ["duration"]},
            {label: "Created at", properties: ["created_at"]},
        ];

        // Prepare BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: `/profile/educator/my_courses/${this.props.ids.my_course}/module/${this.props.ids.module}`,
            },
            {
                name: "lesson_details",
                type: button_types.VIEW_BUTTON,
                icon: "far fa-list-alt",
                view: "lesson_details",
            },
        ];

        return (
            <Fragment>
                <div className="container wrapper">
                    {this.props.ids.lesson && this.props.view === "lesson_details" ?
                        <Fragment>
                            <ComponentDetails get_what="Lesson"
                                              get_id={this.props.ids.lesson}
                                              get_properties_list={prop_list}
                            />
                        </Fragment>
                        : null}

                </div>
                <BubbleMenuComponent button_list={button_list}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ids: state.website.ids,
    view: state.website.view,
});

export default connect(mapStateToProps, {getIds, changePage, changeView})(LessonDashboard);
