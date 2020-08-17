import * as types from "../actions/ActionTypes";
import InitialState from "./InitialState";

export function actionTypeEndsWithSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}
export default function apiCallStatusReducer(
  state = InitialState.apiCallsInProgress,
  actions
) {
  if (actions.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    actions.type === types.API_CALL_ERROR ||
    actionTypeEndsWithSuccess(actions.type)
  ) {
    return state - 1;
  }

  return state;
}
