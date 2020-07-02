import { SET_ERROR_LOADING } from "./types";

// Log user out
export const setErrorAndLoading = (errorMessage = "", loading = false) => (
  dispatch
) => {
  dispatch({
    type: SET_ERROR_LOADING,
    payload: { errorMessage, loading },
  });
};
