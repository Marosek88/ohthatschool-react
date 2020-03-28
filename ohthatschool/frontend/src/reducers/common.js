import {
    GET_FORM_CONTEXT,
    GET_DETAILS,
    RESET_DETAILS,
    GET_LIST_ITEMS,
    RESET_LIST_ITEMS,
    CREATE_ITEM,
    COMMON_LOADING_FORM,
    COMMON_LOADING_DETAILS,
    COMMON_LOADING_LIST_ITEMS,
    COMMON_LOADING_PROFILE,
    RESET_PROFILE,
    RESET_MY_PROFILE,
} from "../actions/types.js";
import {AUTH_ERROR, GET_MY_PROFILE, GET_PROFILE, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL} from "../actions/types";

const initialState = {
    formContext: [],
    formLoading: false,

    detailsData: {},
    detailsLoading: false,

    listItems: [],
    listItemsLoading: false,

    myProfileData: {"id": "unknown"},
    profileData: {},
    profileLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                formInfo: [],
                detailsData: {},
                listItems: [],
            };

        // --------------------------------- LOADING ---------------------------------
        case COMMON_LOADING_FORM:
            return {
                ...state,
                formLoading: true,
            };
        case COMMON_LOADING_DETAILS:
            return {
                ...state,
                detailsLoading: true,
            };
        case COMMON_LOADING_LIST_ITEMS:
            return {
                ...state,
                listItemsLoading: true,
            };
        case COMMON_LOADING_PROFILE:
            return {
                ...state,
                profileLoading: true,
            };

        // --------------------------------- GET INFORMATION ---------------------------------
        case GET_FORM_CONTEXT:
            return {
                ...state,
                formContext: action.payload,
                formLoading: false,
            };
        case GET_MY_PROFILE:
            const my_profile_id = action.payload.length > 0 ? action.payload[0] : {};
            return {
                ...state,
                myProfileData: my_profile_id,
                profileLoading: false,
            };
        case GET_PROFILE:
            return {
                ...state,
                profileData: action.payload,
                profileLoading: false,
            };
        case GET_DETAILS:
            return {
                ...state,
                detailsData: action.payload,
                detailsLoading: false,
            };
        case GET_LIST_ITEMS:
            return {
                ...state,
                listItems: action.payload,
                listItemsLoading: false,
            };

        // --------------------------------- RESET INFORMATION ---------------------------------
        case RESET_MY_PROFILE:
            return {
                ...state,
                myProfileData: {},
            };
        case RESET_PROFILE:
            return {
                ...state,
                myProfileData: {},
            };
        case RESET_DETAILS:
            return {
                ...state,
                detailsData: {},
            };
        case RESET_LIST_ITEMS:
            return {
                ...state,
                listItems: [],
            };
        default:
            return state;
    }
}