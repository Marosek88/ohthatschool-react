import React, { Component, Fragment } from 'react';

export class ProfilePictureComponent extends Component {

    render() {

        return (
            <Fragment>
                <div className="user-photo" style={{background: `url(${this.props.user.picture}) no-repeat center center`}}/>
            </Fragment>
        )
    }
}

export default ProfilePictureComponent;