import { GET_CONTENT } from "../actions/types.js";

const initialState = {
  content: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTENT:
      return {
        ...state,
        content: action.payload
      };
    default:
      return state;
  }
}