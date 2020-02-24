import { GET_COURSES, GET_COURSES_FORM_INFO, GET_SEARCH_BAR_INFO } from "../actions/types.js";

const initialState = {
  courses: [],
  formInfo: [],
  searchBarInfo: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
        case GET_COURSES_FORM_INFO:
      return {
        ...state,
        formInfo: action.payload
      };
        case GET_SEARCH_BAR_INFO:
      return {
        ...state,
        searchBarInfo: action.payload
      };
    default:
      return state;
  }
}