import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {uploadPicture} from '../../../actions/profile';
import {returnWarnings, returnSuccess} from '../../../actions/messages';

import {ProfilePictureComponent} from "../../common/ProfilePictureComponent";

export class ProfilePicture extends Component {
    state = {
        image: null,
    };

    static propTypes = {
        uploadPicture: PropTypes.func.isRequired,
        returnSuccess: PropTypes.func.isRequired,
        returnWarnings: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
    };

    handleImageChange = (e) => {
        this.setState({
            picture: e.target.files[0]
        })
    };

    onSubmit = e => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('picture', this.state.picture, this.state.picture.name);
        this.props.uploadPicture(this.props.user.id, form_data);
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});


    render() {
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <ProfilePictureComponent user={this.props.user} />
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">

                        <div className="form-group">
                            <label>Upload Picture</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/png, image/jpeg"
                                onChange={this.handleImageChange}
                                className="form-control"
                                name="picture"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {uploadPicture, returnWarnings, returnSuccess})(ProfilePicture);