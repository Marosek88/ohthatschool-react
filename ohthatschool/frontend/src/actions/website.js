import axios from 'axios';

import { GET_CONTENT } from "./types";

// GET CONTENT
export const getContent = () => dispatch => {
    axios.get('/api/website/')
        .then(res => {
            dispatch({
                type: GET_CONTENT,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};
