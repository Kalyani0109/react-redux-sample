import * as types from "./ActionTypes";
import * as authorApi from "../../api/authorApi";
import { BeginApiCall, apiCallError } from "../actions/ApiActionStatus";

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function LoadAuthors() {
  return function (dispatch) {
    dispatch(BeginApiCall());
    return authorApi
      .getAuthors()
      .then((response) => {
        dispatch(loadAuthorSuccess(response));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
