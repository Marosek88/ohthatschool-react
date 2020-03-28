import {
    GET_EDUCATOR,
    CREATE_EDUCATOR,
    GET_EDUCATOR_COURSES,
    GET_ED_DETAILS,
    RESET_ED_DETAILS,
    GET_ED_LIST_ITEMS,
    CREATE_ED_ITEM,
} from "../actions/types.js";
import {AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL} from "../actions/types";

const initialState = {
    educator: ["unknown"],
    courses: [],
    formInfo: [],
    view: "",
    detailsData: {},
    listItems: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EDUCATOR:
            return {
                ...state,
                educator: action.payload
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                educator: ["unknown"],
            };
        case CREATE_EDUCATOR:
            return {
                ...state,
                educator: [action.payload],
            };
        case GET_EDUCATOR_COURSES:
            return {
                ...state,
                courses: action.payload
            };
        case GET_ED_DETAILS:
            return {
                ...state,
                detailsData: action.payload,
            };
        case RESET_ED_DETAILS:
            return {
                ...state,
                detailsData: {},
            };
        case GET_ED_LIST_ITEMS:
            return {
                ...state,
                listItems: action.payload,
            };
        case CREATE_ED_ITEM:
            return {
                ...state,
                listItems: [...state.listItems, action.payload]
            };
        default:
            return state;
    }
}