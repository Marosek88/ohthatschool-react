import axios from 'axios';

import {
    CREATE_EDUCATOR,
    GET_EDUCATOR_COURSES,
    GET_MY_PROFILE,
    GET_PROFILE,
    GET_FORM_CONTEXT,
    GET_DETAILS,
    RESET_DETAILS,
    GET_LIST_ITEMS,
    RESET_LIST_ITEMS,
    CREATE_ITEM,
    COMMON_LOADING_DETAILS,
    COMMON_LOADED_DETAILS,
    COMMON_LOADING_LIST_ITEMS,
    COMMON_LOADED_LIST_ITEMS,
    COMMON_LOADING_PROFILE,
    COMMON_LOADED_PROFILE
} from "./types";
import {returnErrors, returnWarnings, returnInfo, returnSuccess} from "./messages"
import {tokenConfig} from "./auth";

// GET EDUCATOR
export const getEducator = (get_what, get_id) => (dispatch, getState) => {
    dispatch({type: COMMON_LOADING_PROFILE});
    axios.get('api/educator/educator-user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_MY_PROFILE,
                payload: res.data
            });

        })
        .catch(err => {
            dispatch({type: COMMON_LOADED_PROFILE});
            dispatch(returnErrors(err.response.data, err.response.status))
        });
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

// GET FORM CONTEXT
export const getFormContext = (get_what, get_id) => (dispatch, getState) => {

    // FORM CONTEXT FOR COURSE CREATION --------------------------------------------------------------------- Form C
    if (get_what === "Course") {
        axios.get('/api/course/category/')
            .then(res => {
                dispatch({
                    type: GET_FORM_CONTEXT,
                    payload: res.data
                });
            })
            .catch(err => console.log(err));
    }
};

// GET DETAILS
export const getDetails = (get_what, get_id) => (dispatch, getState) => {
    dispatch({type: COMMON_LOADING_DETAILS});

    // DETAILS FOR COURSE ---------------------------------------------------------------------------------------- C
    if (get_what === "Course") {

        axios.get(`/api/course/course-educator/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_DETAILS,
                    payload: res.data
                });
                dispatch({type: COMMON_LOADED_DETAILS});
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_DETAILS});
            });
    }

    // DETAILS FOR MODULE ---------------------------------------------------------------------------------------- M
    else if (get_what === "Module") {
        axios.get(`/api/course/module-educator/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_DETAILS,
                    payload: res.data
                });
                dispatch({type: COMMON_LOADED_DETAILS});
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_DETAILS});
            });
    }

    // DETAILS FOR LESSON ---------------------------------------------------------------------------------------- L
    else if (get_what === "Lesson") {
        axios.get(`/api/course/lesson-educator/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_DETAILS,
                    payload: res.data
                });
                dispatch({type: COMMON_LOADED_DETAILS});
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_DETAILS});
            });
    }
};

// GET LIST ITEMS
export const getList = (get_what, get_id) => (dispatch, getState) => {
    dispatch({type: COMMON_LOADING_LIST_ITEMS});

    // EDUCATOR'S COURSES ---------------------------------------------------------------------------------------- E C
    if (get_what === "Educator's Courses") {
        axios.get('/api/course/course-educator/', tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_LIST_ITEMS});
            });

    }
    // COURSE MODULES ---------------------------------------------------------------------------------------- C M
    else if (get_what === "Course Modules") {
        axios.get(`/api/course/course-educator/${get_id}/get_course_modules/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_LIST_ITEMS});
            });
    }
    // MODULE LESSONS ---------------------------------------------------------------------------------------- M L
    else if (get_what === "Module Lessons") {
        axios.get(`/api/course/module-educator/${get_id}/get_module_lessons/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_LIST_ITEMS});
            });
    }
};

// ADD ITEM
export const createItem = (add_what, form) => (dispatch, getState) => {
    // ADD EDUCATOR ---------------------------------------------------------------------------------------- ADD E
    if (add_what === "Educator") {
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
    }
    // ADD COURSE ---------------------------------------------------------------------------------------- ADD C
    else if (add_what === "Course") {
        axios
            .post('/api/course/course-educator/', form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: CREATE_ITEM,
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
                    type: CREATE_ITEM,
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
                    type: CREATE_ITEM,
                    payload: res.data
                });
                dispatch(returnSuccess(`${add_what} created successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};

// RESET DETAILS
export const resetDetails = () => (dispatch) => {
    dispatch({
        type: RESET_DETAILS,
    });
};

// RESET LIST ITEMS
export const resetListItems = () => (dispatch) => {
    dispatch({
        type: RESET_LIST_ITEMS,
    });
};