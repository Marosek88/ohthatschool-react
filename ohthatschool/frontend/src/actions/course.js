import axios from 'axios';

import {GET_COURSES, GET_COURSES_FORM_INFO, GET_SEARCH_BAR_INFO, CREATE_COURSE, GET_ERRORS, GET_WARNINGS, GET_INFO} from "./types";

// GET COURSES
export const getCourses = () => dispatch => {
    axios.get('/api/course/course/')
        .then(res => {
            dispatch({
                type: GET_COURSES,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

// GET FORM INFO
export const getFormInfo = () => dispatch => {
    axios.get('/api/course/category/')
        .then(res => {
            dispatch({
                type: GET_COURSES_FORM_INFO,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
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

// CREATE COURSE
export const createCourse = form => dispatch => {
    axios
        .post('/api/course/course/', form)
        .then(res => {
            dispatch({
                type: CREATE_COURSE,
                payload: res.data
            });
            dispatch({
                type: GET_INFO,
                payload: {msg: "Course created successfully!", status: 201}
            })
        })
        .catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
};