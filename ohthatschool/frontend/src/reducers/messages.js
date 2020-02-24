import {GET_ERRORS, GET_WARNINGS, GET_INFO} from "../actions/types.js";

const initialState = {
    error: {
        msg: {},
        status: null
    },
    warning: {
        msg: {},
        status: null
    },
    info: {
        msg: {},
        status: null
    }

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                error: {
                    msg: action.payload.msg,
                    status: action.payload.status
                }
            };
        case GET_WARNINGS:
            return {
                ...state,
                warning: {
                    msg: action.payload.msg,
                    status: action.payload.status
                }
            };
        case GET_INFO:
            return {
                ...state,
                info: {
                    msg: action.payload.msg,
                    status: action.payload.status
                }
            };
        default:
            return state;
    }
}