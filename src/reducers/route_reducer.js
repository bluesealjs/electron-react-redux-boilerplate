import { SET_COUNT } from "../actions/types";

const INITIAL_STATE = {
  count: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };

    default:
      return state;
  }
};
