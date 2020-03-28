import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {prepareDetails} from "../../support/helpers";
import ProfilePictureComponent from "./ProfilePictureComponent";
import LoadingComponent from "./LoadingComponent";

export class ProfilePageComponent extends Component {
    static propTypes = {
        profileLoading: PropTypes.bool.isRequired,
        myProfileData: PropTypes.object.isRequired,
        profileData: PropTypes.object.isRequired,
    };

    componentDidMount() {
        if (this.props.myProfileData.length === 0) {
            this.props.profile_page_data.getProfile(
                this.props.profile_page_data.get_what,
                this.props.profile_page_data.get_id
            );
        }
    }

    render() {

        // Get context from props
        let details_list = {};
        if (this.props.profile_page_data.my_profile) {
            details_list = prepareDetails(this.props.myProfileData, this.props.profile_page_data.details_prop_list)
        } else {
            details_list = prepareDetails(this.props.profileData, this.props.profile_page_data.details_prop_list)
        }
        const short_bio = prepareDetails(this.props.myProfileData, this.props.profile_page_data.short_bio_prop_list)[0];

        // Get context ready
        const ready_details_list = this.props.profile_page_data.prepareDetailDataFunction(details_list);

        const details_render = ready_details_list.map(detail => (
            <Fragment key={detail[0]}>
                <strong>{detail[0]}:</strong> {detail[1]}<br/>
            </Fragment>
        ));

        return (
            this.props.profileLoading ?
                <LoadingComponent/>

                :

                <Fragment>

                    <div className="row py-4">
                        <div className="col-12 card card-body">
                            <div className="row">
                                <div className="col-12 col-sm-4 mb-3">
                                    <ProfilePictureComponent user={this.props.profile_page_data.my_profile ?
                                        this.props.myProfileData
                                    : this.props.profileData}/>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <div className="profile-details">
                                        {details_render}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row py-4">
                        <div className="col-12 card card-body">
                            <strong>{short_bio[0]}:</strong> {short_bio[1]}
                        </div>
                    </div>

                </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    profileLoading: state.common.profileLoading,
    profileData: state.common.profileData,
    myProfileData: state.common.myProfileData,
});

export default connect(mapStateToProps)(ProfilePageComponent);
