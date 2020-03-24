import axios from 'axios';

import {
    GET_EDUCATOR,
    CREATE_EDUCATOR,
    GET_EDUCATOR_COURSES,
    GET_ADD_COURSE_FORM_DATA,
    GET_ED_DETAILS,
    RESET_ED_DETAILS,
    GET_ED_LIST_ITEMS,
    CREATE_ED_ITEM,
} from "./types";
import {returnErrors, returnWarnings, returnInfo, returnSuccess} from "./messages"
import {tokenConfig} from "./auth";

// GET EDUCATOR
export const getEducator = () => (dispatch, getState) => {
    axios.get('api/educator/educator-user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_EDUCATOR,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE EDUCATOR
export const createEducator = form => (dispatch, getState) => {
    axios
        .post('/api/educator/educator-user/', form, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CREATE_EDUCATOR,
                payload: res.data
            });
            dispatch(returnSuccess(`Educator profile created successfully!`, 201))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

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

// GET DETAILS
export const getDetails = (get_what, get_id) => (dispatch, getState) => {
    // DETAILS FOR COURSE ---------------------------------------------------------------------------------------- C
    if (get_what === "Course") {
        axios.get(`/api/course/course-educator/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_ED_DETAILS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }

    // DETAILS FOR COURSE ---------------------------------------------------------------------------------------- C
    if (get_what === "Course") {
        axios.get(`/api/course/course-educator/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_ED_DETAILS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }

    // DETAILS FOR MODULE ---------------------------------------------------------------------------------------- M
    else if (get_what === "Module") {
        axios.get(`/api/course/module-educator/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_ED_DETAILS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }

    // DETAILS FOR LESSON ---------------------------------------------------------------------------------------- L
    else if (get_what === "Lesson") {
        axios.get(`/api/course/lesson-educator/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_ED_DETAILS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};

// RESET DETAILS
export const resetDetails = () => (dispatch) => {
    dispatch({
        type: RESET_ED_DETAILS,
    });
};

// GET LIST ITEMS
export const getList = (get_what, get_id) => (dispatch, getState) => {
    // COURSE MODULES ---------------------------------------------------------------------------------------- C M
    if (get_what === "Course Modules") {
        axios.get(`/api/course/course-educator/${get_id}/get_course_modules/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_ED_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    // MODULE LESSONS ---------------------------------------------------------------------------------------- M L
    else if (get_what === "Module Lessons") {
        axios.get(`/api/course/module-educator/${get_id}/get_module_lessons/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_ED_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};

// CREATE ITEM
export const createItem = (add_what, form) => (dispatch, getState) => {
    // ADD COURSE ---------------------------------------------------------------------------------------- ADD C
    if (add_what === "Course") {
        axios
            .post('/api/course/course-educator/', form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: CREATE_ED_ITEM,
                    payload: res.data
                });
                dispatch(returnSuccess(`${add_what} created successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    // ADD MODULE ---------------------------------------------------------------------------------------- ADD M
    else if (add_what === "Module") {
        axios
            .post('api/course/module-educator/', form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: CREATE_ED_ITEM,
                    payload: res.data
                });
                dispatch(returnSuccess(`${add_what} created successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    // ADD LESSON ---------------------------------------------------------------------------------------- ADD L
    else if (add_what === "Lesson") {
        axios
            .post('api/course/lesson-educator/', form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: CREATE_ED_ITEM,
                    payload: res.data
                });
                dispatch(returnSuccess(`${add_what} created successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};
