import { SET_COUNT } from "./types";
import topicsJson from "../data/topics.json";
import { setErrorAndLoading } from "./error_actions";
import isEmpty from "../validation/is-empty";
import { isDevENV } from "../utils/isDevEnv";

export const getTopics = () => async (dispatch, getState) => {
  try {
    dispatch(setErrorAndLoading(undefined, true));

    let response = {};

    response.data = topicsJson;
    // dispatch({ type: SET_COUNT, payload: response.data || {} });
    dispatch(setErrorAndLoading(undefined, undefined));
  } catch (err) {
    console.log(err);
    dispatch(setErrorAndLoading(undefined, undefined));
  }
};
export const setCount = (count) => (dispatch, getState) => {
  dispatch({ type: SET_COUNT, payload: count });
};
