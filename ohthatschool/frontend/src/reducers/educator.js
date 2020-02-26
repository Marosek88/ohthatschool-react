import {
    GET_EDUCATOR_COURSES,
    GET_ADD_COURSE_FORM_DATA,
    CREATE_COURSE,
    EDU_DEFAULT_VIEW,
    EDU_CHANGE_VIEW
} from "../actions/types.js";

const initialState = {
    courses: [],
    formInfo: [],
    view: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EDUCATOR_COURSES:
            return {
                ...state,
                courses: action.payload
            };
        case CREATE_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload]
            };
        case GET_ADD_COURSE_FORM_DATA:
            return {
                ...state,
                formInfo: action.payload
            };
        case EDU_DEFAULT_VIEW:
            return {
                ...state,
                view: "course_list",
            };
        case EDU_CHANGE_VIEW:
            return {
                ...state,
                view: action.payload,
            };
        default:
            return state;
    }
}