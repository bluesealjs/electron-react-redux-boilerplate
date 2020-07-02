import { SET_ERROR_LOADING } from "../actions/types";

const INITIAL_STATE = {
  errorMessage: "", //make it  ""
  loading: false, //make it false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERROR_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
