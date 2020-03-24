import React, {Component, Fragment} from 'react';
import ProfilePictureComponent from "./ProfilePictureComponent";

export class ProfilePageComponent extends Component {

    render() {
        const user = this.props.user;
        const details_list = this.props.details_list;
        const short_bio = this.props.short_bio;

        const details_render = details_list.map(detail => (
            <Fragment key={detail[0]}>
                <strong>{detail[0]}:</strong> {detail[1]}<br/>
            </Fragment>
        ));

        return (
            <Fragment>
                <div className="row py-4">
                    <div className="col-12 card card-body">
                        <div className="row">
                            <div className="col-12 col-sm-4 mb-3">
                                <ProfilePictureComponent user={user}/>
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
                        <strong>{short_bio['title']}:</strong> {short_bio['content']}
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default ProfilePageComponent;
