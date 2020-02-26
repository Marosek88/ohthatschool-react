import axios from 'axios';

import {GET_COURSES, GET_SEARCH_BAR_INFO, CREATE_COURSE} from "./types";
import {returnErrors, returnWarnings, returnInfo, returnSuccess} from "./messages"

// GET COURSES
export const getCourses = () => dispatch => {
    axios.get('/api/course/course/')
        .then(res => {
            dispatch({
                type: GET_COURSES,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET SEARCH BAR
export const getSearchBarInfo = () => dispatch => {
    axios.get('/api/course/category/')
        .then(res => {
            dispatch({
                type: GET_SEARCH_BAR_INFO,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};
