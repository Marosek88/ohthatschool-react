import axios from 'axios';

import {GET_EDUCATOR_COURSES, GET_ADD_COURSE_FORM_DATA, CREATE_COURSE, EDU_DEFAULT_VIEW, EDU_CHANGE_VIEW} from "./types";
import {returnErrors, returnWarnings, returnInfo, returnSuccess} from "./messages"
import {tokenConfig} from "./auth";

// GET EDUCATOR COURSES
export const getCourses = () => (dispatch, getState) => {
    axios.get('/api/course/course-educator/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_EDUCATOR_COURSES,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET FORM DATA
export const getFormData = () => dispatch => {
    axios.get('/api/course/category/')
        .then(res => {
            dispatch({
                type: GET_ADD_COURSE_FORM_DATA,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

// CREATE COURSE
export const createCourse = form => (dispatch, getState) => {
    axios
        .post('/api/course/course-educator/', form, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CREATE_COURSE,
                payload: res.data
            });
            dispatch(returnSuccess("Course created successfully!", 201))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET DEFAULT VIEW
export const getDefaultView = () => dispatch => {
    dispatch({
        type: EDU_DEFAULT_VIEW,
    })
};

// CHANGE VIEW
export const changeView = (view) => dispatch => {
    dispatch({
        type: EDU_CHANGE_VIEW,
        payload: view,
    })
};