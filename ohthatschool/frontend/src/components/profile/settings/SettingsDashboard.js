import React, { Component, Fragment } from 'react';

import ProfilePicture from "./ProfilePicture";
import BubbleMenuComponent, {button_types} from "../../common/BubbleMenuComponent";


export class SettingsDashboard extends Component {

    render() {
        // Prepare BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: "/profile",
            },
        ];

        return (
            <Fragment>
                <ProfilePicture/>
                <BubbleMenuComponent button_list={button_list}/>
            </Fragment>
        )
    }
}

export default SettingsDashboard;