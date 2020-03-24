import axios from 'axios';
import {returnErrors, returnSuccess} from './messages';

import {
    PICTURE_UPLOADED,
} from './types';

import {tokenConfig} from "./auth";

// UPLOAD PICTURE
export const uploadPicture = (id, form) => (dispatch, getState) => {
    axios
        .post(`api/auth/user_profile/${id}/upload_picture/`, form, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: PICTURE_UPLOADED,
                payload: res.data
            });
            dispatch(returnSuccess(`Profile picture uploaded`, 201))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
