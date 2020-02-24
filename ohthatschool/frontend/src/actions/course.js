import axios from 'axios';

import { GET_COURSES, GET_COURSES_FORM_INFO, GET_SEARCH_BAR_INFO, CREATE_COURSE } from "./types";

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
export const createCourse = form => (dispatch, getState) => {
    console.log(form);
    axios
        .post('/api/course/course/', form)
        .then(res => {
            dispatch({
                type: CREATE_COURSE,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};