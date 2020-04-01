import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ProfilePicture from "./ProfilePicture";
import FormComponent from "../../common/FormComponent";
import TileListComponent from "../../common/TileListComponent";
import BubbleMenuComponent, {button_types} from "../../common/BubbleMenuComponent";

import {changePage, changeView, changeSubView} from "../../../actions/website";
import {resetDetails, resetListItems, resetFormContext} from "../../../actions/common"
import {getFormContext, getList, createItem, updateProfile} from "../../../actions/profile";


export class SettingsDashboard extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        page: PropTypes.string.isRequired,
        view: PropTypes.string.isRequired,
        sub_view: PropTypes.string.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        changeSubView: PropTypes.func.isRequired,
        getFormContext: PropTypes.func.isRequired,
        getList: PropTypes.func.isRequired,
        createItem: PropTypes.func.isRequired,
        updateProfile: PropTypes.func.isRequired,
        resetListItems: PropTypes.func.isRequired,
        resetDetails: PropTypes.func.isRequired,
        resetFormContext: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.changePage("profile_settings");
        this.props.changeView("general_settings");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.resetFormContext();
    }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
        this.props.changeSubView("");
        this.props.resetDetails();
        this.props.resetListItems();
        this.props.resetFormContext();
    }


    render() {
        // General Settings form
        const form_context = {
            getFormContext: this.props.getFormContext,
            submitFunction: this.props.updateProfile,
            what: "User Profile",
            what_id: this.props.user.user_profile.id,
            field_list: [
                // {field_type: "invisible", label: "", name: "id", start_value: this.props.user.user_profile.id},
                {
                    field_type: "text",
                    label: "First name",
                    name: "first_name",
                    start_value: this.props.user.user_profile.first_name
                },
                {
                    field_type: "text",
                    label: "Last name",
                    name: "last_name",
                    start_value: this.props.user.user_profile.last_name
                },
                {
                    field_type: "number",
                    label: "Location latitude",
                    name: "location__lat",
                    start_value: this.props.user.user_profile.location.lat
                },
                {
                    field_type: "number",
                    label: "Location longitude",
                    name: "location__lon",
                    start_value: this.props.user.user_profile.location.lon
                },
            ],
            addContextToForm: null,
        };

        // Achievements Tile List
        const tile_list_data = {
            getList: this.props.getList,
            get_what: "Achievements",
            list_title: "Created Achievements",
            tile_list_prop_list: [
                {label: "Id", properties: ["id"]},
                {label: "Image", properties: ["image"]},
                {label: "Name", properties: ["name"]},
                {label: "Description", properties: ["description"]},
                {label: "Type", properties: ["type"]},
            ],
            prepareTileDataFunction: (tile_object) => (
                {
                    id: ["Id", tile_object["Id"]],
                    link: null,
                    image: tile_object["Image"],
                    title: tile_object["Name"],
                    subtitle: tile_object["Type"],
                    description: tile_object["Description"],
                    bottom: [],
                }
            )
        };

        const achievement_form_context = {
            getFormContext: this.props.getFormContext,
            submitFunction: this.props.createItem,
            what: "Achievement",
            what_id: null,
            field_list: [
                {
                    field_type: "image",
                    label: "Image",
                    name: "image",
                },
                {
                    field_type: "text",
                    label: "Achievement name",
                    name: "name",
                    start_value: ""
                },
                {
                    field_type: "textarea",
                    label: "Description",
                    name: "description",
                    start_value: ""
                },
                {
                    field_type: "select",
                    label: "Type",
                    name: "type",
                    options: null,
                    start_value: ""
                },
            ],
            addContextToForm: (context, field_list) => {
                    let category_options = [];
                    context.map(type => {
                        category_options.push({field_name: "type", value: type[0], label: type[1]})
                    });
                    field_list.map(field => {
                        if (field.label === "Type") {
                            field["options"] = category_options
                        }
                    });
                }
        };


        // Prepare BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: "/profile",
            },
            {
                name: "general_settings",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-cogs",
                view: "general_settings",
            },
            {
                name: "profile_picture",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-camera-retro",
                view: "profile_picture",
            },
            {
                name: "create_achievement",
                type: button_types.VIEW_BUTTON_PARENT,
                icon: "fas fa-trophy",
                view: "create_achievement",
                sub_view: "achievements_list",
                children: [
                    {
                        name: "achievements_list",
                        type: button_types.SUB_VIEW_BUTTON,
                        icon: "far fa-list-alt",
                        sub_view: "achievements_list"
                    },
                    {
                        name: "add_achievement",
                        type: button_types.SUB_VIEW_BUTTON,
                        icon: "fas fa-plus",
                        sub_view: "add_achievement"
                    },
                ]
            },
        ];

        return (
            <Fragment>
                <div className="container wrapper mt-2 mt-lg-4">

                    {this.props.view === "general_settings" ?
                        <FormComponent form_context={form_context}/>
                        : null}
                    {this.props.view === "profile_picture" ?
                        <ProfilePicture/>
                        : null}

                    {this.props.sub_view === "achievements_list" ?
                        <TileListComponent tile_list_data={tile_list_data}/>
                        : null}

                    {this.props.sub_view === "add_achievement" ?
                        <FormComponent form_context={achievement_form_context}/>
                        : null}

                    <BubbleMenuComponent button_list={button_list}/>

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    page: state.website.page,
    view: state.website.view,
    sub_view: state.website.sub_view,
});

export default connect(mapStateToProps, {
    changePage,
    changeView,
    changeSubView,
    getFormContext,
    getList,
    createItem,
    updateProfile,
    resetListItems,
    resetDetails,
    resetFormContext,
})(SettingsDashboard);